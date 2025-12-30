const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const db = require('./db');

dotenv.config();

const app = express();

// 🚀 IMPORTANT: Railway uses dynamic PORT
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

/* =========================
   REGISTRATION API
========================= */
app.post('/api/register', async (req, res) => {
    console.log('Received registration request:', req.body);

    const {
        teamName,
        leaderName,
        email,
        phone,
        college,
        track,
        teamSize,
        members
    } = req.body;

    let connection;
    try {
        connection = await db.getConnection();
        await connection.beginTransaction();

        const regSql = `
      INSERT INTO registrations 
      (team_name, leader_name, email, phone, college, track, team_size)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

        const [regResult] = await connection.execute(regSql, [
            teamName,
            leaderName,
            email,
            phone,
            college,
            track,
            teamSize
        ]);

        const registrationId = regResult.insertId;

        const memberSql = `
      INSERT INTO team_members
      (registration_id, name, college, college_code, gender, branch, is_lead, email, phone)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

        for (const member of members) {
            await connection.execute(memberSql, [
                registrationId,
                member.name,
                member.college,
                member.collegeCode,
                member.gender,
                member.branch,
                member.isLead || false,
                member.email || null,
                member.phone || null
            ]);
        }

        await connection.commit();

        res.status(201).json({
            message: 'Registration successful!',
            id: registrationId
        });
    } catch (error) {
        if (connection) await connection.rollback();
        console.error('Registration Error:', error);

        res.status(500).json({
            message: 'Registration failed',
            error: error.message
        });
    } finally {
        if (connection) connection.release();
    }
});

/* =========================
   ADMIN LOGIN
========================= */
app.post('/api/admin/login', (req, res) => {
    const { username, password } = req.body;

    if (username === 'admin' && password === 'lavan') {
        res.json({ message: 'Login successful', isAdmin: true });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
});

/* =========================
   ADMIN DASHBOARD
========================= */
app.get('/api/admin/dashboard', async (req, res) => {
    try {
        const [registrations] = await db.query(
            'SELECT * FROM registrations ORDER BY created_at DESC'
        );

        const registrationsWithMembers = await Promise.all(
            registrations.map(async (reg) => {
                const [members] = await db.query(
                    'SELECT * FROM team_members WHERE registration_id = ?',
                    [reg.id]
                );
                return { ...reg, members };
            })
        );

        const [collegeStats] = await db.query(
            `SELECT college, COUNT(*) AS count 
       FROM team_members 
       GROUP BY college 
       ORDER BY count DESC`
        );

        res.json({
            registrations: registrationsWithMembers,
            collegeStats
        });
    } catch (error) {
        console.error('Dashboard Error:', error);
        res.status(500).json({ message: 'Error fetching dashboard data' });
    }
});

/* =========================
   SERVE FRONTEND (PRODUCTION)
========================= */
const clientPath = path.join(__dirname, '../client/dist');
app.use(express.static(clientPath));

// React Router fallback
app.get('*', (req, res) => {
    res.sendFile(path.join(clientPath, 'index.html'));
});

/* =========================
   START SERVER
========================= */
app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
});

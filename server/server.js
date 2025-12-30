const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const db = require('./db');

dotenv.config();

const app = express();

// 🚨 IMPORTANT: Railway provides PORT
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

// ✅ Health check (VERY IMPORTANT FOR RAILWAY)
app.get('/health', (req, res) => {
    res.status(200).send('OK');
});

// ================= REGISTER =================
app.post('/api/register', async (req, res) => {
    const { teamName, leaderName, email, phone, college, track, teamSize, members } = req.body;

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
            teamName, leaderName, email, phone, college, track, teamSize
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
        res.status(201).json({ message: 'Registration successful' });

    } catch (err) {
        if (connection) await connection.rollback();
        console.error(err);
        res.status(500).json({ message: 'Registration failed' });
    } finally {
        if (connection) connection.release();
    }
});

// ================= ADMIN LOGIN =================
app.post('/api/admin/login', (req, res) => {
    const { username, password } = req.body;
    if (username === 'admin' && password === 'lavan') {
        return res.json({ success: true });
    }
    res.status(401).json({ success: false });
});

// ================= ADMIN DASHBOARD =================
app.get('/api/admin/dashboard', async (req, res) => {
    try {
        const [registrations] = await db.query(
            'SELECT * FROM registrations ORDER BY created_at DESC'
        );

        const data = await Promise.all(
            registrations.map(async (reg) => {
                const [members] = await db.query(
                    'SELECT * FROM team_members WHERE registration_id = ?',
                    [reg.id]
                );
                return { ...reg, members };
            })
        );

        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Dashboard error' });
    }
});

// ================= FRONTEND =================
// ⚠️ Only enable if frontend build exists
const clientPath = path.join(__dirname, '../client/dist');

app.use(express.static(clientPath));

// 🚨 EXPRESS v5 SAFE WILDCARD
app.get('/*', (req, res) => {
    res.sendFile(path.join(clientPath, 'index.html'));
});

// ================= START SERVER =================
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');
const db = require('./db');

dotenv.config();

const app = express();

// ✅ Railway PORT (fallback for local)
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

// ================= ROOT =================
app.get('/', (req, res) => {
    res.send('🚀 CodeStorm Backend is running');
});

// ================= HEALTH CHECK =================
app.get('/health', (req, res) => {
    res.status(200).send('OK');
});

// ================= REGISTER =================
app.post('/api/register', async (req, res) => {
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

    // ✅ BASIC VALIDATION
    if (!teamName || !leaderName || !email || !members || !Array.isArray(members)) {
        return res.status(400).json({
            message: 'Invalid request data',
        });
    }

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
            phone || null,
            college || null,
            track || null,
            teamSize || members.length
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
                member.college || null,
                member.collegeCode || null,
                member.gender || null,
                member.branch || null,
                member.isLead ? 1 : 0,
                member.email || null,
                member.phone || null
            ]);
        }

        await connection.commit();

        res.status(201).json({
            message: 'Registration successful',
            registrationId
        });

    } catch (err) {
        if (connection) await connection.rollback();

        console.error('❌ REGISTRATION ERROR:', err);

        // 🔥 RETURN REAL ERROR (VERY IMPORTANT)
        res.status(500).json({
            message: 'Registration failed',
            error: err.message
        });
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
        console.error('❌ DASHBOARD ERROR:', err);
        res.status(500).json({
            message: 'Dashboard error',
            error: err.message
        });
    }
});

// ================= FRONTEND (SAFE) =================
const clientPath = path.join(__dirname, '../client/dist');

if (fs.existsSync(clientPath)) {
    app.use(express.static(clientPath));

    app.get('*', (req, res) => {
        res.sendFile(path.join(clientPath, 'index.html'));
    });
} else {
    console.log('⚠️ Frontend build not found, API-only mode');
}

// ================= START SERVER =================
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});

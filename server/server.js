const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const db = require('./db');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
    res.send('CodeStorm 2026 API is running');
});

// Registration Endpoint
app.post('/api/register', async (req, res) => {
    console.log('Received registration request:', req.body);
    const { teamName, leaderName, email, phone, college, track, teamSize, members } = req.body;

    const connection = await db.getConnection();
    try {
        await connection.beginTransaction();

        // 1. Insert into registrations table
        const regSql = `INSERT INTO registrations (team_name, leader_name, email, phone, college, track, team_size) VALUES (?, ?, ?, ?, ?, ?, ?)`;
        const [regResult] = await connection.execute(regSql, [teamName, leaderName, email, phone, college, track, teamSize]);
        const registrationId = regResult.insertId;

        // 2. Insert each member into team_members table
        const memberSql = `INSERT INTO team_members (registration_id, name, college, college_code, gender, branch, is_lead, email, phone) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

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
        res.status(201).json({ message: 'Registration successful!', id: registrationId });
    } catch (error) {
        await connection.rollback();
        console.error('Registration Error:', error);
        res.status(500).json({ message: 'Registration failed', error: error.message });
    } finally {
        connection.release();
    }
});

// Admin Login
app.post('/api/admin/login', (req, res) => {
    const { username, password } = req.body;
    // Hardcoded credentials as requested
    if (username === 'admin' && password === 'lavan') {
        res.json({ message: 'Login successful', isAdmin: true });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
});

// Get all registrations with members (Admin)
app.get('/api/admin/dashboard', async (req, res) => {
    try {
        const [registrations] = await db.query('SELECT * FROM registrations ORDER BY created_at DESC');

        // Fetch members for each registration
        const registrationsWithMembers = await Promise.all(registrations.map(async (reg) => {
            const [members] = await db.query('SELECT * FROM team_members WHERE registration_id = ?', [reg.id]);
            return { ...reg, members };
        }));

        // Fetch member counts by college
        const [collegeStats] = await db.query('SELECT college, COUNT(*) as count FROM team_members GROUP BY college ORDER BY count DESC');

        res.json({
            registrations: registrationsWithMembers,
            collegeStats
        });
    } catch (error) {
        console.error('Dashboard Error:', error);
        res.status(500).json({ message: 'Error fetching dashboard data' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

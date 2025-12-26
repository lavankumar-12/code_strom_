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
    const { teamName, leaderName, email, phone, college, track, teamSize } = req.body;

    try {
        const sql = `INSERT INTO registrations (team_name, leader_name, email, phone, college, track, team_size) VALUES (?, ?, ?, ?, ?, ?, ?)`;
        const [result] = await db.execute(sql, [teamName, leaderName, email, phone, college, track, teamSize]);

        res.status(201).json({ message: 'Registration successful!', id: result.insertId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Registration failed', error: error.message });
    }
});

// Get all registrations (Admin)
app.get('/api/registrations', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM registrations');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching data' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

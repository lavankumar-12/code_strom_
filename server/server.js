const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const db = require("./db");

dotenv.config();

const app = express();

// ================= PORT =================
const PORT = process.env.PORT || 8080;

// ================= MIDDLEWARE =================
app.use(cors({
    origin: "*", // ✅ allow Vercel frontend
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"]
}));

app.use(express.json());

// ================= ROOT =================
app.get("/", (req, res) => {
    res.send("🚀 CodeStorm Backend is running");
});

// ================= HEALTH CHECK =================
app.get("/health", (req, res) => {
    res.status(200).send("OK");
});

// ================= REGISTER =================
app.post("/api/register", async (req, res) => {
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

    // BASIC VALIDATION
    if (!teamName || !leaderName || !email || !Array.isArray(members)) {
        return res.status(400).json({
            message: "Invalid request data"
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
            message: "Registration successful",
            registrationId
        });

    } catch (err) {
        if (connection) await connection.rollback();

        console.error("❌ REGISTRATION ERROR:", err);

        res.status(500).json({
            message: "Registration failed",
            error: err.message
        });
    } finally {
        if (connection) connection.release();
    }
});

// ================= ADMIN LOGIN =================
app.post("/api/admin/login", (req, res) => {
    const { username, password } = req.body;

    if (username === "admin" && password === "lavan") {
        return res.json({ success: true });
    }

    res.status(401).json({
        success: false,
        message: "Invalid credentials"
    });
});

// ================= ADMIN DASHBOARD =================
app.get("/api/admin/dashboard", async (req, res) => {
    try {
        const [registrations] = await db.query(
            "SELECT * FROM registrations ORDER BY created_at DESC"
        );

        const data = await Promise.all(
            registrations.map(async (reg) => {
                const [members] = await db.query(
                    "SELECT * FROM team_members WHERE registration_id = ?",
                    [reg.id]
                );
                return { ...reg, members };
            })
        );

        res.json(data);
    } catch (err) {
        console.error("❌ DASHBOARD ERROR:", err);
        res.status(500).json({
            message: "Dashboard error",
            error: err.message
        });
    }
});

// ================= START SERVER =================
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});

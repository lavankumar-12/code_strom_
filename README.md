# CodeStorm 2026 Website

This is a premium, high-performance website for the CodeStorm 2026 Hackathon, built with React, Node.js, and MySQL.

## Prerequisites

1.  **Node.js**: Ensure Node.js is installed.
2.  **MySQL**: Ensure MySQL Server is valid and running.

## Setup Instructions

### 1. Database Setup
1.  Open your MySQL client (Workbench, CLI, etc.).
2.  Run the commands in `server/schema.sql` to create the database and tables.
    - `CREATE DATABASE IF NOT EXISTS codestorm_db;`
    - `USE codestorm_db;`
    - `CREATE TABLE ...`

### 2. Backend Setup
1.  Navigate to the server directory:
    ```bash
    cd server
    ```
2.  Install dependencies (if not already done):
    ```bash
    npm install
    ```
3.  Configure environment variables:
    - Open `.env` file.
    - Update `DB_PASSWORD` with your MySQL password.
4.  Start the server:
    ```bash
    npm start
    ```
    - For development with auto-restart: `npm run dev`

### 3. Frontend Setup
1.  Navigate to the client directory (in a new terminal):
    ```bash
    cd client
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the development server:
    ```bash
    npm run dev
    ```
4.  Open the link shown (usually `http://localhost:5173`).

## Features
-   **Futuristic Design**: Glassmorphism, Neon Animations, Gradient text.
-   **Responsive**: Works on Mobile and Desktop.
-   **Live Registration**: Connects to MySQL database.
-   **Interactive Timeline**: Schedule of events.
-   **Tracks Showcase**: animated cards for hackathon themes.

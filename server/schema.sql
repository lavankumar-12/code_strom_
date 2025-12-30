CREATE TABLE IF NOT EXISTS registrations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    team_name VARCHAR(255) NOT NULL UNIQUE,
    leader_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    college VARCHAR(255) NOT NULL,
    track VARCHAR(255) NOT NULL,
    team_size INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS team_members (
    id INT AUTO_INCREMENT PRIMARY KEY,
    registration_id INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    college VARCHAR(255) NOT NULL,
    college_code VARCHAR(50) NOT NULL,
    gender ENUM('Male', 'Female') NOT NULL,
    branch VARCHAR(100) NOT NULL,
    is_lead BOOLEAN DEFAULT FALSE,
    email VARCHAR(255),
    phone VARCHAR(20),
    FOREIGN KEY (registration_id) REFERENCES registrations(id) ON DELETE CASCADE
);

<?php
// /migrations/2025_01_24_001_create_users_table.php

class CreateUsersTable
{
    public function up(PDO $db)
    {
        $sql = "CREATE TABLE IF NOT EXISTS users (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    name VARCHAR(255) NOT NULL,
                    email VARCHAR(255) UNIQUE NOT NULL,
                    password VARCHAR(255) NOT NULL,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
                )";

        $db->exec($sql);
    }

    public function down(PDO $db)
    {
        $sql = "DROP TABLE IF EXISTS users";
        $db->exec($sql);
    }
}

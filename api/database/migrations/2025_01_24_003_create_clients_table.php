<?php
// /database/migrations/2025_01_24_003_create_clients_table.php

class CreateClientsTable
{
    public function up(PDO $db)
    {
        $sql = "CREATE TABLE IF NOT EXISTS clients (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    name VARCHAR(255) NOT NULL,
                    dob DATETIME NOT NULL,
                    cpf VARCHAR(14) NOT NULL UNIQUE,
                    rg VARCHAR(20) NOT NULL,
                    phone VARCHAR(20) NOT NULL,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
                )";
        $db->exec($sql);
    }

    public function down(PDO $db)
    {
        $sql = "DROP TABLE IF EXISTS clients";
        $db->exec($sql);
    }
}

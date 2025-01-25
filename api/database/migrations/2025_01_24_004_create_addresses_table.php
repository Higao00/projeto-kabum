<?php
// /database/migrations/2025_01_24_004_create_addresses_table.php

class CreateAddressesTable
{
    public function up(PDO $db)
    {
        $sql = "CREATE TABLE IF NOT EXISTS addresses (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    client_id INT NOT NULL,
                    postal_code VARCHAR(10) NOT NULL,
                    street VARCHAR(255) NOT NULL,
                    neighborhood VARCHAR(255) NOT NULL,
                    locality VARCHAR(255) NOT NULL,
                    city VARCHAR(255) NOT NULL,
                    state VARCHAR(2) NOT NULL,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                    FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE CASCADE
                )";
        $db->exec($sql);
    }

    public function down(PDO $db)
    {
        $sql = "DROP TABLE IF EXISTS addresses";
        $db->exec($sql);
    }
}

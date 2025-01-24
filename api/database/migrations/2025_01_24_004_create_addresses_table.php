<?php
// /database/migrations/2025_01_24_004_create_addresses_table.php

class CreateAddressesTable
{
    public function up(PDO $db)
    {
        $sql = "CREATE TABLE IF NOT EXISTS addresses (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    client_id INT NOT NULL,
                    cep VARCHAR(10) NOT NULL,
                    logradouro VARCHAR(255) NOT NULL,
                    bairro VARCHAR(255) NOT NULL,
                    localidade VARCHAR(255) NOT NULL,
                    cidade VARCHAR(255) NOT NULL,
                    uf VARCHAR(2) NOT NULL,
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

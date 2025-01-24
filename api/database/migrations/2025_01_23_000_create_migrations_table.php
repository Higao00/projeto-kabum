<?php
// /database/migrations/2025_01_23_000_create_migrations_table.php

class CreateMigrationsTable
{
    public function up(PDO $db)
    {
        // Criação da tabela migrations com a coluna 'migration'
        $sql = "CREATE TABLE IF NOT EXISTS migrations (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    migration VARCHAR(255) NOT NULL,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )";
        $db->exec($sql);
    }

    public function down(PDO $db)
    {
        // Drop a tabela migrations
        $sql = "DROP TABLE IF EXISTS migrations";
        $db->exec($sql);
    }
}

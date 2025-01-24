<?php
// /migrations/2025_01_24_001_create_users_table.php

class AddStatusToUsersTable
{
    public function up(PDO $db)
    {
        // SQL para adicionar a coluna 'status' à tabela 'users'
        $sql = "ALTER TABLE users 
                ADD COLUMN status TINYINT(1) NOT NULL DEFAULT 1";

        $db->exec($sql);
    }

    public function down(PDO $db)
    {
        // SQL para remover a coluna 'status' da tabela 'users'
        $sql = "ALTER TABLE users 
                DROP COLUMN status";

        $db->exec($sql);
    }
}

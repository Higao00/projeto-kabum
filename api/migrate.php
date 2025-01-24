<?php
// /migrate.php

require 'vendor/autoload.php';
require 'config/Database.php';

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

try {
    $database = new Database();
    $db = $database->getConnection();

    // Verificar se a tabela de migrações existe, senão, cria-la
    $checkMigrationsTable = "SHOW TABLES LIKE 'migrations'";
    $result = $db->query($checkMigrationsTable)->fetch();

    if (!$result) {
        // Se a tabela não existir, cria a tabela de migrações
        $createTableSql = "CREATE TABLE migrations (
            id INT AUTO_INCREMENT PRIMARY KEY,
            migration VARCHAR(255) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )";
        $db->exec($createTableSql);
    }

    // Pegar todas as migrações
    $migrations = glob(__DIR__ . '/database/migrations/*.php');
    sort($migrations);

    // Processar cada migração
    foreach ($migrations as $migrationFile) {
        require $migrationFile;

        $className = pathinfo($migrationFile, PATHINFO_FILENAME);

        // Remover o timestamp (14 primeiros caracteres) e converter para camel case
        $className = substr($className, 15);  // Remove o timestamp
        $className = str_replace('_', '', ucwords($className, '_'));  // Converte para camel case

        // Verificar se a migração já foi executada
        $checkMigrationSql = "SELECT * FROM migrations WHERE migration = :migration";
        $stmt = $db->prepare($checkMigrationSql);
        $stmt->execute(['migration' => $className]);

        if ($stmt->rowCount() === 0) {
            // Se a migração não foi executada, executa ela
            echo "Executando migração: $className\n";
            $migration = new $className();
            $migration->up($db);

            // Registrar a migração como executada
            $insertMigrationSql = "INSERT INTO migrations (migration) VALUES (:migration)";
            $stmt = $db->prepare($insertMigrationSql);
            $stmt->execute(['migration' => $className]);

            echo "Migração $className executada com sucesso!\n";
        } else {
            echo "Migração $className já foi executada, pulando...\n";
        }
    }

    echo "Migrações aplicadas com sucesso!";
} catch (\Throwable $th) {
    echo "Erro durante a execução das migrações: " . $th->getMessage() . "\n";
    echo "Arquivo: " . $th->getFile() . "\n";
    echo "Linha: " . $th->getLine() . "\n";
    echo "Stack Trace:\n" . $th->getTraceAsString() . "\n";
}

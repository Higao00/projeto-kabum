<?php
// /migrate.php

require 'vendor/autoload.php';
require 'config/Database.php';

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

try {
    $database = new Database();
    $db = $database->getConnection();

    $migrations = glob(__DIR__ . '/database/migrations/*.php');
    sort($migrations);

    foreach ($migrations as $migrationFile) {
        require $migrationFile;

        $className = pathinfo($migrationFile, PATHINFO_FILENAME);

        // Remover o timestamp (14 primeiros caracteres) e converter para camel case
        $className = substr($className, 15);  // Remove o timestamp
        $className = str_replace('_', '', ucwords($className, '_'));  // Converte para camel case

        $migration = new $className();

        // echo "Executando migração: $className\n";

        // Adiciona um var_dump para garantir que está sendo executado
        var_dump($migration);
        $migration->up($db);
    }

    echo "Migrações aplicadas com sucesso!";
} catch (\Throwable $th) {
    echo "Erro durante a execução das migrações: " . $th->getMessage() . "\n";
    echo "Arquivo: " . $th->getFile() . "\n";
    echo "Linha: " . $th->getLine() . "\n";
    echo "Stack Trace:\n" . $th->getTraceAsString() . "\n";
}

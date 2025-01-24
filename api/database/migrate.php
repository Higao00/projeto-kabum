<?php

require_once __DIR__ . '/../vendor/autoload.php';
require_once __DIR__ . '/../config/Database.php';

class MigrationRunner
{
    private PDO $db;

    public function __construct()
    {
        $database = new Database();
        $this->db = $database->getConnection();
    }

    public function runMigrations(): void
    {
        $migrationsPath = __DIR__ . '/migrations';
        $migrations = array_diff(scandir($migrationsPath), ['.', '..']);

        foreach ($migrations as $migrationFile) {
            // Incluindo o arquivo da migração
            $migrationClass = require_once $migrationsPath . '/' . $migrationFile;

            // Remover a extensão '.php' do nome do arquivo para usar como nome da classe
            $className = pathinfo($migrationFile, PATHINFO_FILENAME);

            // Instanciando a classe de migração corretamente
            if (class_exists($className)) {
                $migration = new $className($this->db);

                echo "Rodando migration: {$migrationFile}...\n";
                $migration->up();
                echo "Migration {$migrationFile} concluída.\n";
            } else {
                echo "Classe {$className} não encontrada.\n";
            }
        }
    }
}

// Executar as migrations
$runner = new MigrationRunner();
$runner->runMigrations();

<?php
// /config/Database.php

namespace App\Config;

use PDO;
use Dotenv\Dotenv;
use PDOException;

class Database
{
    private ?PDO $connection = null;

    public function __construct()
    {
        // Carregar variáveis de ambiente
        $dotenv = Dotenv::createImmutable(__DIR__ . '/../');
        $dotenv->load();

        // Configurar a string DSN para a conexão
        $dsn = sprintf(
            "mysql:host=%s;port=%s;dbname=%s;charset=utf8mb4",
            $_ENV['DB_HOST'],
            $_ENV['DB_PORT'],
            $_ENV['DB_DATABASE']
        );

        try {
            // Criar a conexão PDO
            $this->connection = new PDO($dsn, $_ENV['DB_USERNAME'], $_ENV['DB_PASSWORD']);
            $this->connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (PDOException $e) {
            // Se ocorrer um erro, mostrar a mensagem de erro
            echo "Erro ao conectar com o banco de dados: " . $e->getMessage();
            die();
        }
    }

    public function getConnection(): ?PDO
    {
        return $this->connection;
    }
}

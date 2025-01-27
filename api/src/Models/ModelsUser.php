<?php

namespace App\Models;

use App\Config\Database;
use PDO;

class ModelsUser
{
    private $pdo;

    public function __construct()
    {
        $database = new Database();
        $this->pdo = $database->getConnection();
    }

    // Criar usuário
    public function createUser($name, $email, $password, $status)
    {
        // Verificar se o e-mail já está cadastrado
        $stmt = $this->pdo->prepare("SELECT COUNT(*) FROM users WHERE email = :email");
        $stmt->execute(['email' => $email]);
        $emailExists = $stmt->fetchColumn();

        $status = (int) $status;

        if ($emailExists) {
            throw new \Exception("The email '$email' is already registered.");
        }

        // Inserir o usuário no banco de dados
        $stmt = $this->pdo->prepare("
            INSERT INTO users (name, email, password, status, created_at, updated_at) 
            VALUES (:name, :email, :password, :status, NOW(), NOW())");

        $stmt->execute([
            'name' => $name,
            'email' => $email,
            'password' => password_hash($password, PASSWORD_DEFAULT),
            'status' => $status
        ]);

        $userId = $this->pdo->lastInsertId();

        // Buscar o registro completo do usuário criado
        $stmt = $this->pdo->prepare("SELECT id, name, email, status, created_at, updated_at FROM users WHERE id = :id");
        $stmt->execute(['id' => $userId]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        return $user;
    }


    // Obter usuário por ID
    public function getUserById($id)
    {
        $sql = "SELECT id, name, email, created_at, updated_at, status FROM users WHERE id = ?";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([$id]);

        // Garantir que o retorno seja somente com chaves associativas
        return $stmt->fetch(\PDO::FETCH_ASSOC);
    }

    // Obter usuário por e-mail
    public function getUserByEmail($email)
    {
        $sql = "SELECT * FROM users WHERE email = ?";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([$email]);
        return $stmt->fetch();
    }

    // Obter todos os usuários
    public function getAllUsers()
    {
        $sql = "SELECT * FROM users";
        $stmt = $this->pdo->query($sql);
        return $stmt;
    }

    // Atualizar usuário
    public function updateUser($id, $name, $email, $status)
    {
        // Cast explícito do status para inteiro (0 ou 1)
        $status = (int) $status;

        $sql = "UPDATE users SET name = ?, email = ?, status = ? WHERE id = ?";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([$name, $email, $status, $id]);
    }

    // Excluir usuário
    public function deleteUser($id)
    {
        $sql = "DELETE FROM users WHERE id = ?";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([$id]);
    }
}

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

    public function createUser($name, $email, $password, $status)
    {
        $stmt = $this->pdo->prepare("SELECT COUNT(*) FROM users WHERE email = :email");
        $stmt->execute(['email' => $email]);
        $emailExists = $stmt->fetchColumn();

        $status = (int) $status;

        if ($emailExists) {
            throw new \Exception("O e-mail '$email' já está cadastrado.");
        }

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

        $stmt = $this->pdo->prepare("SELECT id, name, email, status, created_at, updated_at FROM users WHERE id = :id");
        $stmt->execute(['id' => $userId]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        return $user;
    }

    public function getUserById($id)
    {
        $sql = "SELECT id, name, email, created_at, updated_at, status FROM users WHERE id = ?";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([$id]);
        return $stmt->fetch(\PDO::FETCH_ASSOC);
    }

    public function getUserByEmail($email)
    {
        $sql = "SELECT * FROM users WHERE email = ?";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([$email]);
        return $stmt->fetch();
    }

    public function getAllUsers()
    {
        $sql = "SELECT * FROM users";
        $stmt = $this->pdo->query($sql);
        return $stmt;
    }

    public function updateUser($id, $name, $email, $status)
    {
        $status = (int) $status;

        $sql = "UPDATE users SET name = ?, email = ?, status = ? WHERE id = ?";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([$name, $email, $status, $id]);
    }

    public function deleteUser($id)
    {
        $sql = "DELETE FROM users WHERE id = ?";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([$id]);
    }
}

<?php

namespace App\Models;

class ModelsUser
{
    private $pdo;

    public function __construct($pdo)
    {
        $this->pdo = $pdo;
    }

    // Criar usuário
    public function createUser($name, $email, $password, $status)
    {
        $sql = "INSERT INTO users (name, email, password, status) VALUES (?, ?, ?, ?)";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([$name, $email, password_hash($password, PASSWORD_BCRYPT), $status]);
    }

    // Obter usuário por ID
    public function getUserById($id)
    {
        $sql = "SELECT * FROM users WHERE id = ?";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([$id]);
        return $stmt->fetch();
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
    public function updateUser($id, $name, $email, $password, $status)
    {
        $sql = "UPDATE users SET name = ?, email = ?, password = ?, status = ? WHERE id = ?";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([$name, $email, password_hash($password, PASSWORD_BCRYPT), $status, $id]);
    }

    // Excluir usuário
    public function deleteUser($id)
    {
        $sql = "DELETE FROM users WHERE id = ?";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([$id]);
    }
}

<?php

namespace App\Models;

class ModelsClient
{
    private $pdo;

    public function __construct($pdo)
    {
        $this->pdo = $pdo;
    }

    // Criar cliente
    public function createClient($name, $dob, $cpf, $rg, $phone)
    {
        $sql = "INSERT INTO clients (name, dob, cpf, rg, phone) VALUES (?, ?, ?, ?, ?)";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([$name, $dob, $cpf, $rg, $phone]);
    }

    // Obter cliente por ID
    public function getClientById($id)
    {
        $sql = "SELECT * FROM clients WHERE id = ?";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([$id]);
        return $stmt->fetch();
    }

    // Obter todos os clientes
    public function getAllClients()
    {
        $sql = "SELECT * FROM clients";
        $stmt = $this->pdo->query($sql);
        return $stmt;
    }

    // Atualizar cliente
    public function updateClient($id, $name, $dob, $cpf, $rg, $phone)
    {
        $sql = "UPDATE clients SET name = ?, dob = ?, cpf = ?, rg = ?, phone = ? WHERE id = ?";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([$name, $dob, $cpf, $rg, $phone, $id]);
    }

    // Excluir cliente
    public function deleteClient($id)
    {
        $sql = "DELETE FROM clients WHERE id = ?";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([$id]);
    }
}

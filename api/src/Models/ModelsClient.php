<?php

namespace App\Models;

use App\Config\Database;
use PDO;
use PDOException;

class ModelsClient
{
    private $pdo;

    public function __construct()
    {
        $database = new Database();
        $this->pdo = $database->getConnection();
    }

    public function createClient($name, $dob, $cpf, $rg, $phone)
    {
        try {
            $sql = "INSERT INTO clients (name, dob, cpf, rg, phone) VALUES (:name, :dob, :cpf, :rg, :phone)";
            $stmt = $this->pdo->prepare($sql);
            $stmt->execute([
                'name' => $name,
                'dob' => $dob,
                'cpf' => $cpf,
                'rg' => $rg,
                'phone' => $phone
            ]);

            return ['id' => $this->pdo->lastInsertId()];
        } catch (PDOException $e) {
            throw new \Exception("Erro ao criar cliente: " . $e->getMessage());
        }
    }

    public function getClientById($id)
    {
        try {
            $sql = "SELECT * FROM clients WHERE id = ?";
            $stmt = $this->pdo->prepare($sql);
            $stmt->execute([$id]);
            return $stmt->fetch(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            throw new \Exception("Erro ao buscar cliente: " . $e->getMessage());
        }
    }

    public function getAllClients()
    {
        try {
            $sql = "SELECT * FROM clients";
            $stmt = $this->pdo->query($sql);
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            throw new \Exception("Erro ao buscar clientes: " . $e->getMessage());
        }
    }

    public function updateClient($id, $name, $dob, $cpf, $rg, $phone)
    {
        try {
            $sql = "UPDATE clients SET name = ?, dob = ?, cpf = ?, rg = ?, phone = ? WHERE id = ?";
            $stmt = $this->pdo->prepare($sql);
            $stmt->execute([$name, $dob, $cpf, $rg, $phone, $id]);
        } catch (PDOException $e) {
            throw new \Exception("Erro ao atualizar cliente: " . $e->getMessage());
        }
    }

    public function deleteClient($id)
    {
        try {
            $sql = "DELETE FROM clients WHERE id = ?";
            $stmt = $this->pdo->prepare($sql);
            $stmt->execute([$id]);
        } catch (PDOException $e) {
            throw new \Exception("Erro ao excluir cliente: " . $e->getMessage());
        }
    }
}

<?php

namespace App\Models;

class ModelsAddress
{
    private $pdo;

    public function __construct($pdo)
    {
        $this->pdo = $pdo;
    }

    // Criar endereço
    public function createAddress($client_id, $cep, $logradouro, $bairro, $localidade, $cidade, $uf)
    {
        $sql = "INSERT INTO addresses (client_id, cep, logradouro, bairro, localidade, cidade, uf) VALUES (?, ?, ?, ?, ?, ?, ?)";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([$client_id, $cep, $logradouro, $bairro, $localidade, $cidade, $uf]);
    }

    // Obter endereços por cliente
    public function getAddressesByClientId($clientId)
    {
        $sql = "SELECT * FROM addresses WHERE client_id = ?";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([$clientId]);
        return $stmt;
    }

    // Atualizar endereço
    public function updateAddress($id, $cep, $logradouro, $bairro, $localidade, $cidade, $uf)
    {
        $sql = "UPDATE addresses SET cep = ?, logradouro = ?, bairro = ?, localidade = ?, cidade = ?, uf = ? WHERE id = ?";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([$cep, $logradouro, $bairro, $localidade, $cidade, $uf, $id]);
    }

    // Excluir endereço
    public function deleteAddress($id)
    {
        $sql = "DELETE FROM addresses WHERE id = ?";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([$id]);
    }
}

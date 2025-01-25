<?php

namespace App\Models;

use App\Config\Database;

class ModelsAddress
{
    private $pdo;

    public function __construct()
    {
        $database = new Database();
        $this->pdo = $database->getConnection();
    }

    public function createAddress($client_id, $postal_code, $street, $neighborhood, $locality, $city, $state)
    {
        try {
            // Iniciar transação
            $this->pdo->beginTransaction();

            // Verificar se o cliente existe
            $stmt = $this->pdo->prepare("SELECT COUNT(*) FROM clients WHERE id = :client_id");
            $stmt->execute(['client_id' => $client_id]);
            $clientExists = $stmt->fetchColumn();

            if (!$clientExists) {
                throw new \Exception("Client with ID '$client_id' does not exist.");
            }

            // Sanitização dos dados de entrada (se necessário)
            // Você pode adicionar filtros ou sanitização adicional conforme necessário

            // Verificar se o endereço já está cadastrado para o cliente
            $stmt = $this->pdo->prepare("SELECT COUNT(*) FROM addresses WHERE client_id = :client_id AND postal_code = :postal_code AND street = :street");
            $stmt->execute([
                'client_id' => $client_id,
                'postal_code' => $postal_code,
                'street' => $street
            ]);
            $addressExists = $stmt->fetchColumn();

            if ($addressExists) {
                throw new \Exception("The address with postal code '$postal_code' and street '$street' is already registered for this client.");
            }

            // Inserir o endereço no banco de dados
            $stmt = $this->pdo->prepare("
            INSERT INTO addresses (client_id, postal_code, street, neighborhood, locality, city, state) 
            VALUES (:client_id, :postal_code, :street, :neighborhood, :locality, :city, :state)
        ");

            $stmt->execute([
                'client_id' => $client_id,
                'postal_code' => $postal_code,
                'street' => $street,
                'neighborhood' => $neighborhood,
                'locality' => $locality,
                'city' => $city,
                'state' => $state
            ]);

            // Confirmar a transação
            $this->pdo->commit();

            // Obter o ID do endereço inserido
            $addressId = $this->pdo->lastInsertId();

            // Retornar os dados do endereço inserido
            return [
                'id' => $addressId,
                'client_id' => $client_id,
                'postal_code' => $postal_code,
                'street' => $street,
                'neighborhood' => $neighborhood,
                'locality' => $locality,
                'city' => $city,
                'state' => $state
            ];
        } catch (\Exception $e) {
            // Reverter a transação em caso de erro
            $this->pdo->rollBack();
            throw $e; // Repassar a exceção
        }
    }

    public function getAddressById($id)
    {
        $sql = "SELECT id, client_id, postal_code, street, neighborhood, locality, city, state, created_at, updated_at FROM addresses WHERE id = ?";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([$id]);

        return $stmt->fetch(\PDO::FETCH_ASSOC);
    }

    public function getAllAddresses()
    {
        $sql = "SELECT * FROM addresses"; // Consulta para pegar todos os endereços
        $stmt = $this->pdo->query($sql); // Executa a consulta
        return $stmt->fetchAll(\PDO::FETCH_ASSOC); // Retorna todos os endereços como um array associativo
    }

    public function getAddressesByClientId($clientId)
    {
        $sql = "SELECT * FROM addresses WHERE client_id = ?";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([$clientId]);
        return $stmt->fetchAll(\PDO::FETCH_ASSOC);
    }

    public function updateAddress($id, $postal_code, $street, $neighborhood, $locality, $city, $state)
    {

        // Verificar se o endereço já está cadastrado para o cliente
        $stmt = $this->pdo->prepare("SELECT COUNT(*) FROM addresses WHERE id = :id AND postal_code = :postal_code AND street = :street");
        $stmt->execute([
            'id' => $id,
            'postal_code' => $postal_code,
            'street' => $street
        ]);
        $addressExists = $stmt->fetchColumn();

        if ($addressExists) {
            throw new \Exception("The address with postal code '$postal_code' and street '$street' is already registered for this client.");
        }
        $sql = "UPDATE addresses SET postal_code = ?, street = ?, neighborhood = ?, locality = ?, city = ?, state = ? WHERE id = ?";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([$postal_code, $street, $neighborhood, $locality, $city, $state, $id]);
    }

    public function deleteAddress($id)
    {
        $sql = "DELETE FROM addresses WHERE id = ?";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([$id]);
    }
}

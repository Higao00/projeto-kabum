<?php

namespace App\Controllers;

use App\Models\ModelsAddress;

class AddressController
{
    private $addressModel;

    public function __construct()
    {
        $this->addressModel = new ModelsAddress();
    }

    public function createAddress($request, $response, $args)
    {
        $data = json_decode($request->getBody()->getContents(), true);

        $client_id = $data['client_id'] ?? null;
        $postal_code = $data['postal_code'] ?? null;
        $street = $data['street'] ?? null;
        $neighborhood = $data['neighborhood'] ?? null;
        $locality = $data['locality'] ?? null;
        $city = $data['city'] ?? null;
        $state = $data['state'] ?? null;

        try {
            if (empty($client_id) || empty($postal_code) || empty($street) || empty($neighborhood) || empty($locality) || empty($city) || empty($state)) {
                throw new \Exception('Campos obrigatórios faltando');
            }

            $createdAddress = $this->addressModel->createAddress($client_id, $postal_code, $street, $neighborhood, $locality, $city, $state);

            $response->getBody()->write(json_encode($createdAddress));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(201);
        } catch (\Exception $e) {
            $response->getBody()->write(json_encode(['message' => $e->getMessage()]));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(400);
        }
    }

    public function getAllAddresses($request, $response, $args)
    {
        $addresses = $this->addressModel->getAllAddresses();

        if (!$addresses) {
            $response->getBody()->write(json_encode(['message' => 'Nenhum endereço encontrado']));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(404);
        }

        $response->getBody()->write(json_encode($addresses));
        return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
    }

    public function getAddressesByClientId($request, $response, $args)
    {
        $clientId = $args['id'];
        $addresses = $this->addressModel->getAddressesByClientId($clientId);

        if (!$addresses) {
            $response->getBody()->write(json_encode(['message' => 'Nenhum endereço encontrado para este cliente']));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(404);
        }

        $response->getBody()->write(json_encode($addresses));
        return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
    }

    public function getAddressById($request, $response, $args)
    {
        $clientId = $args['id'];
        $addresses = $this->addressModel->getAddressById($clientId);

        if (!$addresses) {
            $response->getBody()->write(json_encode(['message' => 'Nenhum endereço encontrado para este ID']));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(404);
        }

        $response->getBody()->write(json_encode($addresses));
        return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
    }

    public function updateAddress($request, $response, $args)
    {
        $id = $args['id'];
        $data = json_decode($request->getBody()->getContents(), true);

        $postal_code = $data['postal_code'] ?? null;
        $street = $data['street'] ?? null;
        $neighborhood = $data['neighborhood'] ?? null;
        $locality = $data['locality'] ?? null;
        $city = $data['city'] ?? null;
        $state = $data['state'] ?? null;

        try {
            $currentAddress = $this->addressModel->getAddressById($id);
            if (!$currentAddress) {
                throw new \Exception('Endereço não encontrado');
            }

            $clientId = $currentAddress['client_id'];

            $existingAddress = $this->addressModel->findDuplicateAddressExcludingCurrent(
                $postal_code,
                $street,
                $neighborhood,
                $locality,
                $city,
                $state,
                $id,
                $clientId
            );

            if ($existingAddress) {
                throw new \Exception('Endereço já existe para outro cliente');
            }

            $this->addressModel->updateAddress($id, $postal_code, $street, $neighborhood, $locality, $city, $state);

            $updatedAddress = $this->addressModel->getAddressById($id);

            $response->getBody()->write(json_encode($updatedAddress));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
        } catch (\Exception $e) {
            $response->getBody()->write(json_encode(['message' => $e->getMessage()]));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(400);
        }
    }

    public function deleteAddress($request, $response, $args)
    {
        $id = $args['id'];
        $address = $this->addressModel->getAddressById($id);

        if (!$address) {
            $response->getBody()->write(json_encode(['message' => 'Endereço não encontrado']));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(404);
        }

        $this->addressModel->deleteAddress($id);

        $response->getBody()->write(json_encode(['message' => 'Endereço excluído com sucesso']));
        return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
    }
}

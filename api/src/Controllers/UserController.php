<?php

namespace App\Controllers;

use App\Models\ModelsUser;
use Firebase\JWT\JWT;

class UserController
{
    private $userModel;
    private $secretKey = 'your_secret_key'; // Chave secreta para assinar o JWT

    public function __construct()
    {

        $this->userModel = new ModelsUser();
    }

    // Registrar usuário
    public function register($request, $response, $args)
    {
        $data = json_decode($request->getBody()->getContents(), true);

        $name = $data['name'] ?? null;
        $email = $data['email'] ?? null;
        $password = $data['password'] ?? null;
        $status = $data['status'] ?? null;

        try {
            // Criar o usuário e obter os dados do usuário criado
            $createdUser = $this->userModel->createUser($name, $email, $password, $status);

            $response->getBody()->write(json_encode($createdUser));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(201);
        } catch (\Exception $e) {
            $response->getBody()->write(json_encode(['message' => $e->getMessage()]));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(400);
        }
    }

    // Login de usuário
    public function login($request, $response, $args)
    {
        $data = json_decode($request->getBody()->getContents(), true);

        $email = $data['email'] ?? null;
        $password = $data['password'] ?? null;

        // Validação inicial: Verificar se os campos obrigatórios estão presentes
        if (empty($email) || empty($password)) {
            $response->getBody()->write(json_encode(['message' => 'Email and password are required']));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(400);
        }

        // Recupera o usuário do banco de dados com base no email
        $user = $this->userModel->getUserByEmail($email);

        // Verifica se o usuário não existe ou a senha não é válida
        if (!$user || !password_verify($password, $user['password'])) {
            $response->getBody()->write(json_encode(['message' => 'Invalid credentials']));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(401);
        }

        // Remove a senha do retorno para segurança
        unset($user['password']);

        // Gerar o JWT
        $issuedAt = time();
        $expirationTime = $issuedAt + 360000; // Expira em 1 hora
        $payload = [
            'iat' => $issuedAt,
            'exp' => $expirationTime,
            'sub' => $user['id'], // ID do usuário como identificador
            'email' => $user['email'],
        ];

        $jwt = JWT::encode($payload, $this->secretKey, 'HS256');

        // Retorna a resposta com os dados do usuário e o token
        $response->getBody()->write(json_encode([
            'user' => [
                'id' => $user['id'],
                'name' => $user['name'],
                'email' => $user['email'],
                'status' => $user['status'], // Incluindo status, se relevante
            ],
            'token' => $jwt,
        ]));
        return $response->withHeader('Content-Type', 'application/json')->withStatus(201);
    }

    // Obter todos os usuários
    public function getAllUsers($request, $response, $args)
    {
        $users = $this->userModel->getAllUsers();
        $userArray = [];

        while ($user = $users->fetch(\PDO::FETCH_ASSOC)) {
            unset($user['password']); // Remove a senha para maior segurança
            $userArray[] = $user;
        }

        $response->getBody()->write(json_encode($userArray));
        return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
    }

    // Obter usuário por ID
    public function getUserById($request, $response, $args)
    {
        $id = $args['id'];
        $user = $this->userModel->getUserById($id);

        if (!$user) {
            $response->getBody()->write(json_encode(['message' => 'User not found']));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(404);
        }

        // Certifique-se de remover a senha antes de retornar os dados
        unset($user['password']);

        // Aqui verificamos se o retorno possui chaves numéricas e substituímos por nomes esperados
        $user = array_filter($user, function ($key) {
            return !is_numeric($key);  // Filtrando chaves numéricas
        }, ARRAY_FILTER_USE_KEY);

        $response->getBody()->write(json_encode($user));
        return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
    }

    // Atualizar usuário
    public function updateUser($request, $response, $args)
    {
        $id = $args['id'];
        $data = json_decode($request->getBody()->getContents(), true);

        $name = $data['name'] ?? null;
        $email = $data['email'] ?? null;
        $status = isset($data['status']) ? (int)$data['status'] : null;

        // Impedir alterações no admin (ID 1)
        if ($id == 1) {
            $response->getBody()->write(json_encode(['message' => 'It is not possible to change the admin']));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(400);
        }

        // Verificar se o usuário existe antes da atualização
        $user = $this->userModel->getUserById($id);

        if (!$user) {
            $response->getBody()->write(json_encode(['message' => 'User not found']));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(404);
        }

        // Atualizar o usuário
        $this->userModel->updateUser($id, $name, $email, $status);

        // Buscar os dados atualizados do usuário
        $updatedUser = $this->userModel->getUserById($id);

        // Garantir que a senha não seja retornada
        unset($updatedUser['password']);

        // Retornar o objeto atualizado
        $response->getBody()->write(json_encode($updatedUser));

        return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
    }

    // Excluir usuário
    public function deleteUser($request, $response, $args)
    {
        $id = $args['id'];
        $user = $this->userModel->getUserById($id);

        if ($id == 1) {
            $response->getBody()->write(json_encode(['message' => 'Unable to remove admin']));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(400);
        }

        if (!$user) {
            $response->getBody()->write(json_encode(['message' => 'User not found']));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(404);
        }

        $this->userModel->deleteUser($id);

        $response->getBody()->write(json_encode(['message' => 'User deleted successfully']));
        return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
    }
}

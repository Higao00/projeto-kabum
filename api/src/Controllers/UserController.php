<?php

namespace App\Controllers;


use App\Models\ModelsUser;
use \Firebase\JWT\JWT;


class UserController
{
    private $pdo;
    private $userModel;
    private $secretKey = 'your_secret_key'; // Chave secreta para assinar o JWT

    public function __construct($pdo)
    {
        $this->pdo = $pdo;
        $this->userModel = new ModelsUser($this->pdo);
    }

    // Registrar usuário
    public function register($request, $response, $args)
    {
        $data = $request->getParsedBody();

        $name = $data['name'];
        $email = $data['email'];
        $password = $data['password'];
        $status = $data['status'];

        if (empty($name) || empty($email) || empty($password) || empty($status)) {
            return $response->withJson(['error' => 'Missing required fields'], 400);
        }

        $this->userModel->createUser($name, $email, $password, $status);

        return $response->withJson(['message' => 'User created successfully'], 201);
    }

    // Login de usuário
    public function login($request, $response, $args)
    {
        $data = $request->getParsedBody();
        $email = $data['email'];
        $password = $data['password'];

        $user = $this->userModel->getUserByEmail($email);

        if (!$user || !password_verify($password, $user['password'])) {
            return $response->withJson(['error' => 'Invalid credentials'], 401);
        }

        // Gerar o JWT
        $issuedAt = time();
        $expirationTime = $issuedAt + 3600;  // Expira em 1 hora a partir de agora
        $payload = [
            'iat' => $issuedAt,  // Hora de emissão
            'exp' => $expirationTime,  // Hora de expiração
            'sub' => $user['id'],  // ID do usuário, por exemplo
            'email' => $user['email'], // Outros dados que podem ser úteis no payload
        ];

        // Assinar o JWT com a chave secreta
        $jwt = JWT::encode($payload, $this->secretKey, 'HS256');

        return $response->withJson([
            'message' => 'Login successful',
            'user' => $user,
            'token' => $jwt,  // Retorna o JWT
        ], 200);
    }

    // Obter todos os usuários
    public function getAllUsers($request, $response, $args)
    {
        $users = $this->userModel->getAllUsers();
        $userArray = [];

        while ($user = $users->fetch()) {
            $userArray[] = $user;
        }

        return $response->withJson($userArray, 200);
    }

    // Obter usuário por ID
    public function getUserById($request, $response, $args)
    {
        $id = $args['id'];
        $user = $this->userModel->getUserById($id);

        if (!$user) {
            return $response->withJson(['error' => 'User not found'], 404);
        }

        return $response->withJson($user, 200);
    }

    // Atualizar usuário
    public function updateUser($request, $response, $args)
    {
        $id = $args['id'];
        $data = $request->getParsedBody();

        $name = $data['name'];
        $email = $data['email'];
        $password = $data['password'];
        $status = $data['status'];

        if (empty($name) || empty($email) || empty($password) || empty($status)) {
            return $response->withJson(['error' => 'Missing required fields'], 400);
        }

        $this->userModel->updateUser($id, $name, $email, $password, $status);

        return $response->withJson(['message' => 'User updated successfully'], 200);
    }

    // Excluir usuário
    public function deleteUser($request, $response, $args)
    {
        $id = $args['id'];
        $user = $this->userModel->getUserById($id);

        if (!$user) {
            return $response->withJson(['error' => 'User not found'], 404);
        }

        $this->userModel->deleteUser($id);

        return $response->withJson(['message' => 'User deleted successfully'], 200);
    }
}

<?php

class CreateSeedData
{
    public function up(PDO $db)
    {
        // Inserir 5 registros na tabela 'users'
        $sql = "INSERT INTO users (name, email, password) VALUES
                ('Alice Silva', 'alice@example.com', 'password123'),
                ('Bob Souza', 'bob@example.com', 'password123'),
                ('Carlos Oliveira', 'carlos@example.com', 'password123'),
                ('Daniela Pereira', 'daniela@example.com', 'password123'),
                ('Eduardo Lima', 'eduardo@example.com', 'password123')";
        $db->exec($sql);

        // Inserir 5 registros na tabela 'clients'
        $sql = "INSERT INTO clients (name, dob, cpf, rg, phone) VALUES
                ('Alice Silva', '1990-01-01', '123.456.789-00', 'MG123456', '1234567890'),
                ('Bob Souza', '1985-02-15', '987.654.321-00', 'SP987654', '2345678901'),
                ('Carlos Oliveira', '1992-03-20', '135.246.357-00', 'RJ135246', '3456789012'),
                ('Daniela Pereira', '1988-04-10', '246.357.468-00', 'PR246357', '4567890123'),
                ('Eduardo Lima', '1995-05-25', '357.468.579-00', 'BA357468', '5678901234')";
        $db->exec($sql);

        // Inserir 5 registros na tabela 'addresses' com referências válidas de client_id
        // Aqui, é importante que os client_id estejam de acordo com os registros na tabela 'clients'
        $sql = "INSERT INTO addresses (client_id, postal_code, street, neighborhood, locality, city, state) VALUES
                (1, '12345-000', 'Rua A', '5005', 'Localidade A', 'Cidade A', 'MG'),
                (2, '23456-000', 'Rua B', '2006', 'Localidade B', 'Cidade B', 'SP'),
                (3, '34567-000', 'Rua C', '105 AP15', 'Localidade C', 'Cidade C', 'RJ'),
                (4, '45678-000', 'Rua D', '23 AP45', 'Localidade D', 'Cidade D', 'PR'),
                (5, '56789-000', 'Rua E', '1002', 'Localidade E', 'Cidade E', 'BA')";
        $db->exec($sql);
    }

    public function down(PDO $db)
    {
        // Remover os registros das tabelas 'addresses', 'clients' e 'users'
        $sql = "DELETE FROM addresses WHERE client_id IN (1, 2, 3, 4, 5)";
        $db->exec($sql);

        $sql = "DELETE FROM clients WHERE id IN (1, 2, 3, 4, 5)";
        $db->exec($sql);

        $sql = "DELETE FROM users WHERE id IN (1, 2, 3, 4, 5)";
        $db->exec($sql);
    }
}

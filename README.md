# Painel de Gerenciamento de Clientes e Usuários

Este projeto é um painel para gerenciamento de clientes e usuários, desenvolvido com foco em modularidade e utilização de contêineres Docker para facilitar o ambiente de desenvolvimento e produção.

## Tecnologias Utilizadas

-   **PHP** (Back-end)
-   **NEXTJS** (Front-end)
-   **MySQL** (Banco de dados relacional)
-   **Docker** (Contêineres isolados)
-   **Docker Compose** (Orquestração de contêineres)

## Pré-requisitos

-   Docker instalado ([Instruções de instalação](https://docs.docker.com/get-docker/))
-   Docker Compose instalado ([Instruções de instalação](https://docs.docker.com/compose/install/))

## Passos para Configuração

Siga os passos abaixo para configurar e executar o projeto:

### 1. Clone o Repositório

```bash
git clone https://github.com/Higao00/projeto-kabum.git
```

### 1. Instalação das dependencias

```bash
cd projeto-kabum/frontend
```

```bash
npm install
```


### 2. Suba os Contêineres com Docker Compose

Execute o comando abaixo para iniciar os contêineres:

```bash
docker-compose up -d
```

Este comando irá:

-   Criar e iniciar os serviços definidos no arquivo `docker-compose.yml`.
-   Configurar os contêineres para a API, banco de dados, frontend, entre outros.

### 3. Execute as Migrações do Banco de Dados

Após os contêineres estarem em execução, execute o comando abaixo para aplicar as migrações do banco de dados: 
(Caso ocorra um erro, pode ser que o banco de dados ainda não esteja disponível. Aguarde alguns instantes e tente novamente)

```bash
docker exec -it php-api php migrate.php
```

Este comando inicializa o script de migração dentro do contêiner `php-api`, criando as tabelas necessárias no banco de dados.


### 4. Após as migrações você pode acessar a aplicação com o super usuário.

```bash
User: admin@gmail.com
```

```bash
Password: 123456
```

## Estrutura do Projeto

-   **/api**: Contém a API desenvolvida em PHP.
-   **/frontend**: Código para o frontend em NextJs.
-   **docker-compose.yml**: Configuração dos serviços Docker.
-   **migrate.php**: Script de migração para configurar o banco de dados.

## Comandos Úteis

### Parar os Contêineres

Para parar todos os contêineres em execução, use:

```bash
docker-compose down
```

### Reconstruir os Contêineres

Caso você altere o código e precise reconstruir os contêineres, execute:

```bash
docker-compose build --no-cache
docker-compose up -d
```

### Acessar o Contêiner PHP

Para entrar no contêiner PHP e executar comandos manualmente:

```bash
docker exec -it php-api bash
```

## Problemas Comuns

-   **Portas em Uso:** Certifique-se de que as portas 80, 3000 e 3306 (ou outras configuradas) não estão sendo usadas por outros serviços.
-   **Falha no Banco de Dados:** Verifique as credenciais do banco de dados no arquivo `.env`.

## Contribuição

Sinta-se à vontade para contribuir com melhorias para o projeto. Faça um fork, crie uma branch e envie um pull request com suas alterações.

## Licença

Este projeto é licenciado sob a [MIT License](LICENSE).

---

Desenvolvido com 💻 e ☕ por [Seu Nome].

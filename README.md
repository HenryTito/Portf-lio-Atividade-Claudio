# Projeto Portfólio – Node.js + Express + Sequelize

Este projeto é um portfólio com gerenciamento de disciplinas usando **Node.js**, **Express**, **EJS**, **MySQL** e **Sequelize**.

##  Como rodar o projeto localmente

### 1. Clone o repositório

### 2. Instale as dependências

Rode o comando abaixo na raiz do projeto para instalar todas as dependências listadas no `package.json`:

npm install


### 3. Configure o banco de dados MySQL

Crie um banco de dados local chamado portfolio_db. Certifique-se de que o serviço MySQL/MariaDB esteja em execução na sua máquina antes de continuar.

### 4. Crie o arquivo .env na raiz do projeto

Crie um arquivo chamado .env e adicione as variáveis de ambiente necessárias para a conexão com o banco de dados:

DB_NAME=portfolio_db
DB_USER=root
DB_PASS=SUA_SENHA_AQUI
DB_HOST=localhost


### 5. Rode o servidor

Inicie a aplicação com o comando:

node app.js


### Se a conexão com o banco for bem-sucedida e o servidor subir, você verá mensagens de confirmação no terminal.

### 6. Acesse no navegador

Abra o navegador e acesse:

http://localhost:3000

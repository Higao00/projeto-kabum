# Usar a imagem oficial do Node.js completa
FROM node:18-bullseye

# Definir o diretório de trabalho
WORKDIR /app

# Copiar arquivos do projeto
COPY package*.json ./
COPY . .

# Instalar as dependências do projeto
RUN npm install

# Expor a porta usada pelo Next.js
EXPOSE 3000

# Comando para iniciar o servidor Next.js
CMD ["npm", "run", "dev"]

# Usar a imagem oficial do Node.js
FROM node:18-bullseye

# Definir o diretório de trabalho
WORKDIR /usr/src/app

# Copiar apenas os arquivos de dependências
COPY package*.json ./

# Instalar as dependências do projeto
RUN npm install

# Expor a porta usada pelo Next.js
EXPOSE 3000

# Comando para iniciar o servidor Next.js no modo desenvolvimento
CMD ["npm", "run", "dev"]

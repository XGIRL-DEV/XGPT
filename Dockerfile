# Utiliser une image de base Node.js dev
FROM node:18-alpine

# Définir le répertoire de travail
WORKDIR /src/app

# Copier le fichier package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste des fichiers du projet
COPY . .

# Construire le projet
RUN npm run build

# Exposer le port sur lequel l'application va tourner
EXPOSE 3001

# Commande pour démarrer l'application
CMD ["npm", "start"]

# Instructions pour exécuter le conteneur après sa création (en commentaire)
# docker run -d --name Supportxjs-app --env-file /path/to/.env -p 3001:3000 nextjs-app:latest

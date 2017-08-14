# Installation
Recupérer le dépôt, puis:
> npm install

---

## Mode dev
> npm run dev

Lance le serveur et le redémarrre quand des changements sont détectés. Relance webpack à chaque modification dans le code source.

---

## Tests

> npm run test

Lance les tests unitaires

> npm run test:e2e

Lance les tests end-to-end avec un webdriver

*Nécessite un serveur en éxécution*

---

## Deploiement

1. Générer un build pour la prod

  > npm run build

  Pour générer une version minifié et sans source-map du code javascript.

2. Déployer les fichier

  Envoyer via FTP les fichiers suivants sur le serveur:

  * package.json
  * .babelrc
  * server.js
  * server/*
  * public/*


3. Récuperer les dépendances nécessaires

  > npm install --production

4. Lancer le serveur

  > npm start

**OPTIONNEL**: Configurer un gestionnaire d'application (PM2, Strongloop, ...)

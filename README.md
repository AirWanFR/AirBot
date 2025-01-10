
# Escanor - Discord Bot

**Escanor** est un bot Discord développé avec Node.js et la bibliothèque [discord.js](https://discord.js.org/). Ce bot est conçu pour interagir avec les utilisateurs sur un serveur Discord, offrir des commandes personnalisées, et afficher des informations en temps réel. Il est entièrement personnalisable pour s'adapter aux besoins spécifiques de ton serveur.

## Fonctionnalités

- Connexion à l'API Discord pour gérer les événements et messages.
- Commandes personnalisées pour interagir avec les utilisateurs.
- Statut dynamique affichant des informations sur l'état du bot et du serveur.
- Mode "Do Not Disturb" (DND) configurable et changement de statut automatique.
- Personnalisation facile du code pour l'adapter à tes besoins.

## Prérequis

Avant de pouvoir utiliser ce bot, tu auras besoin des éléments suivants :

- **Node.js** v14 ou supérieur : [Télécharger Node.js](https://nodejs.org/)
- Un **token Discord Bot** valide : [Créer un bot Discord](https://discord.com/developers/applications)
- Un **serveur Discord** où tu peux ajouter le bot.

## Installation

1. Clone le dépôt ou télécharge-le sur ton serveur :

   ```bash
   git clone https://github.com/AirWanFR/Escanor.git
   cd Escanor
   ```

2. Installe les dépendances nécessaires avec `npm` :

   ```bash
   npm install
   ```

3. Crée un fichier `.env` à la racine du projet et ajoute-y ton **Discord Bot Token** comme suit :

   ```
   DISCORD_TOKEN=TON_BOT_TOKEN
   ```

4. Lance le bot en exécutant la commande suivante :

   ```bash
   node index.js
   ```

   Le bot devrait maintenant être en ligne et prêt à fonctionner sur ton serveur Discord.

## Commandes disponibles

Voici quelques-unes des commandes que tu peux utiliser avec ce bot :

- `!help` : Affiche une liste de toutes les commandes disponibles.
- `!status` : Affiche le statut actuel du bot.
- `!setstatus <status>` : Change le statut du bot (par exemple `!setstatus dnd` pour un statut "Do Not Disturb").
  
Tu peux ajouter ou modifier ces commandes dans le fichier `index.js` en fonction de tes besoins.


## Sécurité

**Important :** N'ajoute jamais ton token Discord directement dans le code. Utilise un fichier `.env` pour stocker tes informations sensibles en toute sécurité. Le dépôt utilise également un fichier `.gitignore` pour éviter que des fichiers sensibles comme `.env` ne soient poussés vers GitHub.

## Auteurs

- **Airwan Dev** - [GitHub](https://github.com/AirWanFR)

## Licence

Ce projet est sous la licence MIT - voir le fichier [LICENSE](LICENSE) pour plus de détails.

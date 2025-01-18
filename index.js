require('dotenv').config();  // Charger les variables d'environnement
const { Client, GatewayIntentBits } = require('discord.js');
const fs = require('fs');
const path = require('path');
const clc = require('cli-color');  // Pour la coloration des logs dans la console

// Charger les variables d'environnement
const DISCORD_TOKEN = process.env.DISCORD_TOKEN;
const CHANNEL_LOG = process.env.CHANNEL_LOG;
const PREFIX = process.env.PREFIX || '!';  // Le préfixe est récupéré depuis .env ou défini par défaut

// Créer une instance du client Discord avec les intentions appropriées
const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
});

// Charger les commandes
client.commands = new Map();

// Charger toutes les commandes depuis le dossier "commands"
const commandsPath = path.join(__dirname, 'commands');
fs.readdirSync(commandsPath).forEach((file) => {
  const command = require(path.join(commandsPath, file));
  client.commands.set(command.name, command);
});

// Gérer les événements lorsque le bot est prêt
client.on('ready', () => {
  console.log(clc.green(`[INFO] Le bot est connecté et prêt !`));
  client.user.setPresence({
    status: 'online',  // Définir le statut du bot
    activities: [{ name: 'Attendre des commandes...', type: 0 }],
  });
});

// Gérer les messages
client.on('messageCreate', (message) => {
  if (message.author.bot) return;  // Ignorer les messages du bot lui-même

  // Vérifier si le message commence par le préfixe
  if (!message.content.startsWith(PREFIX)) return;

  // Extraire le nom de la commande
  const args = message.content.slice(PREFIX.length).trim().split(/\s+/);
  const commandName = args.shift().toLowerCase();  // Prendre la commande sans le préfixe

  // Si la commande existe dans le bot, exécuter la fonction associée
  if (client.commands.has(commandName)) {
    const command = client.commands.get(commandName);
    try {
      command.execute(message, args);
    } catch (error) {
      console.error(error);
      message.reply('Une erreur est survenue lors de l\'exécution de cette commande.');
    }
  }
});

// Gérer les erreurs de déconnexion du bot
client.on('disconnect', () => {
  console.log(clc.red(`[ERROR] Le bot a été déconnecté`));
});

// Lancer le bot avec le token récupéré dans le fichier .env
client.login(DISCORD_TOKEN)
  .then(() => console.log(clc.green('[INFO] Bot connecté avec succès')))
  .catch((error) => console.error(clc.red(`[ERROR] Impossible de se connecter : ${error.message}`)));

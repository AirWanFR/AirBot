// Charger les bibliothèques nécessaires
require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');
const fs = require('fs');
const path = require('path');
const clc = require('cli-color'); // Importation de `cli-color`

// Charger les variables d'environnement
const DISCORD_TOKEN = process.env.DISCORD_TOKEN;
const CHANNEL_LOG = process.env.CHANNEL_LOG;
const PREFIX = process.env.PREFIX || '!'; // Préfixe modifiable via .env

// Configurer le bot Discord
const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
});

// Commandes
client.commands = new Map();

// Charger toutes les commandes depuis le dossier "commands"
const commandsPath = path.join(__dirname, 'commands');
fs.readdirSync(commandsPath).forEach((file) => {
  const command = require(path.join(commandsPath, file));
  client.commands.set(command.name, command);
});

// Fonction pour obtenir l'heure actuelle
const getCurrentTime = () => {
    const now = new Date();
    const hour = now.getHours();
    const minute = now.getMinutes();
    const second = now.getSeconds();
    const times = `[${hour}:${minute}:${second}]`;
    return (`${times}`);
};

// Gérer les messages
client.on('messageCreate', (message) => {
  if (message.author.bot) return; // Ignorer les messages des bots

  // Si le message commence par le préfixe
  if (!message.content.startsWith(PREFIX)) return;

  const args = message.content.slice(PREFIX.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase(); // Extraire la commande

  if (client.commands.has(commandName)) {
    try {
      client.commands.get(commandName).execute(message, args); // Exécuter la commande
    } catch (error) {
      console.error(error);
      message.reply('Il y a eu une erreur lors de l\'exécution de la commande.');
    }
  }
});

// Quand le bot est prêt
client.on('ready', () => {
  const now = new Date();
  const times = `[${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}]`;

  console.log(clc.yellow(`${times}`) + clc.green(` [OK]`) + ` Le bot est connecté et prêt à fonctionner.`);

  // Envoie un message dans le canal de log
  const channel = client.channels.cache.get(CHANNEL_LOG);
  if (channel) {
    channel.send(`\`\`\`css\n${times} 🚀 Le bot est en ligne et prêt !\n\`\`\``);
  } else {
    console.log(clc.red('❌ Canal de log introuvable.'));
  }
});

// Lancer le bot
client.login(DISCORD_TOKEN);

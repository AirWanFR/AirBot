// Charger les bibliothèques nécessaires
require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');
const fs = require('fs');
const path = require('path');

// Charger les variables d'environnement
const DISCORD_TOKEN = process.env.DISCORD_TOKEN;
const CHANNEL_LOG = process.env.CHANNEL_LOG;

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
  client.commands.set(command.name, command.execute);
});

// Quand le bot est prêt
var now = new Date();
var hour = now.getHours();
var minute = now.getMinutes();
var second = now.getSeconds();
var times = (`[${hour}:${minute}:${second}]/`);

client.on('ready', () => {
  console.log(times + '[OK] Connexion à l\'API Discord.js effectuée');
  console.log(times + '[INFO] Connecté sur ' + client.user.username + '#' + client.user.discriminator);

  // Envoie un message dans le canal de log
  const channel = client.channels.cache.get(CHANNEL_LOG); 
  if (channel) {
    channel.send('Le bot est en ligne et prêt !');
  } else {
    console.log('Canal non trouvé !');
  }

  // Définir le statut et l'activité
  client.user.setPresence({
    status: 'online',
    activities: [{ name: 'Escanor', type: 1, url: 'https://twitch.tv/escano' }],
  });

  console.log('Présence mise à jour avec succès');
});

// Gérer les messages
client.on('messageCreate', (message) => {
  if (message.author.bot) return;

  const commandName = message.content.split(' ')[0].toLowerCase(); // Commande de base sans le préfixe
  if (client.commands.has(commandName)) {
    client.commands.get(commandName)(message);
  }
});

// Lancer le bot
client.login(DISCORD_TOKEN);

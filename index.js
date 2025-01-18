// Charger les bibliothèques nécessaires
require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');
const fs = require('fs');
const path = require('path');
const clc = require('cli-color'); // Importation de `cli-color`

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

// Définir les activités à changer
const activities = [
  { name: 'Escanor', type: 1, url: 'https://twitch.tv/erwancbr' }, // Diffusion en direct
  { name: 'au soleil ☀️', type: 0 }, // Joue à "au soleil"
  { name: 'les messages', type: 3 }, // Regarde "les messages"
  { name: 'la paix dans le monde 🌍', type: 5 }, // En compétition sur "la paix dans le monde"
];

let currentActivityIndex = 0;

function getCurrentTime() {
  const now = new Date();
  return now.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
}

const displayRandomMessage = () => {
  if (messages.length === 0) {
    console.log(clc.red(`[ERROR] Aucun message à afficher dans la liste des messages.`));
    return;
  }
  const randomIndex = Math.floor(Math.random() * messages.length);
  console.log(messages[randomIndex]);
};

function rotateActivity() {
  const activity = activities[currentActivityIndex];
  client.user.setPresence({
    status: 'online',
    activities: [activity],
  });

  const channel = client.channels.cache.get(CHANNEL_LOG);
  if (channel) {
    channel.send(`\`\`\`fix\n🔄 [INFO] Activité mise à jour : ${activity.name}\n\`\`\``);
  } else {
    console.log(clc.yellow('❌ Canal de log introuvable pour l\'activité'));
  }

  currentActivityIndex = (currentActivityIndex + 1) % activities.length;
}

// Gestion des événements du bot
client.on('ready', () => {
  displayRandomMessage();
  console.log(clc.green(`[${getCurrentTime()}] Le bot est prêt !`));

  const channel = client.channels.cache.get(CHANNEL_LOG);
  if (channel) {
    channel.send(`\`\`\`css\n[${getCurrentTime()}] 🚀 Le bot est en ligne et prêt !\n\`\`\``);
  } else {
    console.log(clc.red('❌ Canal de log introuvable lors du démarrage'));
  }

  rotateActivity();
  setInterval(rotateActivity, 20000);
});

client.on('messageCreate', (message) => {
  if (message.author.bot) return;

  const commandName = message.content.split(' ')[0].toLowerCase();
  if (client.commands.has(commandName)) {
    client.commands.get(commandName)(message);
  } else {
    message.reply(`❌ Commande inconnue : **${commandName}**`);
  }
});

process.on('SIGINT', () => {
  console.log(clc.red(`[BOT] Arrêt en cours...`));
  client.destroy();
  process.exit(0);
});

client.login(DISCORD_TOKEN);

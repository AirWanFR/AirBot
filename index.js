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

// Définir les activités à changer
const activities = [
  { name: 'Escanor', type: 2, url: 'https://twitch.tv/erwancbr' }, // Écoute "Escanor"
  { name: 'au soleil ☀️', type: 0 }, // Joue à "au soleil"
  { name: 'les messages', type: 3 }, // Regarde "les messages"
  { name: 'la paix dans le monde 🌍', type: 5 }, // En compétition sur "la paix dans le monde"
];

let currentActivityIndex = 0;

// Fonction pour changer l'activité cycliquement
function rotateActivity() {
  const activity = activities[currentActivityIndex];
  const channel = client.channels.cache.get(CHANNEL_LOG); 
  client.user.setPresence({
    status: 'online', // Statut du bot
    activities: [activity], // Activité actuelle
  });
  channel.send(`[INFO] Activité mise à jour : ${activity.name}`);

  // Passer à l'activité suivante
  currentActivityIndex = (currentActivityIndex + 1) % activities.length;
}

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
    channel.send(times + '🚀 Le bot est en ligne et prêt !');
  } else {
    console.log('❌ Canal non trouvé !');
  }

  // Lancer la rotation des activités toutes les 10 secondes
  rotateActivity(); // Initialiser avec la première activité
  setInterval(rotateActivity, 20000); // Changer toutes les 10 secondes
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

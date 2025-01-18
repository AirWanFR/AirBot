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

// Définir un préfixe modifiable
let PREFIX = 'aw!';

// Commandes
client.commands = new Map();

// Charger toutes les commandes depuis le dossier "commands"
const commandsPath = path.join(__dirname, 'commands');
fs.readdirSync(commandsPath).forEach((file) => {
  const command = require(path.join(commandsPath, file));
  client.commands.set(command.name, command.execute);
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
  // Ignorer les messages provenant du bot
  if (message.author.bot) return;

  // Vérifier si le message commence par le préfixe modifiable
  if (!message.content.startsWith(PREFIX)) return;

  // Extraire la commande (en enlevant le préfixe)
  const commandName = message.content.slice(PREFIX.length).split(' ')[0].toLowerCase();

  // Vérifier si la commande existe dans les commandes du bot
  if (client.commands.has(commandName)) {
    // Exécuter la commande
    client.commands.get(commandName)(message);
  }
});

// Quand le bot est prêt
client.on('ready', () => {
  const now = new Date();
  const hour = now.getHours();
  const minute = now.getMinutes();
  const second = now.getSeconds();
  const times = `[${hour}:${minute}:${second}]`;

  try {
    console.log(clc.yellow(`${times}`) + clc.green(` [OK]`) + ` Connexion à l'API Discord.js effectuée`);
    console.log(clc.yellow(`${times}`) + clc.green(` [SERVER]`) + ` Initialisation du serveur en cours...`);
    console.log(clc.yellow(`${times}`) + clc.blue(` [SERVER]`) + ` Serveur opérationnel. Les systèmes sont prêts.`);
    console.log(clc.yellow(`${times}`) + clc.cyan(` [BOT]`) + ` Démarrage du bot... Activation des modules.`);
    console.log(clc.yellow(`${times}`) + clc.green(` [BOT]`) + ` Connecté sur ${client.user.username}#${client.user.discriminator}.`);
    console.log(clc.yellow(`${times}`) + clc.magenta(` [BOT]`) + ` Chargement des commandes terminées.`);
    console.log(clc.yellow(`${times}`) + clc.red(` [SERVER]`) + ` Attention : fluctuations détectées dans les logs du démarrage. Tout est (probablement) sous contrôle.`);
    console.log(clc.yellow(`${times}`) + clc.green(` [OK]`) + ` Le serveur et le bot sont prêts à fonctionner.`);

    // Envoie un message dans le canal de log
    const channel = client.channels.cache.get(CHANNEL_LOG);
    if (channel) {
      channel.send(`\`\`\`css\n${times} 🚀 Le bot est en ligne et prêt !\n\`\`\``);
    } else {
      console.log(clc.red('❌ Canal de log introuvable lors du démarrage'));
    }
  } catch (error) {
    console.log(clc.red(`${times} [ERROR] Erreur lors de la préparation du bot : ${error.message}`));
  }
});

// Lancer le bot
client.login(DISCORD_TOKEN);

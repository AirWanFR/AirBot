require('dotenv').config(); // Charger les variables d'environnement du fichier .env
const { Client, GatewayIntentBits } = require('discord.js');
const fs = require('fs');
const path = require('path');
const clc = require('cli-color');

// Charger les variables d'environnement
const DISCORD_TOKEN = process.env.DISCORD_TOKEN;
const CHANNEL_LOG = process.env.CHANNEL_LOG;
let PREFIX = process.env.PREFIX || 'aw!'; // Charger le préfixe depuis .env, sinon utiliser 'aw!' par défaut

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

// Gérer les messages
client.on('messageCreate', (message) => {
  if (message.author.bot) return;

  // Vérifier si le message commence par le préfixe actuel
  if (message.content.startsWith(PREFIX)) {
    const commandName = message.content.slice(PREFIX.length).trim().split(' ')[0].toLowerCase();
    
    // Exécuter la commande correspondante si elle existe
    if (client.commands.has(commandName)) {
      client.commands.get(commandName)(message, message.content.slice(PREFIX.length).trim().split(' '));
    }
  }
});

// Quand le bot se déconnecte
client.on('disconnect', () => {
  const now = new Date();
  const hour = now.getHours();
  const minute = now.getMinutes();
  const second = now.getSeconds();
  const times = `[${hour}:${minute}:${second}]`;

  console.log(clc.red(`${times} [ERROR] Le bot a été déconnecté ou a rencontré une erreur`));
});

// Lancer le bot
client.login(DISCORD_TOKEN);

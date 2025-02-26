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

// Supprimer la rotation des activités

// Fonction pour obtenir l'heure actuelle
const getCurrentTime = () => {
    const now = new Date();
    const hour = now.getHours();
    const minute = now.getMinutes();
    const second = now.getSeconds();
    return `[${hour}:${minute}:${second}]`;
};

// Liste des messages
const messages = [
  clc.yellow(`${getCurrentTime()}`) + clc.green(` [OK]`) + ` Le système de sécurité est en ligne. Espérons que rien ne sortira des coulisses cette nuit...`,
  clc.yellow(`${getCurrentTime()}`) + clc.red(` [WARNING]`) + ` Attention : Freddy a été aperçu près de la scène.`,
  clc.yellow(`${getCurrentTime()}`) + clc.blue(` [INFO]`) + ` Les caméras fonctionnent... mais qui surveille vraiment ?`,
  clc.yellow(`${getCurrentTime()}`) + clc.magenta(` [SYSTEM]`) + ` Activation des animatroniques pour le mode veille... ou pas.`,
  clc.yellow(`${getCurrentTime()}`) + clc.cyan(` [DEBUG]`) + ` Vérification de la batterie des portes : 99%. Ça devrait suffire... non ?`,
  clc.yellow(`${getCurrentTime()}`) + clc.white(` [EVENT]`) + ` Foxy semble impatient. Pas de sprint pour l'instant.`,
  clc.yellow(`${getCurrentTime()}`) + clc.green(` [LOADING]`) + ` Chargement des chansons de Freddy... Pourquoi la mélodie fait-elle si peur ?`,
  clc.yellow(`${getCurrentTime()}`) + clc.magenta(` [FUN]`) + ` Bienvenue au Freddy Fazbear's Pizza, où la magie prend vie. Ne reste pas trop tard.`,
];

// Fonction pour afficher un message aléatoire
const displayRandomMessage = () => {
    const randomIndex = Math.floor(Math.random() * messages.length);
    console.log(messages[randomIndex]);
};

// Quand le bot est prêt
client.on('ready', () => {
  const now = new Date();
  const times = `[${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}]`;

  try {
    displayRandomMessage();
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

// Gérer les messages
client.on('messageCreate', (message) => {
  if (message.author.bot) return;

  const commandName = message.content.split(' ')[0].slice(PREFIX.length).toLowerCase(); // Commande de base sans le préfixe

  if (client.commands.has(commandName)) {
    const args = message.content.slice(PREFIX.length + commandName.length).trim().split(/ +/);  // Récupérer les arguments après la commande
    client.commands.get(commandName).execute(message, args);
  }
});

// Quand le bot se déconnecte
client.on('disconnect', () => {
  const now = new Date();
  const times = `[${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}]`;

  console.log(clc.red(`${times} [ERROR] Le bot a été déconnecté ou a rencontré une erreur`));
});

// Lancer le bot
client.login(DISCORD_TOKEN);

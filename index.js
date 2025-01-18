// Charger les bibliothèques nécessaires
require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');
const clc = require('cli-color'); // Importation de `cli-color`
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

// Fonction pour obtenir l'heure actuelle
const getCurrentTime = () => {
  const now = new Date();
  const hour = now.getHours().toString().padStart(2, '0');
  const minute = now.getMinutes().toString().padStart(2, '0');
  const second = now.getSeconds().toString().padStart(2, '0');
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
  if (messages.length === 0) {
    console.log(clc.red('❌ Aucun message à afficher.'));
    return;
  }

  const randomIndex = Math.floor(Math.random() * messages.length);
  console.log(messages[randomIndex]);
};

// Définir les activités à changer
const activities = [
  { name: 'Escanor', type: 2, url: 'https://twitch.tv/erwancbr' }, // Écoute "Escanor"
  { name: 'au soleil ☀️', type: 0 }, // Joue à "au soleil"
  { name: 'les messages', type: 3 }, // Regarde "les messages"
  { name: 'la paix dans le monde 🌍', type: 5 }, // En compétition sur "la paix dans le monde"
];

let currentActivityIndex = 0;

// Fonction pour changer l'activité cycliquement
const rotateActivity = () => {
  const activity = activities[currentActivityIndex];
  client.user.setPresence({
    status: 'online', // Statut du bot
    activities: [activity], // Activité actuelle
  });

  const channel = client.channels.cache.get(CHANNEL_LOG);
  if (channel) {
    channel.send(`\`\`\`fix\n🔄 [INFO] Activité mise à jour : **${activity.name}**\n\`\`\``);
  } else {
    console.log(clc.yellow('❌ Canal de log introuvable pour l\'activité.'));
  }

  currentActivityIndex = (currentActivityIndex + 1) % activities.length;
};

// Quand le bot est prêt
client.on('ready', () => {
  try {
    displayRandomMessage();

    console.log(clc.green(`${getCurrentTime()} [OK] Le bot est prêt et connecté !`));
    console.log(clc.blue(`${getCurrentTime()} [INFO] Initialisation des commandes terminée.`));

    const channel = client.channels.cache.get(CHANNEL_LOG);
    if (channel) {
      channel.send(`\`\`\`css\n${getCurrentTime()} 🚀 Le bot est en ligne et prêt !\n\`\`\``);
    } else {
      console.log(clc.red('❌ Canal de log introuvable lors du démarrage.'));
    }

    // Démarrer la rotation des activités toutes les 20 secondes
    rotateActivity();
    setInterval(rotateActivity, 20000);
  } catch (error) {
    console.error(clc.red(`${getCurrentTime()} [ERROR] Une erreur s'est produite : ${error.message}`));
  }
});

// Gérer les messages
client.on('messageCreate', (message) => {
  if (message.author.bot) return;

  const commandName = message.content.split(' ')[0].toLowerCase();
  if (client.commands.has(commandName)) {
    client.commands.get(commandName)(message);
  }
});

// Quand le bot se déconnecte
client.on('disconnect', () => {
  console.log(clc.red(`${getCurrentTime()} [ERROR] Le bot a été déconnecté.`));
});

// Lancer le bot
client.login(DISCORD_TOKEN);

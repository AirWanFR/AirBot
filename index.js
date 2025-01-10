// Charger les bibliothèques nécessaires
require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');
const express = require('express');

// Charger les variables d'environnement
const DISCORD_TOKEN = process.env.DISCORD_TOKEN;
const PORT = process.env.PORT || 3000;
const CHANNEL_LOG = process.env.CHANNEL_LOG;

// Configurer le bot Discord
const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
});

// Quand le bot est prêt
var now = new Date();
var hour = now.getHours();
var minute = now.getMinutes();
var second = now.getSeconds();
var times = (`[${hour}:${minute}:${second}]/`);

client.on('ready', () => {
  console.log(times+`\x1b[33m%s\x1b[0m`,'[WARN]','\x1b[0m','Connexion en cours...');
  console.log(times+`\x1b[33m%s\x1b[0m`,'[WARN]','\x1b[0m','Connexion à l\'API Discord.js en cours...');
  console.log(times+`\x1b[32m%s\x1b[0m`,'[OK]','\x1b[0m', 'Connexion à l\'API Discord.js effectuée');
  console.log(times+`\x1b[36m%s\x1b[0m`,'[INFO]', '\x1b[0m','Connecté sur ' + client.user.username + '#' + client.user.discriminator);
  console.log(times+`\x1b[32m%s\x1b[0m`,'[OK]','\x1b[0m','Chargement terminé');
  console.log(times+`\x1b[32m%s\x1b[0m`,'[OK]','\x1b[0m','Prêt et connecté');

  // Envoie un message dans le canal de log
  const channel = client.channels.cache.get(CHANNEL_LOG); // Accéder au canal via son ID
  if (channel) {
    channel.send('Le bot est en ligne et prêt !');
  } else {
    console.log('Canal non trouvé !');
  }

  // Définir le statut et l'activité
  client.user.setPresence({
    status: 'online', // Statut du bot : 'online', 'idle', 'dnd', ou 'invisible'
    activities: [
      {
        name: 'Escanor', // Message du statut
        type: 'STREAMING', // Type d'activité : PLAYING, WATCHING, LISTENING, etc.
        url: 'https://twitch.tv/escano' // URL de la plateforme de streaming (si nécessaire)
      },
    ],
  }).catch(err => console.error('Erreur lors de la définition du statut:', err));
});

// Gérer les messages
client.on('messageCreate', (message) => {
  if (message.author.bot) return;

  // Répondre à la commande !status
  if (message.content === '!status') {
    message.reply('✅ Le bot est en ligne !');
  }

  // Arrêter le bot avec la commande !shutdown
  if (message.content === '!shutdown') {
    message.reply('Le bot se déconnecte et arrête le serveur...');
    console.log(times + '[INFO] Déconnexion en cours...');
    
    // Déconnecter le bot et arrêter le processus
    client.destroy().then(() => {
      console.log(times + '[INFO] Bot déconnecté.');
      process.exit(); // Arrêter le processus Node.js
    }).catch((error) => {
      console.log(times + '[ERROR] Une erreur est survenue lors de la déconnexion :', error);
    });
  }
});

// Lancer le bot
client.login(DISCORD_TOKEN);

// Serveur web simple pour vérification
const app = express();
app.get('/', (req, res) => res.send('Le bot est actif !'));
app.listen(PORT, () => console.log(`🌐 Serveur actif sur le port ${PORT}`));

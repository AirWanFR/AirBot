// Charger les bibliothèques nécessaires
require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');
const express = require('express');

// Charger les variables d'environnement
const DISCORD_TOKEN = process.env.DISCORD_TOKEN;
const PORT = process.env.PORT || 3000;

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

  // Définir le statut et l'activité
  client.user.setPresence({
    status: 'dnd', // Statut du bot : 'online', 'idle', 'dnd', ou 'invisible'
    activities: [
      {
        name: 'Escanor', // Message du statut
        type: 'STREAMING', // Type d'activité : PLAYING, WATCHING, LISTENING, etc.
        url: 'https://twitch.tv/escano' // URL de la plateforme de streaming (si nécessaire)
      },
    ],
  });
});

// Gérer les messages
client.on('messageCreate', (message) => {
  if (message.author.bot) return;
  if (message.content === '!status') {
    message.reply('✅ Le bot est en ligne !');
  }
});

// Lancer le bot
client.login(DISCORD_TOKEN);

// Serveur web simple pour vérification
const app = express();
app.get('/', (req, res) => res.send('Le bot est actif !'));
app.listen(PORT, () => console.log(`🌐 Serveur actif sur le port ${PORT}`));

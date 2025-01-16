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

// Variable de statut du bot
let botStatus = "offline"; // Par défaut, le bot est hors ligne

// Quand le bot est prêt
client.on('ready', () => {
  botStatus = "online";
  console.log(`[INFO] Bot prêt et connecté en tant que ${client.user.tag}`);
  
  // Envoie un message dans le canal de log
  const channel = client.channels.cache.get(CHANNEL_LOG); // Accéder au canal via son ID
  if (channel) {
    channel.send('Le bot est en ligne et prêt !');
  } else {
    console.log('Canal non trouvé !');
  }

  // Définir le statut et l'activité
  client.user.setPresence({
    status: 'online', // Statut : 'online', 'idle', 'dnd', 'invisible'
    activities: [
      {
        name: 'Escanor', // Nom de l'activité
        type: 1, // STREAMING
        url: 'https://twitch.tv/escano', // URL du stream
      },
    ],
  });

  console.log('Présence mise à jour avec succès');
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
    console.log('[INFO] Déconnexion en cours...');
    
    // Déconnecter le bot et arrêter le processus
    client.destroy().then(() => {
      botStatus = "offline";
      console.log('[INFO] Bot déconnecté.');
      process.exit(); // Arrêter le processus Node.js
    }).catch((error) => {
      console.log('[ERROR] Une erreur est survenue lors de la déconnexion :', error);
    });
  }
});

// Lancer le bot
client.login(DISCORD_TOKEN);

// Créer une application Express.js
const app = express();

// Routes pour l'interface web
app.get('/', (req, res) => {
  res.send(`
    <h1>Interface de gestion du bot</h1>
    <p>Status du bot : <strong>${botStatus}</strong></p>
    <form method="POST" action="/start">
      <button type="submit">Démarrer le bot</button>
    </form>
    <form method="POST" action="/stop">
      <button type="submit">Arrêter le bot</button>
    </form>
  `);
});

// Route pour démarrer le bot
app.post('/start', (req, res) => {
  if (botStatus === "online") {
    return res.send(`<p>Le bot est déjà en ligne !</p><a href="/">Retour</a>`);
  }

  client.login(DISCORD_TOKEN).then(() => {
    botStatus = "online";
    res.send(`<p>Le bot a été démarré avec succès !</p><a href="/">Retour</a>`);
  }).catch((err) => {
    console.error(err);
    res.send(`<p>Erreur lors du démarrage : ${err.message}</p><a href="/">Retour</a>`);
  });
});

// Route pour arrêter le bot
app.post('/stop', (req, res) => {
  if (botStatus === "offline") {
    return res.send(`<p>Le bot est déjà hors ligne !</p><a href="/">Retour</a>`);
  }

  client.destroy().then(() => {
    botStatus = "offline";
    res.send(`<p>Le bot a été arrêté avec succès !</p><a href="/">Retour</a>`);
  }).catch((err) => {
    console.error(err);
    res.send(`<p>Erreur lors de l'arrêt : ${err.message}</p><a href="/">Retour</a>`);
  });
});

// Lancer le serveur web
app.listen(PORT, () => {
  console.log(`🌐 Serveur web actif sur http://localhost:${PORT}`);
});

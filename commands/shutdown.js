module.exports = {
  name: '!shutdown',
  execute(message) {
    message.reply('⭕ Le bot se déconnecte et arrête le serveur...');
    console.log('[INFO] Déconnexion en cours...');
    
    // Déconnecter le bot et arrêter le processus
    message.client.destroy().then(() => {
      console.log('[INFO] Bot déconnecté.');
      process.exit(); // Arrêter le processus Node.js
    }).catch((error) => {
      console.log('[ERROR] Une erreur est survenue lors de la déconnexion :', error);
    });
  },
};

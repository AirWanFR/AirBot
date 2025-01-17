const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: '!shutdown',
  execute(message) {
    // Créer l'embed avec la couleur et le texte
    const embed = new EmbedBuilder()
      .setColor(0xFF5733) // Couleur orange (exemple, vous pouvez changer la couleur)
      .setTitle('⭕ Déconnexion du bot')
      .setDescription('Le bot se déconnecte et arrête le serveur...')
      .setTimestamp();

    // Envoyer le message coloré via un embed
    message.reply({ embeds: [embed] });

    console.log('\x1b[33m[INFO] Déconnexion en cours...\x1b[39m'); // Jaune pour l'info de déconnexion
    
    // Déconnecter le bot et arrêter le processus
    message.client.destroy().then(() => {
      console.log('\x1b[32m[INFO] Bot déconnecté.\x1b[39m'); // Vert pour indiquer la déconnexion réussie
      process.exit(); // Arrêter le processus Node.js
    }).catch((error) => {
      console.log('\x1b[31m[ERROR] Une erreur est survenue lors de la déconnexion :\x1b[39m', error); // Rouge pour une erreur
    });
  },
};

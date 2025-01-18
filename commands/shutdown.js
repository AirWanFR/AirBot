const { EmbedBuilder } = require('discord.js');
const clc = require('cli-color'); // Importation de `cli-color`


module.exports = {
  name: 'shutdown',
  execute(message) {
    // Créer l'embed avec la couleur et le texte
    const embed = new EmbedBuilder()
      .setColor(0xFF5733) // Couleur orange (exemple, vous pouvez changer la couleur)
      .setTitle('⭕ Déconnexion du bot')
      .setDescription('Le bot se déconnecte et arrête le serveur...')
      .setTimestamp();

    // Envoyer le message coloré via un embed
    message.reply({ embeds: [embed] });

    console.log(clc.yellow('[INFO]') + 'Déconnexion en cours...'); // Jaune pour l'info de déconnexion
    
    // Déconnecter le bot et arrêter le processus
    message.client.destroy().then(() => {
      console.log(clc.red('[INFO] Bot déconnecté')); // Vert pour indiquer la déconnexion réussie
      process.exit(); // Arrêter le processus Node.js
    }).catch((error) => {
      console.log(clc.red('[ERROR] Une erreur est survenue lors de la déconnexion :', error));// Rouge pour une erreur
    });
  },
};

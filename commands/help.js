const { EmbedBuilder } = require('discord.js'); // Assurez-vous d'importer EmbedBuilder

module.exports = {
  name: 'help',
  description: 'Affiche la liste des commandes disponibles.',
  execute(message) {
    const PREFIX = '!'; // Définir ou récupérer ton préfixe ici

    // Créer un embed pour la commande help
    const helpEmbed = new EmbedBuilder()
      .setColor(0x0099FF) // Couleur de l'embed
      .setTitle('Liste des commandes disponibles')
      .setDescription('Voici la liste des commandes que vous pouvez utiliser avec ce bot :')
      .addFields(
        { name: `${PREFIX}airwan`, value: 'Affiche des informations sur Airwan.', inline: false },
        { name: `${PREFIX}infouser`, value: 'Affiche des informations sur l\'utilisateur.', inline: false },
        { name: `${PREFIX}presence`, value: 'Affiche la présence actuelle du bot.', inline: false },
        { name: `${PREFIX}setactivity`, value: 'Change l\'activité du bot.', inline: false },
        { name: `${PREFIX}setprefix`, value: 'Modifie le préfixe du bot.', inline: false },
        { name: `${PREFIX}setstatus`, value: 'Change le statut du bot.', inline: false },
        { name: `${PREFIX}shutdown`, value: 'Arrête le bot.', inline: false },
        { name: `${PREFIX}status`, value: 'Affiche le statut actuel du bot.', inline: false },
        { name: `${PREFIX}ping`, value: 'Affiche le ping actuel du bot.', inline: false }
      )
      .setTimestamp() // Ajouter un timestamp de l'exécution
      .setFooter({ text: `Commande exécutée par ${message.author.username}`, iconURL: message.author.displayAvatarURL() }); // Ajouter un footer avec l'avatar de l'utilisateur

    // Envoyer l'embed dans le canal d'où provient la commande
    message.channel.send({ embeds: [helpEmbed] });
  },
};

const { EmbedBuilder } = require('discord.js');
const dotenv = require('dotenv');
dotenv.config();

// Récupérer le préfixe depuis le fichier .env
const PREFIX = process.env.PREFIX || "!";

module.exports = {
  name: 'help',
  description: 'Affiche la liste des commandes disponibles',
  execute(message) {
    // Créer un embed pour la commande help
    const helpEmbed = new EmbedBuilder()
      .setColor(0x0099FF)
      .setTitle('Liste des commandes disponibles')
      .setDescription('Voici la liste des commandes que vous pouvez utiliser avec le bot :')
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
      .setTimestamp()
      .setFooter({ text: `Commande exécutée par ${message.author.username}`, iconURL: message.author.displayAvatarURL() });

    // Envoyer l'embed dans le canal d'où provient la commande
    message.channel.send({ embeds: [helpEmbed] });
  },
};

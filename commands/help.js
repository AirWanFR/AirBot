const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: '!help',
  execute(message) {
    // Créer l'embed
    const helpEmbed = new EmbedBuilder()
      .setColor(0x0099FF)
      .setTitle('Liste des commandes disponibles')
      .setDescription('Voici les commandes que vous pouvez utiliser avec le bot.')
      .addFields(
        { name: `${PREFIX}airwan`, value: 'Affiche des informations sur le bot.', inline: false },
        { name: `${PREFIX}infouser`, value: 'Affiche les informations d\'un utilisateur.', inline: false },
        { name: `${PREFIX}presence`, value: 'Change la présence du bot.', inline: false },
        { name: `${PREFIX}setactivity`, value: 'Change l\'activité du bot.', inline: false },
        { name: `${PREFIX}setstatus`, value: 'Change le statut du bot (online, idle, dnd).', inline: false },
        { name: `${PREFIX}shutdown`, value: 'Arrête le bot.', inline: false },
        { name: `${PREFIX}status`, value: 'Affiche l\'état actuel du bot.', inline: false },
        { name: `${PREFIX}help`, value: 'Affiche cette aide.', inline: false },
        { name: `${PREFIX}setprefix`, value: 'Modifie le préfixe du bot.', inline: false },
      )
      .setFooter({ text: `Commande exécutée par ${message.author.username}`, iconURL: message.author.displayAvatarURL() })
      .setTimestamp();

    // Envoyer l'embed dans le canal
    message.channel.send({ embeds: [helpEmbed] });
  },
};

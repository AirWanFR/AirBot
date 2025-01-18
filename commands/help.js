const { EmbedBuilder } = require('discord.js');

// Récupérer le préfixe depuis .env
const PREFIX = process.env.PREFIX || 'aw!';

module.exports = {
  name: 'help',
  execute(message, args) {
    // Création de l'embed pour la commande help
    const exampleEmbed = new EmbedBuilder()
      .setColor(0x0099FF)
      .setTitle('Liste des commandes disponibles')
      .setDescription(`Voici les commandes disponibles pour le bot avec le préfixe \`${PREFIX}\`:`)
      .addFields(
        { name: `${PREFIX}help`, value: 'Affiche la liste des commandes.' },
        { name: `${PREFIX}setactivity`, value: 'Change l\'activité du bot.' },
        { name: `${PREFIX}setstatus`, value: 'Change le statut du bot.' },
        { name: `${PREFIX}shutdown`, value: 'Éteint le bot.' },
        // Ajoutez d'autres commandes ici
      )
      .setFooter({ text: 'Utilisez le préfixe suivi de la commande' });

    // Envoi de l'embed dans le même canal
    message.channel.send({ embeds: [exampleEmbed] });
  },
};

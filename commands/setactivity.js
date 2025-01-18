const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'setactivity',
  aliases: ['sa'],
  description: 'Change l\'activité du bot.',
  async execute(message, args) {
    // Vérifier si l'utilisateur a les autorisations nécessaires (administrateur)
    if (!message.member.permissions.has('ADMINISTRATOR')) {
      return message.reply('Vous devez être administrateur pour utiliser cette commande.');
    }

    // Vérifier si un argument a été fourni
    if (!args[0]) {
      return message.reply('Veuillez spécifier l\'activité que vous souhaitez définir.');
    }

    // Extraire le type d'activité et l'activité elle-même
    const activityType = args[0].toLowerCase();
    const activity = args.slice(1).join(' ');  // L'activité réelle

    // Types d'activité valides
    const validTypes = {
      play: 0,   // "Joue à"
      listen: 2, // "Écoute"
      watch: 3,  // "Regarde"
      compete: 5 // "En compétition"
    };

    const activityTypeId = validTypes[activityType];
    if (!activityTypeId) {
      return message.reply('Type d\'activité invalide. Veuillez utiliser `play`, `listen`, `watch` ou `compete`.');
    }

    // Mettre à jour l'activité du bot
    try {
      await message.client.user.setPresence({
        status: 'online', // Le bot est en ligne
        activities: [{
          name: activity,    // L'activité à afficher
          type: activityTypeId,  // Le type d'activité
        }],
      });

      // Créer un embed de confirmation
      const embed = new EmbedBuilder()
        .setColor(0x00FF00) // Couleur verte pour succès
        .setTitle('Activité modifiée avec succès')
        .setDescription(`L'activité du bot a été modifiée en **${activityType} ${activity}**.`)
        .setTimestamp()
        .setFooter({ text: `Commande exécutée par ${message.author.username}`, iconURL: message.author.displayAvatarURL() });

      // Envoyer l'embed en réponse
      message.channel.send({ embeds: [embed] });
    } catch (error) {
      console.error('Erreur lors de la mise à jour de l\'activité :', error);
      message.reply('Une erreur est survenue lors de la mise à jour de l\'activité du bot.');
    }
  }
};

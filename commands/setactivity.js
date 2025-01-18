const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'setactivity',
  aliases: ['sa', 'userinfo'],
  description: 'Change l\'activité du bot.',
  async execute(message, args) {
    // Vérifier si l'utilisateur a les autorisations nécessaires (ici, on suppose qu'il s'agit d'un administrateur)
    if (!message.member.permissions.has('ADMINISTRATOR')) {
      return message.reply('Vous devez être administrateur pour utiliser cette commande.');
    }

    // Si aucune activité n'est fournie
    if (!args[0]) {
      return message.reply('Veuillez spécifier l\'activité que vous souhaitez définir.');
    }

    // Extraire l'activité et le type d'activité
    const activity = args.join(' ');
    const activityType = args[0].toLowerCase();

    const validTypes = {
      play: 0,  // "Joue à"
      listen: 2, // "Écoute"
      watch: 3,  // "Regarde"
      compete: 5 // "En compétition"
    };

    const activityTypeId = validTypes[activityType];
    if (!activityTypeId) {
      return message.reply('Type d\'activité invalide. Veuillez utiliser `play`, `listen`, `watch` ou `compete`.');
    }

    // Mettre à jour l'activité du bot
    await message.client.user.setPresence({
      status: 'online',
      activities: [{
        name: activity,
        type: activityTypeId,
      }]
    });

    // Créer un embed pour la réponse
    const embed = new EmbedBuilder()
      .setColor(0x00FF00)
      .setTitle('Activité modifiée avec succès')
      .setDescription(`L'activité du bot a été modifiée en **${activityType} ${activity}**.`)
      .setTimestamp()
      .setFooter({ text: `Commande exécutée par ${message.author.username}`, iconURL: message.author.displayAvatarURL() });

    // Envoyer la réponse
    message.channel.send({ embeds: [embed] });
  }
};

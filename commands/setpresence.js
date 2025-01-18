module.exports = {
  name: 'setpresence',
  description: 'Change la présence du bot avec le type d\'activité et le message donné.',
  async execute(message, args) {
    // Vérifier si l'utilisateur a les autorisations nécessaires (facultatif, par exemple : administrateur)
    if (!message.member.permissions.has('ADMINISTRATOR')) {
      return message.reply('Vous devez être administrateur pour utiliser cette commande.');
    }

    // Vérifier si les arguments sont suffisants
    if (args.length < 2) {
      return message.reply('Veuillez spécifier un type d\'activité et un message. Exemple: `aw!setpresence play "Regarde un film"`.');
    }

    // Extraire le type d'activité et le message d'activité
    const activityType = args[0].toLowerCase(); // Premier argument : type d'activité
    const activityMessage = args.slice(1).join(' '); // Rejoindre le reste des arguments en une seule chaîne

    // Définir les types d'activités valides
    const validTypes = {
      play: 0,  // "Joue à"
      listen: 2, // "Écoute"
      watch: 3,  // "Regarde"
      compete: 5 // "En compétition"
    };

    // Vérifier si le type d'activité est valide
    if (!validTypes[activityType]) {
      return message.reply('Type d\'activité invalide. Veuillez utiliser `play`, `listen`, `watch` ou `compete`.');
    }

    // Mettre à jour l'activité du bot
    try {
      await message.client.user.setPresence({
        status: 'online',  // Statut du bot
        activities: [{
          name: activityMessage,  // Message de l'activité fourni par l'utilisateur
          type: validTypes[activityType],   // Type d'activité
        }]
      });

      message.reply(`La présence du bot a été mise à jour : **${activityType} ${activityMessage}**.`);
    } catch (error) {
      console.error(error);
      message.reply('Une erreur est survenue lors de la mise à jour de la présence.');
    }
  },
};

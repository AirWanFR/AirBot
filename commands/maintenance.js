module.exports = {
  name: 'maintenance',  // Nom de la commande
  execute(message) {
    // Mise à jour de la présence du bot en statut "en maintenance"
    message.client.user.setPresence({
      status: 'dnd', // "dnd" (Do Not Disturb) signifie "ne pas déranger", mais vous pouvez mettre "idle" ou "invisible" selon vos préférences.
      activities: [{ name: 'En maintenance... 🚧', type: 0 }], // Activité "En maintenance"
    });

    // Réponse au message utilisateur
    message.reply('Bot en maintenance. 🚧');
  },
};

module.exports = {
  name: '!presence',
  execute(message) {
    message.client.user.setPresence({
      status: 'online',
      activities: [{ name: 'Escanor', type: 1, url: 'https://twitch.tv/escano' }],
    });
    message.reply('Présence mise à jour avec succès !');
  },
};

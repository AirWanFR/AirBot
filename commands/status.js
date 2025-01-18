module.exports = {
  name: 'status',
  execute(message) {
    const ping = Date.now() - message.createdTimestamp;
    message.reply('✅ Le bot est en ligne ! Le ping du bot est de ${ping}ms.');
  },
};

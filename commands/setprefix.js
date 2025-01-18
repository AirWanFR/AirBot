module.exports = {
  name: '!setprefix',
  execute(message, args) {
    // Vérifier que l'utilisateur a les permissions nécessaires (par exemple, être administrateur)
    if (!message.member.permissions.has('ADMINISTRATOR')) {
      return message.reply('Vous n\'avez pas la permission de changer le préfixe.');
    }

    // Vérifier que le nouveau préfixe a bien été fourni
    if (!args.length) {
      return message.reply('Veuillez spécifier un nouveau préfixe.');
    }

    // Modifier le préfixe
    const newPrefix = args[0];

    // Mettre à jour le préfixe
    PREFIX = newPrefix;
    message.reply(`Le préfixe a été changé en \`${newPrefix}\``);
  },
};

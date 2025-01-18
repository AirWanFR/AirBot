const fs = require('fs');
const path = require('path');
const { PREFIX } = process.env;

module.exports = {
  name: 'setprefix',
  description: 'Change le préfixe du bot',
  execute(message, args) {
    // Vérification des autorisations (par exemple, administrateur)
    if (!message.member.permissions.has('ADMINISTRATOR')) {
      return message.reply("Tu n'as pas les permissions nécessaires pour utiliser cette commande.");
    }

    if (!args[0]) {
      return message.reply('Veuillez spécifier un préfixe.');
    }

    const newPrefix = args[0];

    if (newPrefix.length > 3) {
      return message.reply('Le préfixe ne peut pas être plus long que 3 caractères.');
    }

    // Modifier le fichier .env avec le nouveau préfixe
    const envPath = path.join(__dirname, '../.env');
    let envContent = fs.readFileSync(envPath, 'utf-8');

    // Remplacer l'ancien préfixe par le nouveau dans le fichier .env
    envContent = envContent.replace(/PREFIX=[^ ]*/g, `PREFIX=${newPrefix}`);

    // Sauvegarder les modifications dans le fichier .env
    fs.writeFileSync(envPath, envContent);

    // Réinitialiser le préfixe dans le code pour refléter le changement
    process.env.PREFIX = newPrefix;

    message.reply(`Le préfixe a été changé en \`${newPrefix}\` !`);
  },
};

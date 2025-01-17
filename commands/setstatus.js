module.exports = {
  name: '!setstatus',
  execute(message) {
    // Extraire le statut fourni par l'utilisateur
    const args = message.content.split(' ');
    if (args.length < 2) {
      message.reply('❌ Vous devez fournir un statut valide : `online`, `idle`, `dnd` ou `invisible`.');
      return;
    }

    const status = args[1].toLowerCase();

    // Valider le statut fourni
    const validStatuses = ['online', 'idle', 'dnd', 'invisible'];
    if (!validStatuses.includes(status)) {
      message.reply('❌ Statut invalide. Les statuts valides sont : `online`, `idle`, `dnd`, `invisible`.');
      return;
    }

    // Modifier le statut du bot
    message.client.user.setPresence({
      status: status,
    })
      .then(() => {
        message.reply(`✅ Statut du bot mis à jour avec succès : \`${status}\`.`);
        console.log('\x1b[32m' + `[INFO] Statut du bot changé à "${status}".` + '\x1b[0m'); // Vert
      })
      .catch((error) => {
        message.reply('❌ Une erreur est survenue lors de la mise à jour du statut.');
        console.log('\x1b[31m' + `[ERROR] Impossible de changer le statut : ${error}` + '\x1b[0m'); // Rouge
      });
  },
};

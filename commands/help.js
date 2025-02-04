const { EmbedBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
  name: 'help',
  description: 'Affiche la liste des commandes disponibles avec pagination.',
  async execute(message) {
    const PREFIX = process.env.PREFIX || 'aw!';

    // Vérifier si le bot a les permissions nécessaires
    if (!message.guild) return;

    const botPermissions = message.guild.members.me.permissions;
    if (!botPermissions.has(PermissionsBitField.Flags.AddReactions) ||
        !botPermissions.has(PermissionsBitField.Flags.ReadMessageHistory)) {
      return message.channel.send('❌ Je n\'ai pas les permissions nécessaires pour gérer les réactions.');
    }

    // Liste des commandes
    const commands = [
      { name: `${PREFIX}airwan`, value: 'Affiche des informations sur Airwan.' },
      { name: `${PREFIX}infouser`, value: 'Affiche des informations sur l\'utilisateur.' },
      { name: `${PREFIX}presence`, value: 'Affiche la présence actuelle du bot.' },
      { name: `${PREFIX}setactivity`, value: 'Change l\'activité du bot.' },
      { name: `${PREFIX}setprefix`, value: 'Modifie le préfixe du bot.' },
      { name: `${PREFIX}setstatus`, value: 'Change le statut du bot.' },
      { name: `${PREFIX}shutdown`, value: 'Arrête le bot.' },
      { name: `${PREFIX}status`, value: 'Affiche le statut actuel du bot.' },
      { name: `${PREFIX}ping`, value: 'Affiche le ping actuel du bot.' },
    ];

    const commandsPerPage = 5;
    let currentPage = 0;

    // Fonction pour générer un embed
    function generateEmbed(page) {
      const start = page * commandsPerPage;
      const end = start + commandsPerPage;
      const currentCommands = commands.slice(start, end);

      return new EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle('📜 Liste des commandes')
        .setDescription('Utilisez les réactions pour naviguer entre les pages.')
        .addFields(currentCommands.map(cmd => ({ name: cmd.name, value: cmd.value, inline: false })))
        .setFooter({ text: `Page ${page + 1} / ${Math.ceil(commands.length / commandsPerPage)}` });
    }

    // Envoyer l'embed initial
    const embed = generateEmbed(currentPage);
    const msg = await message.channel.send({ embeds: [embed] });

    try {
      await msg.react('◀️');
      await msg.react('▶️');
    } catch (error) {
      console.error('Erreur lors de l\'ajout des réactions:', error);
      return message.channel.send('❌ Impossible d\'ajouter les réactions. Vérifiez mes permissions.');
    }

    // Filtre pour capturer uniquement les réactions valides des utilisateurs (pas de bots)
    const filter = (reaction, user) => ['◀️', '▶️'].includes(reaction.emoji.name) && !user.bot;
    const collector = msg.createReactionCollector({ filter, time: 60000 });

    collector.on('collect', async (reaction, user) => {
      console.log(`Réaction reçue: ${reaction.emoji.name} de ${user.tag}`);

      // Retirer la réaction de l'utilisateur
      await reaction.users.remove(user).catch(console.error);

      if (reaction.emoji.name === '▶️' && currentPage < Math.ceil(commands.length / commandsPerPage) - 1) {
        currentPage++;
      } else if (reaction.emoji.name === '◀️' && currentPage > 0) {
        currentPage--;
      } else {
        return;
      }

      const newEmbed = generateEmbed(currentPage);
      await msg.edit({ embeds: [newEmbed] }).catch(console.error);
    });

    collector.on('end', async () => {
      console.log('Fin du collector de réactions.');
      if (botPermissions.has(PermissionsBitField.Flags.ManageMessages)) {
        await msg.reactions.removeAll().catch(console.error);
      }
    });
  },
};

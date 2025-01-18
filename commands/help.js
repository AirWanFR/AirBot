const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'help',
  description: 'Affiche la liste des commandes disponibles avec pagination.',
  async execute(message) {
    const PREFIX = process.env.PREFIX || 'aw!';

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

    // Nombre de commandes par page
    const commandsPerPage = 5;

    // Fonction pour générer un embed avec une liste de commandes
    function generateEmbed(page) {
      const start = page * commandsPerPage;
      const end = start + commandsPerPage;
      const currentCommands = commands.slice(start, end);

      const embed = new EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle('Liste des commandes disponibles')
        .setDescription('Voici la liste des commandes que vous pouvez utiliser avec ce bot :')
        .addFields(currentCommands.map(cmd => ({ name: cmd.name, value: cmd.value, inline: false })))
        .setTimestamp()
        .setFooter({ text: `Page ${page + 1} / ${Math.ceil(commands.length / commandsPerPage)}`, iconURL: message.author.displayAvatarURL() });

      return embed;
    }

    // Envoyer l'embed pour la première page
    const embed = generateEmbed(0);
    const msg = await message.channel.send({ embeds: [embed] });

    // Ajouter des réactions pour la pagination
    await msg.react('◀️'); // Réaction pour la page précédente
    await msg.react('▶️'); // Réaction pour la page suivante

    // Créer un filtre pour les réactions
    const filter = (reaction, user) => {
      return ['◀️', '▶️'].includes(reaction.emoji.name) && !user.bot;
    };

    // Collecte des réactions
    const collector = msg.createReactionCollector({ filter, time: 60000 });

    let currentPage = 0;
    collector.on('collect', async (reaction, user) => {
      // Enlever la réaction après qu'elle ait été collectée
      await reaction.users.remove(user);

      if (reaction.emoji.name === '▶️') {
        // Aller à la page suivante si possible
        if (currentPage < Math.ceil(commands.length / commandsPerPage) - 1) {
          currentPage++;
          const newEmbed = generateEmbed(currentPage);
          await msg.edit({ embeds: [newEmbed] });
        }
      } else if (reaction.emoji.name === '◀️') {
        // Aller à la page précédente si possible
        if (currentPage > 0) {
          currentPage--;
          const newEmbed = generateEmbed(currentPage);
          await msg.edit({ embeds: [newEmbed] });
        }
      }
    });

    // Lorsque le temps est écoulé, arrêter la collecte
    collector.on('end', async () => {
      await msg.reactions.removeAll(); // Supprimer toutes les réactions après la fin de la collecte
    });
  },
};

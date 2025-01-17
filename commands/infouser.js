const { EmbedBuilder } = require('discord.js');

module.exports = {
  // Ajouter plusieurs noms pour cette commande (alias)
  name: 'infouser',
  aliases: ['ui', 'userinfo'],
  execute(message) {
    // Extraire l'utilisateur qui a envoyé la commande
    const user = message.author;
    
    // Créer l'embed
    const exampleEmbed = new EmbedBuilder()
      .setColor(0x0099FF)  // Couleur bleue
      .setTitle('Informations sur l\'utilisateur')
      .setURL('https://discord.gg/vbGvefyQx9')  // Lien de la communauté (optionnel)
      .setAuthor({
        name: user.username, 
        iconURL: user.displayAvatarURL(), // Avatar de l'utilisateur
        url: 'https://discord.gg/vbGvefyQx9'  // Lien vers le serveur ou un autre lien
      })
      .setDescription(`Voici les informations sur **${user.username}**.`)  // Description
      .setThumbnail(user.displayAvatarURL())  // Utilisation de l'avatar de l'utilisateur
      .addFields(
        { name: 'ID de l\'utilisateur', value: user.id, inline: true },
        { name: 'Tag', value: user.tag, inline: true },
        { name: 'Date d\'inscription', value: user.createdAt.toLocaleDateString(), inline: true },
        { name: 'Date de connexion', value: new Date().toLocaleDateString(), inline: true },
        { name: 'Heure actuelle', value: new Date().toLocaleTimeString(), inline: true },
      )
      .setImage('https://i.imgur.com/AfFp7pu.png')  // Image exemple (vous pouvez la personnaliser)
      .setTimestamp()  // Ajouter la date et l'heure de l'envoi
      .setFooter({ text: `Commande exécutée par ${user.username}`, iconURL: user.displayAvatarURL() });

    // Envoyer l'embed dans le canal d'où provient la commande
    message.channel.send({ embeds: [exampleEmbed] });
  },
};

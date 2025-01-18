const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'airwan',
  execute(message) {
    // Extraire l'utilisateur qui a envoyé la commande
    const user = message.author;
    
    // Créer l'embed
    const exampleEmbed = new EmbedBuilder()
      .setColor(0x0099FF)
      .setTitle('Bienvenue dans le monde d\'Airwan!')
      .setURL('https://discord.gg/vbGvefyQx9')
      .setAuthor({
        name: user.username, 
        iconURL: user.displayAvatarURL(), // Avatar de l'utilisateur
        url: 'https://discord.gg/vbGvefyQx9'
      })
      .setDescription(`Hello ${user.username}, voici un exemple d'embed personnalisé.`)
      .setThumbnail(user.displayAvatarURL())  // Utilisation de l'avatar de l'utilisateur
      .addFields(
        { name: 'Information', value: 'Voici une information dynamique !', inline: false },
        { name: 'Date', value: new Date().toLocaleDateString(), inline: true },
        { name: 'Heure', value: new Date().toLocaleTimeString(), inline: true },
      )
      .setImage('https://i.imgur.com/AfFp7pu.png')
      .setTimestamp()  // Ajouter la date et l'heure de l'envoi
      .setFooter({ text: `Commande exécutée par ${user.username}`, iconURL: user.displayAvatarURL() });

    // Envoyer l'embed dans le canal d'où provient la commande
    message.channel.send({ embeds: [exampleEmbed] });
  },
};

const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('warn')
    .setDescription('Issue a warning to a user')
    .addUserOption(option =>
      option.setName('user')
        .setDescription('The user to warn')
        .setRequired(true)
    )
    .addStringOption(option =>
      option.setName('reason')
        .setDescription('The reason for warning')
        .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),

  async execute(interaction) {
    const user = interaction.options.getUser('user');
    const reason = interaction.options.getString('reason');

    const warnEmbed = new EmbedBuilder()
      .setColor('#FFFF00')
      .setTitle('⚠️ User Warned')
      .addFields(
        { name: 'User', value: `${user.tag}`, inline: true },
        { name: 'ID', value: `${user.id}`, inline: true },
        { name: 'Reason', value: reason, inline: false },
        { name: 'Moderator', value: interaction.user.tag, inline: true }
      )
      .setThumbnail(user.displayAvatarURL())
      .setTimestamp();

    await interaction.reply({ embeds: [warnEmbed] });
  },
};

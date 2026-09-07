const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('kick')
    .setDescription('Kick a user from the server')
    .addUserOption(option =>
      option.setName('user')
        .setDescription('The user to kick')
        .setRequired(true)
    )
    .addStringOption(option =>
      option.setName('reason')
        .setDescription('The reason for kicking')
        .setRequired(false)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),

  async execute(interaction) {
    const user = interaction.options.getUser('user');
    const reason = interaction.options.getString('reason') || 'No reason provided';
    const member = await interaction.guild.members.fetch(user.id).catch(() => null);

    if (!member) {
      return interaction.reply({ content: 'User not found', ephemeral: true });
    }

    try {
      await member.kick(reason);
      
      const kickEmbed = new EmbedBuilder()
        .setColor('#FFA500')
        .setTitle('👢 User Kicked')
        .addFields(
          { name: 'User', value: `${user.tag}`, inline: true },
          { name: 'ID', value: `${user.id}`, inline: true },
          { name: 'Reason', value: reason, inline: false },
          { name: 'Moderator', value: interaction.user.tag, inline: true }
        )
        .setThumbnail(user.displayAvatarURL())
        .setTimestamp();

      await interaction.reply({ embeds: [kickEmbed] });
    } catch (error) {
      await interaction.reply({ content: 'Failed to kick user', ephemeral: true });
    }
  },
};

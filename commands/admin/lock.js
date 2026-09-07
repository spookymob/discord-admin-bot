const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('lock')
    .setDescription('Lock the current channel')
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels),

  async execute(interaction) {
    const channel = interaction.channel;

    try {
      await channel.permissionOverwrites.edit(interaction.guild.id, {
        SendMessages: false,
      });

      const lockEmbed = new EmbedBuilder()
        .setColor('#FF0000')
        .setTitle('🔒 Channel Locked')
        .setDescription(`${channel} has been locked.`)
        .addFields(
          { name: 'Locked by', value: interaction.user.tag, inline: true }
        )
        .setTimestamp();

      await interaction.reply({ embeds: [lockEmbed] });
    } catch (error) {
      await interaction.reply({ content: 'Failed to lock channel', ephemeral: true });
    }
  },
};

const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('unlock')
    .setDescription('Unlock the current channel')
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels),

  async execute(interaction) {
    const channel = interaction.channel;

    try {
      await channel.permissionOverwrites.edit(interaction.guild.id, {
        SendMessages: null,
      });

      const unlockEmbed = new EmbedBuilder()
        .setColor('#00FF00')
        .setTitle('🔓 Channel Unlocked')
        .setDescription(`${channel} has been unlocked.`)
        .addFields(
          { name: 'Unlocked by', value: interaction.user.tag, inline: true }
        )
        .setTimestamp();

      await interaction.reply({ embeds: [unlockEmbed] });
    } catch (error) {
      await interaction.reply({ content: 'Failed to unlock channel', ephemeral: true });
    }
  },
};

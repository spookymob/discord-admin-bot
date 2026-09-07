const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('purge')
    .setDescription('Bulk delete messages from a channel')
    .addIntegerOption(option =>
      option.setName('amount')
        .setDescription('Number of messages to delete (1-100)')
        .setRequired(true)
        .setMinValue(1)
        .setMaxValue(100)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),

  async execute(interaction) {
    const amount = interaction.options.getInteger('amount');
    const channel = interaction.channel;

    try {
      const deleted = await channel.bulkDelete(amount, true);

      const purgeEmbed = new EmbedBuilder()
        .setColor('#9B59B6')
        .setTitle('🗑️ Messages Purged')
        .addFields(
          { name: 'Amount', value: `${deleted.size} messages`, inline: true },
          { name: 'Channel', value: channel.toString(), inline: true },
          { name: 'Moderator', value: interaction.user.tag, inline: true }
        )
        .setTimestamp();

      await interaction.reply({ embeds: [purgeEmbed], ephemeral: true });
    } catch (error) {
      await interaction.reply({ content: 'Failed to purge messages', ephemeral: true });
    }
  },
};

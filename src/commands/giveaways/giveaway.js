const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('giveaway')
    .setDescription('Create a giveaway')
    .addStringOption(option =>
      option.setName('prize')
        .setDescription('The prize for the giveaway')
        .setRequired(true)
    )
    .addIntegerOption(option =>
      option.setName('duration')
        .setDescription('Duration in seconds')
        .setRequired(true)
    )
    .addIntegerOption(option =>
      option.setName('winners')
        .setDescription('Number of winners')
        .setRequired(true)
        .setMinValue(1)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  async execute(interaction) {
    const prize = interaction.options.getString('prize');
    const duration = interaction.options.getInteger('duration');
    const winners = interaction.options.getInteger('winners');

    const giveawayEmbed = new EmbedBuilder()
      .setColor('#FFD700')
      .setTitle('🎉 GIVEAWAY')
      .addFields(
        { name: 'Prize', value: prize, inline: true },
        { name: 'Duration', value: `${duration} seconds`, inline: true },
        { name: 'Winners', value: `${winners}`, inline: true },
        { name: 'Host', value: interaction.user.tag, inline: false }
      )
      .setDescription('React with 🎉 to enter!')
      .setTimestamp(Date.now() + duration * 1000)
      .setFooter({ text: 'Giveaway ends at' });

    const message = await interaction.channel.send({ embeds: [giveawayEmbed] });
    await message.react('🎉');

    const confirmEmbed = new EmbedBuilder()
      .setColor('#00FF00')
      .setDescription(`✅ Giveaway started! Prize: **${prize}**`)
      .setTimestamp();

    await interaction.reply({ embeds: [confirmEmbed], ephemeral: true });

    // End giveaway after duration
    setTimeout(async () => {
      const reactions = await message.reactions.cache.get('🎉');
      if (!reactions) return;

      const users = await reactions.users.fetch();
      const participants = users.filter(u => !u.bot).map(u => u.id);

      if (participants.length === 0) {
        const noWinnersEmbed = new EmbedBuilder()
          .setColor('#FF0000')
          .setTitle('🎉 Giveaway Ended')
          .setDescription('No one participated in the giveaway.')
          .setTimestamp();
        return await message.reply({ embeds: [noWinnersEmbed] });
      }

      const selectedWinners = [];
      for (let i = 0; i < Math.min(winners, participants.length); i++) {
        const randomIndex = Math.floor(Math.random() * participants.length);
        selectedWinners.push(`<@${participants[randomIndex]}>`);
        participants.splice(randomIndex, 1);
      }

      const endEmbed = new EmbedBuilder()
        .setColor('#00FF00')
        .setTitle('🎉 Giveaway Ended')
        .setDescription(`**Winners:** ${selectedWinners.join(', ')}`)
        .addFields(
          { name: 'Prize', value: prize, inline: true },
          { name: 'Total Participants', value: `${users.size}`, inline: true }
        )
        .setTimestamp();

      await message.reply({ embeds: [endEmbed] });
    }, duration * 1000);
  },
};

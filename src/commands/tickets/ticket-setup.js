const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ticket-setup')
    .setDescription('Setup the ticket system')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  async execute(interaction) {
    const ticketEmbed = new EmbedBuilder()
      .setColor('#5865F2')
      .setTitle('🎫 Support Tickets')
      .setDescription('Click the button below to create a support ticket. Our team will assist you shortly!')
      .setTimestamp();

    const row = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setCustomId('create_ticket')
          .setLabel('Create Ticket')
          .setStyle(ButtonStyle.Primary)
          .setEmoji('🎫')
      );

    await interaction.channel.send({ embeds: [ticketEmbed], components: [row] });
    
    const confirmEmbed = new EmbedBuilder()
      .setColor('#00FF00')
      .setDescription('✅ Ticket system has been setup!')
      .setTimestamp();

    await interaction.reply({ embeds: [confirmEmbed], ephemeral: true });
  },
};

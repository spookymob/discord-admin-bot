const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('View all available commands')
    .addStringOption(option =>
      option.setName('category')
        .setDescription('Command category')
        .setRequired(false)
        .addChoices(
          { name: 'Admin', value: 'admin' },
          { name: 'Moderation', value: 'moderation' },
          { name: 'Tickets', value: 'tickets' },
          { name: 'Giveaways', value: 'giveaways' },
          { name: 'Utility', value: 'utility' }
        )
    ),

  async execute(interaction) {
    const category = interaction.options.getString('category');

    if (!category) {
      // Main help menu
      const mainHelpEmbed = new EmbedBuilder()
        .setColor('#5865F2')
        .setTitle('📚 Bot Help Menu')
        .setDescription('Select a category to view commands')
        .addFields(
          { name: '🛡️ Admin Commands', value: '/help category:admin', inline: true },
          { name: '👮 Moderation', value: '/help category:moderation', inline: true },
          { name: '🎫 Tickets', value: '/help category:tickets', inline: true },
          { name: '🎉 Giveaways', value: '/help category:giveaways', inline: true },
          { name: '🔧 Utility', value: '/help category:utility', inline: true }
        )
        .setTimestamp();

      return await interaction.reply({ embeds: [mainHelpEmbed] });
    }

    const commands = {
      admin: [
        { name: '/ban', description: 'Ban a user from the server' },
        { name: '/kick', description: 'Kick a user from the server' },
        { name: '/lock', description: 'Lock the current channel' },
        { name: '/unlock', description: 'Unlock the current channel' },
        { name: '/purge', description: 'Bulk delete messages' }
      ],
      moderation: [
        { name: '/warn', description: 'Issue a warning to a user' },
        { name: '/timeout', description: 'Put a user in timeout' }
      ],
      tickets: [
        { name: '/ticket-setup', description: 'Setup the ticket system' }
      ],
      giveaways: [
        { name: '/giveaway', description: 'Create a giveaway' }
      ],
      utility: [
        { name: '/help', description: 'View all available commands' }
      ]
    };

    const categoryCommands = commands[category] || [];
    const categoryNames = {
      admin: '🛡️ Admin',
      moderation: '👮 Moderation',
      tickets: '🎫 Tickets',
      giveaways: '🎉 Giveaways',
      utility: '🔧 Utility'
    };

    const categoryEmbed = new EmbedBuilder()
      .setColor('#5865F2')
      .setTitle(`${categoryNames[category]} Commands`)
      .setDescription(`Here are all the ${category} commands available:`)
      .setTimestamp();

    categoryCommands.forEach(cmd => {
      categoryEmbed.addFields(
        { name: cmd.name, value: cmd.description, inline: false }
      );
    });

    await interaction.reply({ embeds: [categoryEmbed] });
  },
};

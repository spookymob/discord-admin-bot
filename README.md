# Discord Admin Bot

A comprehensive Discord bot with admin, moderation, tickets, and giveaway features.

## Features

### 🛡️ Admin Commands
- `/ban` - Ban a user from the server
- `/kick` - Kick a user from the server
- `/lock` - Lock the current channel
- `/unlock` - Unlock the current channel
- `/purge` - Bulk delete messages

### 👮 Moderation
- `/warn` - Issue a warning to a user
- `/timeout` - Put a user in timeout

### 🎫 Tickets
- `/ticket-setup` - Setup the ticket system with a button

### 🎉 Giveaways
- `/giveaway` - Create a giveaway with customizable duration and winners

### 🔧 Utility
- `/help` - View all available commands with category selection

## Installation

1. Clone the repository:
```bash
git clone https://github.com/spookymob/discord-admin-bot.git
cd discord-admin-bot
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file:
```
DISCORD_TOKEN=your_bot_token_here
CLIENT_ID=your_client_id_here
GUILD_ID=your_server_id_here
```

4. Start the bot:
```bash
npm start
```

## Development

For development with auto-reload:
```bash
npm run dev
```

## Requirements

- Node.js 16.0.0 or higher
- discord.js 14.0.0 or higher

## License

MIT

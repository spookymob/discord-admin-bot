const { Client, GatewayIntentBits, Collection } = require('discord.js');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.DirectMessages,
  ],
});

client.commands = new Collection();
client.slashCommands = new Collection();
client.cooldowns = new Collection();

// Load command files
const commandsPath = path.join(process.cwd(), 'src', 'commands');

console.log(`Looking for commands in: ${commandsPath}`);

if (fs.existsSync(commandsPath)) {
  const commandFolders = fs.readdirSync(commandsPath);
  console.log(`Found command folders: ${commandFolders.join(', ')}`);

  for (const folder of commandFolders) {
    const folderPath = path.join(commandsPath, folder);
    
    try {
      if (!fs.statSync(folderPath).isDirectory()) continue;
      
      const commandFiles = fs.readdirSync(folderPath).filter(file => file.endsWith('.js'));
      console.log(`Found ${commandFiles.length} commands in ${folder}`);
      
      for (const file of commandFiles) {
        const filePath = path.join(folderPath, file);
        delete require.cache[require.resolve(filePath)];
        const command = require(filePath);
        
        if (command.data) {
          client.slashCommands.set(command.data.name, command);
          console.log(`✅ Loaded command: ${command.data.name}`);
        }
      }
    } catch (error) {
      console.error(`Error loading commands from ${folder}:`, error);
    }
  }
  console.log(`\n✅ Total commands loaded: ${client.slashCommands.size}\n`);
} else {
  console.error(`❌ Commands directory not found at: ${commandsPath}`);
}

// Load event files
const eventsPath = path.join(process.cwd(), 'src', 'events');

console.log(`Looking for events in: ${eventsPath}`);

if (fs.existsSync(eventsPath)) {
  const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));
  console.log(`Found ${eventFiles.length} event files`);

  for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    delete require.cache[require.resolve(filePath)];
    const event = require(filePath);
    
    if (event.once) {
      client.once(event.name, (...args) => event.execute(...args, client));
      console.log(`✅ Loaded event (once): ${event.name}`);
    } else {
      client.on(event.name, (...args) => event.execute(...args, client));
      console.log(`✅ Loaded event: ${event.name}`);
    }
  }
  console.log();
} else {
  console.error(`❌ Events directory not found at: ${eventsPath}`);
}

client.login(process.env.DISCORD_TOKEN);

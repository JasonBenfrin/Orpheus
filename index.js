const fs = require('fs');
require('dotenv').config();
const { Client, Collection, Intents } = require('discord.js');
const token = process.env.token
const updateCommands = require('./deploy-commands')
const { keepAlive } = require('./server.js')

const client = new Client({intents: new Intents(129)});

//Commands Handler

client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.data.name, command);
}

//Events Handler

const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

// client.on('debug', console.log)

keepAlive()
module.exports = {client,updateCommands}
client.login(token);

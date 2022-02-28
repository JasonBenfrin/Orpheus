module.exports = {
  name: 'ready',
  once: true,
  execute(){
    const index = require('../index')

    console.log(`Logged in as ${index.client.user.tag}`);
    index.updateCommands()

		const client = index.client

    client.connectionManager = new Map();
    client.playlistManager = new Map();
    client.beforeShuffle = new Map();
    client.playerManager = new Map();
    client.queueManager = new Map();
		client.lastChannel = new Map();
    client.loopOption = new Map();
		client.timeout = new Map();
  }
} 
module.exports = {
  name: 'ready',
  once: true,
  execute(){
    const index = require('../index')

    console.log(`Logged in as ${index.client.user.tag}`);
    index.client.guilds.cache.forEach(guild => {
      index.updateCommands(guild.id)
    })

    index.client.connectionManager = new Map();
    index.client.playlistManager = new Map();
    index.client.beforeShuffle = new Map();
    index.client.playerManager = new Map();
    index.client.queueManager = new Map();
    index.client.loopOption = new Map();
  }
} 
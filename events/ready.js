module.exports = {
  name: 'ready',
  once: true,
  execute(){
    const index = require('../index')

    console.log(`Logged in as ${index.client.user.tag}`);
    index.client.guilds.cache.forEach(guild => {
      index.updateCommands(guild.id)
    })
  }
} 
module.exports = {
  name: "voiceStateUpdate",
  async execute(oldState, newState){
		let channel;
		const client = newState.guild.client
		if(newState.channelId){
			channel = client.channels.cache.get(newState.channelId)
		}else{
			channel = client.channels.cache.get(oldState.channelId)
		}
		if(channel.members.size == 1  && channel.members.get(client.user.id)) {
			var timeout = setTimeout(() => {
				if(channel.members.size == 1) {
					const guildId = newState.guild.id
					let player = client.playerManager.get(guildId)
					if(player) player.stop()
			    let connection = client.connectionManager.get(guildId)
					if(connection) connection.destroy()
			    connection = undefined
			    delete(connection)
			    client.connectionManager.delete(guildId)
			    client.playlistManager.delete(guildId)
			    client.playerManager.delete(guildId)
			    client.beforeShuffle.delete(guildId)
			    client.queueManager.delete(guildId)
			    client.loopOption.set(guildId, 'off')
					const textChannel = client.lastChannel.get(guildId)
					textChannel.send("**I've disconnected from the voice channel because there is no one listening my sweet music. :sob:**")
				}else{
					clearTimeout(timeout)
				}
			}, 300000)
			client.timeout.set(newState.guild.id, timeout)
		}else{
			if(client.timeout.get(newState.guild.id)) clearTimeout(client.timeout.get(newState.guild.id))
		}
  }
}
  const { AudioPlayerStatus, createAudioPlayer, joinVoiceChannel, createAudioResource } = require("@discordjs/voice")
const ytdl = require('ytdl-core')

function play(client, guildId, player, connection) {
  let queue = client.queueManager.get(guildId)
  let currentSong = queue[0];
  if(!client.playerManager.get(guildId)) return
	if(!currentSong) return
  const stream = ytdl(currentSong.url, {filter:'audioonly', highWaterMark: 1<<25})
  const resource = createAudioResource(stream)
  player.play(resource)
  connection.subscribe(player)
  //TODO might have to move the connection
}

function looping(client, loop, guildId){
  if(loop == "off") return client.playerManager.delete(guildId)
  if(loop == "all") {
    const playlist = client.playlistManager.get(guildId)
    let queue = [];
    playlist.forEach(song => {
      queue.push(song)
    })
    return client.queueManager.set(guildId, queue)
  }
}

module.exports = {
  play(interaction) {
    const client = interaction.client;
    if(!client.playerManager.get(interaction.guildId)) {
      connection = joinVoiceChannel({
        channelId: interaction.member.voice.channelId,
        guildId: interaction.guildId,
        adapterCreator: interaction.guild.voiceAdapterCreator,
        selfMute: false,
      });

      client.connectionManager.set(interaction.guildId, connection)

      const player = createAudioPlayer();
      client.playerManager.set(interaction.guildId, player)
      
      play(client, interaction.guildId, player, connection)

      player.on(AudioPlayerStatus.Idle, () => {
        let queue = client.queueManager.get(interaction.guildId)
        const loop = client.loopOption.get(interaction.guildId)
        if(!queue) return
        if(loop != "one"){
          queue = queue.slice(1)
          client.queueManager.set(interaction.guildId, queue)
        }
        if(queue.length == 0) looping(client, loop, interaction.guildId)
        play(client, interaction.guildId, player, connection)
      })
    }
  }
}
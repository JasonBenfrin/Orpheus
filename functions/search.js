const { play } = require('../functions/play.js');
const { convert } = require('../functions/time.js')
const ytdl = require('ytdl-core')
const yts = require('youtube-search')
const ytKey = process.env.ytAPI

class Song {
  constructor(name, time, url, author, live) {
    this.name = name;
    this.time = time;
    this.url = url;
    this.author = author;
		this.live = live;
  }
}

var opts = {
  maxResults: 1,
  key: ytKey,
  type: ["video", "playlist"]
};

async function search(keyword, interaction, next){
  const client = interaction.client

  await yts(keyword,opts,async function(err, result){
    if(err) {
      console.error(err)
      return interaction.editReply(`**No results found for:** *${keyword}*`)
    }
    const video = await result[0]
		if(!video) return
    const info = await ytdl.getBasicInfo(video.link)
    const time = info.videoDetails.lengthSeconds
    const timeHHMMSS = convert(time)

    const title = video.title.replace("&amp;", '&').replace("&gt;", '>').replace("&lt;", '<').replace("&quot;", '\"').replace("&#39;", '\'').replace('&#039;', '\'')

    const song = new Song(title, time, video.link, video.channelTitle, info.videoDetails.isLive)

    if(client.queueManager.get(interaction.guildId)) {

      //queue update
      let queue = client.queueManager.get(interaction.guildId)
      if(next){
        queue.splice(1, 0, song)
      }else{
        queue.push(song)
      }
      client.queueManager.set(interaction.guildId, queue);
      
      //playlist update
      let playlist = client.playlistManager.get(interaction.guildId)
      if(next){
        playlist.splice(1, 0, song)
      }else{
        playlist.push(song)
      }
      client.playlistManager.set(interaction.guildId, playlist)
      
    }else{
      //queue create
      const queue = [song]
      client.queueManager.set(interaction.guildId, queue);

      //playlist create
      const playlist = [song]
      client.playlistManager.set(interaction.guildId, playlist);
    }
    if(!client.loopOption.get(interaction.guildId)) {
      client.loopOption.set(interaction.guildId, 'off')
    }
    play(interaction)
		if(info.videoDetails.isLive){
    	return interaction.editReply(`**Added to Queue :arrows_counterclockwise: : ${title}** **(LIVE)** | *${ video.channelTitle }*`)
		}else{
    	return interaction.editReply(`**Added to Queue :arrows_counterclockwise: : ${title}** (${timeHHMMSS}) | *${ video.channelTitle }*`)			
		}
  })
}

module.exports = { search }
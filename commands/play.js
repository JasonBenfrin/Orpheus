const { SlashCommandBuilder } = require('@discordjs/builders');
const { joinVoiceChannel } = require('@discordjs/voice');
const { createAudioResource, createAudioPlayer } = require('@discordjs/voice');
const ytdl = require('ytdl-core')
const yts = require('yt-search')

const player = createAudioPlayer();

module.exports = {
	data: new SlashCommandBuilder()
		.setName('play')
		.setDescription("Plays a song.")
    .addStringOption(option => 
      option
        .setName('keywords')
        .setDescription('Keywords of song to be played')
        .setRequired(true)
    ),
	async execute(interaction) {
    
    //checking everything
    const channel = interaction.member.voice.channel;

    if(!channel) return interaction.reply('Please join a voice channel!');

    const permissions = channel.permissionsFor(interaction.client.user);
    
    if(!permissions.has('CONNECT')) return interaction.reply('I don\'t have the right permissions to connect. :cry:')
    if(!permissions.has('SPEAK')) return interaction.reply('I don\'t have the right permissions to speak. :cry:')

    interaction.reply(`**Searching for :** *${interaction.options.getString('keywords')}*`)

		const results = await yts(interaction.options.getString('keywords'))
    const video = results.videos[0]

    function play(url) {
      const stream = ytdl(url, {filter:'audioonly'})

      const connection = joinVoiceChannel({
        channelId: interaction.member.voice.channelId,
	      guildId: interaction.guildId,
	      adapterCreator: interaction.guild.voiceAdapterCreator,
        selfMute: false,
      });

      const resource = createAudioResource(stream)

      player.play(resource)
      connection.subscribe(player)
      
      return interaction.editReply(`**Now Playing :play_pause: : ${video.title}** (${video.timestamp}) | *${ video.author.name }*  `)
    }

    if(video){
      play(video.url)    
    }else{
      return interaction.reply('*Sorry. Requested song is not found.*')
    }
	},
  player
}
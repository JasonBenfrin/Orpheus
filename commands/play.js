const { SlashCommandBuilder } = require('@discordjs/builders');
const { joinVoiceChannel } = require('@discordjs/voice');
const { createAudioResource, createAudioPlayer, VoiceConnectionStatus, entersState } = require('@discordjs/voice');
const ytdl = require('ytdl-core')
const yts = require('youtube-search')
const ytKey = process.env['ytAPI']

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
    const me = interaction.guild.me.voice.channelId;

    const voiceGuild = interaction.member.voice.guild.id
    const textGuild = interaction.guildId

    if(!channel || voiceGuild != textGuild) return interaction.reply('Please join a voice channel!');

    const channelId = channel.id

    const permissions = channel.permissionsFor(interaction.client.user);
    
    if(!permissions.has('CONNECT')) return interaction.reply('I don\'t have the right permissions to connect. :cry:\nPlease ask the administrators to set permissions.')
    if(!permissions.has('SPEAK')) return interaction.reply('I don\'t have the right permissions to speak. :cry:\nPlease ask the administrators to set permissions.')

    if(me && me != channelId) return interaction.reply('**The bot is already in another voice channel**')

    await interaction.reply(`**Searching for :** *${interaction.options.getString('keywords')}*`)

    //using youtube-search
		var opts = {
      maxResults: 1,
      key: ytKey
    };

    await yts(interaction.options.getString('keywords'),opts,async function(err,result){
      // console.log(err)
      // console.log(result)
      const video = result[0]

      const info = await ytdl.getBasicInfo(video.link)
      const time = info.videoDetails.lengthSeconds

      const minutes = Math.floor(time/60)
      const seconds = time - minutes*60

      //using ytdl-core
      function play(url) {
        const stream = ytdl(url, {filter:'audioonly', highWaterMark: 2097152})//<--- 2Mb
        
        connection = joinVoiceChannel({
          channelId: interaction.member.voice.channelId,
          guildId: interaction.guildId,
          adapterCreator: interaction.guild.voiceAdapterCreator,
          selfMute: false,
        });
        
        const player = createAudioPlayer();
        interaction.client.playerManager.set(interaction.guildId, player)
        const resource = createAudioResource(stream)

        player.setMaxListeners(100)
        player.play(resource)
        connection.subscribe(player)

        connection.on(VoiceConnectionStatus.Disconnected, async (oldState, newState) => {
          try {
            await Promise.race([
              entersState(connection, VoiceConnectionStatus.Signalling, 5_000),
              entersState(connection, VoiceConnectionStatus.Connecting, 5_000),
            ]);
            // Seems to be reconnecting to a new channel - ignore disconnect
          } catch (error) {
            // Seems to be a real disconnect which SHOULDN'T be recovered from
            connection.destroy();
          }
        });

        //error handlers For error code 403 from ytdl-core

        player.on('error', () => {
          return interaction.editReply('*Something went wrong!\nPlease retry!*')
        });
        
        return interaction.editReply(`**Now Playing :play_pause: : ${video.title}** (${minutes}:${seconds}) | *${ video.channelTitle }*  `)//TODO replacement for timestamp
      }

      //play
      if(video){
        play(video.link)
      }else{
        return interaction.reply('*Sorry. Requested song is not found.*')
      }    
    })

    
	},
}
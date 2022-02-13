const { SlashCommandBuilder } = require('@discordjs/builders');
const { valid } = require('../functions/valid.js')
const { convert } = require('../functions/time.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('remove')
		.setDescription('Removes a song from the Queue')
    .addIntegerOption(option =>
      option
        .setName('index')
        .setDescription('Integer index of the song from the Queue to be removed.')
        .setRequired(true)
    ),
	async execute(interaction) {
    if(!valid(interaction)) return
    const me = interaction.guild.me.voice.channelId;
    const user = interaction.member.voice.channelId;
    if(me != user) return interaction.reply('**You are not in the same channel as me!**')
    
    // interaction.deferReply();

    const client = interaction.client

    const queue = client.queueManager.get(interaction.guildId)
    const playlist = client.playlistManager.get(interaction.guildId)

    if(!queue || !playlist) return interaction.reply("**There is no Queue currently.**")

    let i = interaction.options.getInteger('index');
    i--;

    if(i < 0 || i >= queue.length) return interaction.reply("**Index is out of bound.** You must put a valid index.\n*Please check at `/list` command.*")

    const song = queue[i]
    if(i != 0){
      queue.splice(i, 1)
      client.queueManager.set(interaction.guildId, queue)
    }else{
      playlist.splice(playlist.indexOf(song), 1)
      client.playlistManager.set(interaction.guildId, playlist)    
      return interaction.reply("**You cannot remove the song that is currently playing in the queue.**\nUse `/skip`.\n*But the song is removed from the playlist.*")
    }

    if(playlist.indexOf(song) >= 0){
      playlist.splice(playlist.indexOf(song), 1)
      client.playlistManager.set(interaction.guildId, playlist)
    }else{
      return interaction.reply("The song is already removed.")
    }

		return interaction.reply(`**Removed: ${song.name}** (${convert(song.time)}) | ${song.author} :x:`);
	}
};
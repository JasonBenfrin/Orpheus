const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js')
const yts = require('yt-search');
const lyFind = require('lyrics-finder')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('lyrics')
		.setDescription('Shows the lyrics of the song')
    .addStringOption(option => 
      option
        .setName('song')
        .setDescription('Name of the song')
        .setRequired(true)
    )
    .addStringOption(option => 
      option
        .setName('author')
        .setDescription('Author of the song (optional)')
        .setRequired(false)
    ),
	async execute(interaction) {
    interaction.reply(`**Searching :** *${interaction.options.getString('song')}*`);
		const results = await yts(interaction.options.getString('song'));
    const video = results.videos[0];
    const embed = new MessageEmbed()
      .setTitle(video.title)
      .setURL(video.url)
      .setThumbnail(video.image)
      .setColor('RANDOM')
      .setTimestamp()
      .setFooter(`Requested by: ${interaction.user.tag}`, interaction.user.displayAvatarURL());
    let lyric = await lyFind('', interaction.options.getString('song'));
    if(lyric){
      embed.setDescription(lyric)
      return interaction.editReply({embeds: [embed], content: ' '})
    }else{
      return interaction.editReply(`*There is no lyrics called ${interaction.options.getString('song')}.*`)
    }
    // const lyrics = lyFind(video.author.name, video.title);
	}
};
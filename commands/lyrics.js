const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js')
// const yts = require('yt-search');
const ytKey = process.env['ytAPI']
const search = require('youtube-search')
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
    var opts = {
      maxResults: 1,
      key: ytKey
    };
    let lyric = await lyFind('', interaction.options.getString('song'));
<<<<<<< Updated upstream
    search(interaction.options.getString('song'),opts,function(err,result){
      const video = result[0]
=======
    search(interaction.options.getString('song'),opts,async function(err,result){
      const video = await result[0]
>>>>>>> Stashed changes
      if(lyric){
        const embed = new MessageEmbed()
          .setTitle(video.title)
          .setURL(video.link)
          .setThumbnail(video.thumbnails.medium.url)
          .setColor('RANDOM')
          .setTimestamp()
          .setFooter(`Requested by: ${interaction.user.tag}`, interaction.user.displayAvatarURL());
        embed.setDescription(lyric)
        return interaction.editReply({embeds: [embed], content: ' '})
      }else{
        return interaction.editReply(`*There is no lyrics called ${interaction.options.getString('song')}.*`)
      }
<<<<<<< Updated upstream
    })    
=======
    })
>>>>>>> Stashed changes
	}
};
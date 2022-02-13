const { SlashCommandBuilder } = require('@discordjs/builders');
const { convert } = require('../functions/time.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('list')
		.setDescription('Shows a list of songs that are currently queued.'),
	async execute(interaction) {
    let msg = ":arrow_forward: ";
    let i = 0;
    let length = 0;
		let isLive = false;
    
    const queue = interaction.client.queueManager.get(interaction.guildId)
    if(!queue || queue.length == 0) return interaction.reply('**There is no Queue currently playing.**')
    queue.forEach(song => {
      if(i < 5) {
        i++
				if(song.live) {
					isLive = true
					msg += `**${i}. ${song.name}** **(LIVE)** | *${song.author}* \n`
				}else{
        	msg += `**${i}. ${song.name}** (${convert(song.time)}) | *${song.author}* \n`
				}
      }
      length += parseInt(song.time)
    })

    if(queue.length > 5) {
      msg += ` +${queue.length - 5} songs left.\n`
    }

    if(interaction.client.loopOption.get(interaction.guildId) == "off" && !isLive) {
      msg += `\n**Total time left:** (${convert(length)})`
    }else if(isLive){
			msg += '\n**Total time left unavailable because queue contains Live video.**'
		}else{
      msg += `\n**Total time unavailable because loop is set to ${interaction.client.loopOption.get(interaction.guildId)}.**`
    }
		return interaction.reply(msg);
	}
};
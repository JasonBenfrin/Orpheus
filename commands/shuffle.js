const { SlashCommandBuilder } = require('@discordjs/builders');
const { valid } = require('../functions/valid.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('shuffle')
		.setDescription('Shuffles the current Queue.'),
	async execute(interaction) {
    const me = interaction.guild.me.voice.channelId;
    const user = interaction.member.voice.channelId;

    if(!valid(interaction)) return
    if(me != user) return interaction.reply('**You are not in the same channel as me!**')

    const client = interaction.client;

    if(!client.queueManager.get(interaction.guildId)) return interaction.reply('**There is no Queue currently playing.**')

    let currentQueue = [];
    let queue = client.queueManager.get(interaction.guildId)
    queue.forEach(song => {
      currentQueue.push(song)
    })
		if(!client.beforeShuffle.get(interaction.guildId)){
			client.beforeShuffle.set(interaction.guildId, currentQueue)
		}
		let shuffled = [queue[0]];
		queue.splice(0,1)
		let i = 0;
    while(queue.length != 0){
			const random = Math.floor(Math.random() * queue.length)
			shuffled.push(queue[random])
			queue.splice(random, 1)
		}
    client.queueManager.set(interaction.guildId, shuffled)
		return interaction.reply("**The queue has been shuffled. :twisted_rightwards_arrows:**");
	}
};
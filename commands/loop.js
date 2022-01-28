const { SlashCommandBuilder } = require('@discordjs/builders');
const { valid } = require('../functions/valid.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('loop')
		.setDescription('Loops a single song or multiple ones.')
    .addStringOption(option => 
      option
        .setName('type')
        .setDescription('Type of loop to be performed.')
        .setRequired(true)
        .addChoice('One','one')
        .addChoice('All','all')
        .addChoice('Off','off')
    ),
	async execute(interaction) {
    const me = interaction.guild.me.voice.channelId;
    const user = interaction.member.voice.channelId;

    if(!valid(interaction)) return
    if(me != user) return interaction.reply('**You are not in the same channel as me!**')

    const type = interaction.options.getString('type')
		switch (type) {
      case 'one': interaction.client.loopOption.set(interaction.guildId, 'one');
        return interaction.reply(`Loop has been set to "One" :repeat_one:.`)
      case 'all': interaction.client.loopOption.set(interaction.guildId, 'all');
        return interaction.reply(`Loop has been set to "All" :repeat:.`)
      case 'off': interaction.client.loopOption.set(interaction.guildId, 'off');
        return interaction.reply(`Loop has been set to "Off" :arrow_forward:.`)
      default: interaction.client.loopOption.set(interaction.guildId, 'off');
        return interaction.reply(`Loop has been set to "Off":arrow_forward:.`)
    }
	}
};
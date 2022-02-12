const { SlashCommandBuilder } = require('@discordjs/builders');
const { search } = require('../functions/search.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('2playnext')
		.setDescription('Plays the requested song after current song.')
    .addStringOption(option => 
      option
        .setName('keywords')
        .setDescription('Keywords of song to be played')
        .setRequired(true)
    ),
	async execute(interaction) {
    //Checking everything
    const channel = interaction.member.voice.channel;
    const me = interaction.guild.me.voice.channelId;

    const voiceGuild = interaction.member.voice.guild.id
    const textGuild = interaction.guildId

    if(!channel || voiceGuild != textGuild) return interaction.reply('**Please join a voice channel!**');

    const channelId = channel.id

    if(me && me != channelId) return interaction.reply('**The bot is already in another voice channel**')
    await interaction.reply(`**Searching for :** *${interaction.options.getString('keywords')}*`)

    search(interaction.options.getString('keywords'), interaction, true)
	}
};
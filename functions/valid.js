function valid(interaction) {
  const channel = interaction.member.voice.channel;
  const me = interaction.guild.me.voice.channelId;

  if(!channel) {
    interaction.reply('**Please join a voice channel!**');
    return false
  }

  if(!me){
    interaction.reply('**I\'m not in a voice channel!**')
    return false
  }

  return true
}

module.exports = valid

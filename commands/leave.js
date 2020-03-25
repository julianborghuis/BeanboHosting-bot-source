module.exports.run = async (bot, message, args) => {
 
    if (!message.member.voiceChannel) return message.channel.send("Please connect with voice channel first.");
 
    if (!message.guild.me.voiceChannel) return message.channel.send("Bot isnt connected with a voice channel.");
 
    if (message.guild.me.voiceChannelID != message.member.voiceChannelID) return message.channel.send("You are not connected with the same voice channel as the bot.");
 
    message.guild.me.voiceChannel.leave();
 
    message.channel.send("Kanaal aan het verlaten...");    
}
 
module.exports.help = {
    cata: "muziek",
    name: "leave",
    description: "Laat de bot leaven van het kanaal."
}
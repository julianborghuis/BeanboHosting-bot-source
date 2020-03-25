const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("Sorry, you dont have the right permissions to do this.");

    var user = await bot.fetchUser(args[0])

    message.guild.unban(user);

    const exampleEmbed = new discord.RichEmbed()
	.setColor('#4955a9')
    .setTitle(`**UNBAN**`)
    .setDescription(`Unbanned user: ${user.username}`)

    let incidentchannel = message.guild.channels.get("640653313125122089");
    if(!incidentchannel) return message.channel.send("Cant find logs channel.");

    incidentchannel.send(exampleEmbed);

    message.channel.send(`:white_check_mark: Succesfully ${user} unbanned`)

}

module.exports.help = {
    cata: "staff",
    name: "unban"
}
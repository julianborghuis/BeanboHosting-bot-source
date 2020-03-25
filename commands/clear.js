const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

  //!clear 15
  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("You do not have permission to do this.");
  if(!args[0]) return message.channel.send("Specify a number of items for deletion.");
  message.channel.bulkDelete(args[0]).then(() => {

    const exampleEmbed = new discord.RichEmbed()
	.setColor('#4955a9')
    .setTitle(`Cleared messages`)
    .setDescription(`Cleared ${args[0]} messages.`)

message.channel.send(exampleEmbed).then(msg => msg.delete(5000));
  });
}

module.exports.help = {
  cata: "staff",
  name: "clear",
  aliases: "purge"
}
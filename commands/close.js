const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    if (!message.channel.name.startsWith(`ticket`)) return message.channel.send(`Please use this command in a ticket.`);

    else message.channel.delete();

}

module.exports.help = {
  cata: "staff",
  name: "close",
  aliases: "koppel"
}
const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

  if (!args[0]) return message.channel.send(`Give me a user id to add to this ticket.`);

  let user = bot.users.get(args[0]);

  if (user) {

    if (!message.channel.name.startsWith(`ticket`)) return message.channel.send(`Please use this command in a ticket.`);

    await message.channel.overwritePermissions(user, {
      "READ_MESSAGES": true,
      "SEND_MESSAGES": true,
      "ATTACH_FILES": true,
      "CONNECT": true,
      "CREATE_INSTANT_INVITE": false,
      "ADD_REACTIONS": true
  });

    var succesEmbed = new discord.RichEmbed()
    .setColor('#4955a9')
    .setTitle (`: white_check_mark: User added!`)
  .addField (`User added:`, user.username)
  .setFooter (`Copyright BadLucks Market 2019`);

    message.channel.send(succesEmbed)
  };
}

module.exports.help = {
  cata: "staff",
  name: "add",
  aliases: "koppel"
}
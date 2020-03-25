const Discord = require("discord.js");
const errors = require("../assets/errors.js");
const fs = require("fs");

module.exports.run = async (bot, message, args) => {

    if(!message.member.hasPermission("KICK_MEMBERS")) return errors.noPerms(message, "KICK_MEMBERS");
    if(args[0] == "help"){
      message.reply("Use: !kick <user> <reason>");
      return;
    }
    let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!kUser) return errors.cantfindUser(message.channel);
    let kReason = args.join(" ").slice(22);
    if(kUser.hasPermission("MANAGE_MESSAGES")) return errors.equalPerms(message, kUser, "MANAGE_MESSAGES");

    let kickEmbed = new Discord.RichEmbed()
    .setDescription("~Kick~")
    .setColor("#4955a9")
    .addField("Kicked User", `${kUser} with ID ${kUser.id}`)
    .addField("Kicked by", `<@${message.author.id}> with ID ${message.author.id}`)
    .addField("kicked In", message.channel)
    .addField("Time", message.createdAt)
    .addField("Reason", kReason);

    let kickChannel = message.guild.channels.get("640653313125122089")
    if(!kickChannel) return message.channel.send("Cant find channel.");

    message.guild.member(kUser).kick(kReason);
    kickChannel.send(kickEmbed);

    message.channel.send(`:white_check_mark: Succesfully kicked: ${kUser}.`)

    var user = message.mentions.members.first() || message.guild.members.get(args[0]);

    const kicks = require("../assets/kicks.json");

    if (!kicks[user.id]) kicks[user.id] = {
      kicks: 0
  };

  kicks[user.id].kicks++;

  fs.writeFile("./assets/kicks.json", JSON.stringify(kicks), (err) => {
      if (err) console.log(err)
  });
}

module.exports.help = {
  cata: "staff",
  name:"kick"
}
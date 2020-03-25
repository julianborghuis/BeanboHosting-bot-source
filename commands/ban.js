const Discord = require("discord.js");
const errors = require("../assets/errors.js");
const fs = require("fs");

module.exports.run = async (bot, message, args) => {
    message.delete();
    if(!message.member.hasPermission("BAN_MEMBERS")) return errors.noPerms(message, "BAN_MEMBERS");
    if(args[0] == "help"){
      message.reply("Use: !ban <user> <reason>");
      return;
    }
    let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!bUser) return errors.cantfindUser(message.channel);
    if(bUser.id === bot.user.id) return errors.botuser(message); 
    let bReason = args.join(" ").slice(22);
    if(!bReason) return errors.noReason(message.channel);
    if(bUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("you cannot kick this person.");

    let banEmbed = new Discord.RichEmbed()
    .setDescription("~Ban~")
    .setColor("#4955a9")
    .addField ("Banished User", `${bUser} with ID $ {bUser.id}`)
    .addField ("Banned by", `<@${message.author.id}> with ID ${message.author.id}`)
    .addField ("Banned in", message.channel)
    .addField ("Time", message.createdAt)
    .addField ("Reason", bReason);

    let incidentchannel = message.guild.channels.get("640653313125122089");
    if(!incidentchannel) return message.channel.send("Cannot find the channel.");

    message.guild.member(bUser).ban(bReason);
    incidentchannel.send(banEmbed);

    message.channel.send(`:white_check_mark: Succesfully ${bUser} banned`)

    var user = message.mentions.members.first() || message.guild.members.get(args[0]);

    const bans = require("../assets/bans.json");

    if (!bans[user.id]) bans[user.id] = {
      bans: 0
  };

  bans[user.id].bans++;

  fs.writeFile("./assets/bans.json", JSON.stringify(bans), (err) => {
      if (err) console.log(err)
  });
}

module.exports.help = {
  cata: "staff",
  name:"ban"
}
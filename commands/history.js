const discord = require("discord.js")

module.exports.run = async (bot, message, args) => {

  const warns = require("../assets/warnings.json")
const mute = require("../assets/mutes.json")
const kicks = require("../assets/kicks.json")
const bans = require("../assets/bans.json");

  var user = "";

if (args.length == 1) {
    var usertemo = message.guild.member(message.mentions.users.first() || message.guild.members(args[0]).id);
    if (!usertemo) message.channel.send("This user doesn't exist!");

    user = usertemo.user;
} else if (args.length == 0) {
    user = message.member.user;
}

var username = user.username;
    let totalwarns;

if (!warns[user.id]) {
    totalwarns = "0"
} else {
    totalwarns = warns[user.id].warns
}

if (!mute[user.id]) {
  totalmutes = "0"
} else {
  totalmutes = mute[user.id].mutes
}

if (!kicks[user.id]) {
  totalkicks = "0"
} else {
  totalkicks = kicks[user.id].kicks
}

if (!bans[user.id]) {
  totalbans = "0"
} else {
  totalbans = bans[user.id].bans
}

const exampleEmbed = new discord.RichEmbed()
.setThumbnail(user.displayAvatarURL)
.setColor('#4955a9')
.setTitle(`History from ${user.username}`)
.addField(`Total warns`, totalwarns)
.addField(`Total times muted`, totalmutes)
.addField(`Total times kicked`, totalkicks)
.addField(`Total times banned`, totalbans)
.setFooter(`BadLucks Market`);


message.channel.send(exampleEmbed)
        
  }
  
  module.exports.help = {
    cata: "algemeen",
    name: "history"
  }
const Discord = require("discord.js")
const ms = require("ms");
const fs = require("fs")

module.exports.run = async (bot, message, args) => {

    if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("Sorry, you dont have the right permissions to ban him.");

    var user = message.guild.member(message.mentions.users.first());

    if (!user) return message.channel.send("You use the command:! Tempban user time reason as follows.");

    if (user.hasPermission("MANAGE_MESSAGES")) return message.channel.send("This user cannot be temp banned.");

    var reason = args.join(" ").slice(22);

    if (!reason) return message.channel.send("Give a reason");
    
    var tempBanTime = args[1];

    if (ms(tempBanTime)) {

        let banEmbed = new Discord.RichEmbed()
    .setDescription("~Ban~")
    .setColor("#4955a9")
    .addField("Banned User", `${bUser} with ID ${bUser.id}`)
    .addField("Banned by", `<@${message.author.id}> with ID ${message.author.id}`)
    .addField("banned in", message.channel)
    .addField("Time", message.createdAt)
    .addField("Banned for", `${tempBanTime}`)
    .addField("Reason", bReason);

    let incidentchannel = message.guild.channels.find(c => c.name == "605132644073603082");
    if(!incidentchannel) return message.channel.send("Kan de channel niet vinden.");

    message.guild.member(bUser).ban(bReason);
    incidentchannel.send(banEmbed);

        setTimeout(function () {
            
            message.guild.unban(user.id);

        }, ms(tempBanTime));

    } else {
        return message.channel.send("Give a valid time");
    }

    message.channel.send(`:white_check_mark: Succesfully ${user} banned`)

    var user = message.mentions.members.first() || message.guild.members.get(args[0]);

    const bans = require("../assets/bans.json");

    if (!bans[user.id]) bans[user.id] = {
      bans: 0
  };

  bans[user.id].bans++;

  fs.writeFile("./assets/bans.json", JSON.stringify(kicks), (err) => {
      if (err) console.log(err)
  });

}

module.exports.help = {
    cata: "staff",
    name: "tempban"
}
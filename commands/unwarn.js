const discord = require("discord.js");
const fs = require("fs");

const botConfig = require("../assets/config.json");

module.exports.run = async (bot, message, args) => {
    const waars = JSON.parse(fs.readFileSync("./assets/warnings.json", "utf8"));

    if (!message.member.roles.has("640646760162918418") && !message.member.hasPermission("ADMINISTRATOR") && !message.member.roles.has("501060638664294480") && !message.member.roles.has("536529454109949963"))return message.channel.send("SOrry, you dont have the right permissions to do this.");

    var user = message.guild.member(message.mentions.users.first());

    if (!user) return message.channel.send("This user is not in this server.");

    if (user.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You cant unwarn staff.");

    var amount = args[1];

    if (!amount) return message.channel.send("Give me an amount of unwarns");

    if (waars[user.id].warns == 0) return message.channel.send("This user doesnt have any warns.");

    if (amount > waars[user.id].warns) {
        waars[user.id].warns = 0;
    } else {
        var thenew = waars[user.id].warns - amount;
        waars[user.id].warns = thenew;
    }

    fs.writeFile("./assets/warnings.json", JSON.stringify(waars), (err) => {
        if (err) console.log(err);
    });

    var warnEmbed = new discord.RichEmbed()
        .setTitle("Gebruiker geunwarned")
        .setColor("#4955a9")
        .addField("User:", user)
        .addField("Unwarned by:", message.author)
        .addField("Total unwarns:", amount);

        var warnChannel = message.guild.channels.get("640653313125122089");
    if (!warnChannel) return message.guild.send("Cant find logs channel!");

    warnChannel.send(warnEmbed);

    return message.channel.send(`:white_check_mark: Succesfully ${user} unwarned`)

}

module.exports.help = {
    name: "unwarn",
    description: "Verwijder de warn van een speler.",
    perm: "admin",
    sortcount:2,
    cata: "staff"
}
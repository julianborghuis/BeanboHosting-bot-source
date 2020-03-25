const discord = require("discord.js");
const ms = require("ms");
const botConfig = require("../assets/config.json");
const fs = require("fs");

module.exports.run = async (bot, message, args) => {

    var kickUser = message.guild.member(message.mentions.users.first());

        if (!kickUser) return message.channel.send("Oeps! Deze gebruiker is niet gevonden!");

        if (!message.member.roles.has("497782656143065108") && !message.member.hasPermission("ADMINISTRATOR") && !message.member.roles.has("501065108965949440") && !message.member.roles.has("536529454109949963") && !message.member.roles.has("500717749203632128") && !message.member.roles.has("561292552255569930") && !message.member.roles.has("501057706484826122") && !message.member.roles.has("501060638664294480") && !message.member.roles.has("561292552255569930")) return message.channel.send("Sorry, you dont have the right permisisions to do this.");

        if (kickUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Sorry, you cant mute staff.");

        let reason = args.slice(2).join(" ");

        if (!reason) return message.channel.send("Give me a reason to mute him");

        var muteRole = message.guild.roles.find(r => r.id == "645057626845216799");

        if (!muteRole) return message.channel.send("I cant find mute role");

        var muteTime = args[1];

        if (!muteTime) return message.channel.send("Give me a time.");

        if (!ms(muteTime)) return message.channel.send("Give me a valid time");
        var kickEmbed = new discord.RichEmbed()
            .setTitle("LOGS: User muted")
            .setColor("#4955a9")
            .addField("User:", kickUser)
            .addField("Muted by:", message.author)
            .addField("Reason:", reason)
            .addField("Time:", muteTime);

            var kickChannel = message.guild.channels.get("640653313125122089");
        if (!kickChannel) return message.guild.send("Cant find logs channel");

        var banEmbed2 = new discord.RichEmbed()
        .setTitle("You are muted in BadLucks Market")
        .setColor("#4955a9")
        .addField("Time:", muteTime)
        .addField("Reason:", reason);
        kickChannel.send(kickEmbed);

        kickUser.send(banEmbed2).then(function() {
        kickUser.addRole(muteRole.id);

        setTimeout(function () {

            kickUser.removeRole(muteRole.id);
        }, ms(muteTime));
        return message.channel.send(`This user has been successfully muted for $ {muteTime} and has been notified of this!`);
    }).catch(function() {
        kickUser.addRole(muteRole.id);

        setTimeout(function () {

            kickUser.removeRole(muteRole.id);
        }, ms(muteTime));
        return message.channel.send(`This user has been successfully muted for $ {muteTime} and has been notified of this!`);
    });

    const mutes = require("../assets/mutes.json");

    var user = message.mentions.members.first() || message.guild.members.get(args[0]);

    if (!mutes[user.id]) mutes[user.id] = {
        mutes: 0
    };
  
    mutes[user.id].mutes++;
  
    fs.writeFile("./assets/mutes.json", JSON.stringify(mutes), (err) => {
        if (err) console.log(err)
    });
}

module.exports.help = {
    name: "tempmute",
    description: "Geef een speler een mute.",
    perm: "admin",
    sortcount:4,
    cata: "staff"
}
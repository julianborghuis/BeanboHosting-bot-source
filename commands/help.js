const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    let helpembed = new Discord.RichEmbed()
    .setDescription(":star: Onze Helplijst :star:")
    .setColor("#4955a9")
    .addField(`** Members ** `,`! New - creates a ticket \ n! Help - sends our help list \ n! History - checks how many times you were banned kicked etc \ n! Leave - let the bot disconnect from the voice channel \ n ! play - plays a song \ n! queue - sends the list of all songs in the waiting list \ n! search - searches for a song \ n! skip - skips the current song`)
    .setFooter(`CopyRight MagicCraft 2019`);

    message.author.send(helpembed);

    if (message.member.hasPermissions("MANAGE_MESSAGES", "MANAGE_MEMBERS")) {
        let staffembed = new Discord.RichEmbed()
    .setDescription(":star: Onze staff commandos :star:")
    .setColor("#4955a9")
    .addField(`** Staff ** `,`! Add - add a player in a ticket \ n! Ban - banish a player \ n! Clear - clear the chat \ n! Close - delete a ticket \ n! Drop - make a drop to \ n! gcreate - creates a giveaway \ n! kick - kicks a player \ n! tempban - temporarily bans a player \ n! tempmute - mute a player temporarily \ n! unban - unabnned a player \ n! unwarn - unwarnt a player`)
    .setFooter(`CopyRight MagicCraft 2019`);

    message.author.send(staffembed)
    }

    message.channel.send(`Check your DMs`)
}

module.exports.help = {
    name: "help",
    description: "Vraag de helplijst op.",
    cata: "algemeen"
}

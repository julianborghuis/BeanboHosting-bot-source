const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("Oeps! Jij mag dit helemaal niet!");


    var dropEmbed = new discord.RichEmbed()
        .setColor(`#4955a9`)
        .addField("**DROP**", "Click on the response to claim the drop.");
        var dropEmbed2 = new discord.RichEmbed()
        .setColor(`#4955a9`)
        .setTimestamp();
        var dropEmbed3 = new discord.RichEmbed()
        .setColor(`#4955a9`);

    message.channel.send(dropEmbed).then((msg) => {
        msg.react('✅')

        const filter = (reaction, user) => {
            return ['✅'].includes(reaction.emoji.name) && !user.bot && dropEmbed2.addField("** DROP ** ", `The drop has been claimed by ${user.username}`)
            
        };

        msg.awaitReactions(filter, { max: 1, time: 900000, errors: ['time'] })
            .then(collected => {
                const reaction = collected.first();

                if (reaction.emoji.name === '✅') {
                    msg.edit(dropEmbed2);
                }

            })
            .catch(collected => {
                dropEmbed3.addField("**DROP**", `Nobody has claimed the drop!`)
                msg.edit(dropEmbed3)
            });

    })
}

module.exports.help = {
    cata: "staff",
    name: "drop",
    description: "Verstuur een bericht.",
    perm: "admin",
    sortcount: 10,
    cata: "staff"
}
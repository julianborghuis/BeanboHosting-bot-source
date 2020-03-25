const discord = require("discord.js")
const giveaways = require("discord-giveaways");
const fs = require("fs");
const giveaway = require("../giveaways.json");

module.exports.run = async (bot, message, args) => {

    giveaways.launch(bot, {
        updateCountdownEvery: 5000,
        botsCanWin: false,
        ignoreIfHasPermission: [
            
        ],
        embedColor: "#4955a9",
        reaction: "🎉",
        storage: "./giveaways.json"
    });

    let messageID = args[0];
        giveaways.reroll(messageID).then(() => {
            message.channel.send("Success! Giveaway rerolled!");
        }).catch((err) => {
            console.log(err)
            message.channel.send("No giveaway found for "+messageID+", please check and try again");
        });
    }

module.exports.help = {
    cata: "staff",
    name: "reroll"
}
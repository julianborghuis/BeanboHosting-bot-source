const Discord = require("discord.js");
const giveaways = require("discord-giveaways")
const ms = require("ms"); // npm install ms

module.exports.run = async (bot, message) => {

    if (!message.author.hasPermissions("MANAGE_MESSAGES", "ADMINISTRATOR")) return message.channel.send("You dont have the right permissions to do this!");

    let questions = ["how long do you want to keep the giveaway?", "what will the prize be?", "how many winners?", "what will be the title of the giveaway?"];
    let answers = [];
    for(let i = 0; i < questions.length; i++) {
        let question = questions[i];
        message.channel.send(question);
        await message.channel.awaitMessages(m => m.author.id === message.author.id, { max: 1, time: 60000 })
        .then(msg => {
            msg = msg.first();
            answers.push(msg.content);
        })
        .catch(err => message.reply("react a little faster, try again!"));
    }
    message.channel.bulkDelete(questions.length*3);

    giveaways.launch(bot, {
        updateCountdownEvery: 5000,
        botsCanWin: false,
        ignoreIfHasPermission: [
            
        ],
        embedColor: "#4955a9",
        reaction: "🎉",
        storage: "./giveaways.json"
    });

    let winners = answers[2]

    giveaways.start(message.channel, {
        time: ms(answers[0]),
        prize: (answers[1]),
        winnersCount: parseInt(winners),
messages: {
    giveaway: (answers[3]),
    giveawayEnded: "🎉🎉 ** GIVEAWAY FINISHED ** 🎉🎉",
    timeRemaining: "Time to go: ** {duration} **!",
    inviteToParticipate: "Respond with 🎉 to participate!",
    winMessage: "Congratulations, {winners}! You won ** {prize} **!",
    embedFooter: "Giveaways",
    noWinner: "Giveaway canceled, not enough participants.",
    winners: "winner (s)",
    endedAt: "Ended on",
    units: {
        seconds: "seconds",
        minutes: "minutes",
        hours: "hours",
        days: "days"
    }
}
});

    message.channel.send("@everyone")
    message.channel.bulkDelete(1);
}

module.exports.help = {
    cata: "staff",
    name: "gcreate"
}
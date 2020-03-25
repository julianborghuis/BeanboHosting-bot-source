const discord = require("discord.js");

module.exports.run = async (bot, message) => {

    if (!message.author.hasPermissions("MANAGE_MESSAGES", "ADMINISTRATOR")) return message.channel.send("You dont have the right permissions to do this!");

    let questions = ["What would be the title of the announcement?", "What would be the message for the announcement?", "In what channel want you to create an announcement?"];
    let answers = [];
    for(let i = 0; i < questions.length; i++) {
        let question = questions[i];
        message.channel.send(question);
        await message.channel.awaitMessages(m => m.author.id === message.author.id, { max: 1, time: 60000 })
        .then(msg => {
            msg = msg.first();
            answers.push(msg.content);
        })
        .catch(err => message.reply("You took too long to respond!"));
    }
    message.channel.bulkDelete(questions.length*3);

    var chnl = answers[2];

    const exampleEmbed = new discord.RichEmbed()
	.setColor('#4955A9')
    .setTitle(`${answers[0]}`)
    .setDescription(`${answers[1]}`)
    .setFooter(`CopyRight BadLucks Market - Message by: ${message.author.username}`);

message.channel.send(exampleEmbed);
}

module.exports.help = {
    name: "announce"
}
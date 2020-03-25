const discord = require("discord.js");
 
module.exports.run = async (bot, message, args) => {
 
    // ID van de categorie van de tickets.
    const categoryId = "643480854844407849";
 
    // Verkrijg Gebruikersnaam
    var userName = message.author.username;
    // Verkrijg discriminator
    var userDiscriminator = message.author.discriminator;
 
    // Als ticket al gemaakt is
    var bool = false;
 
    // Kijk na als ticket al gemaakt is.
    message.guild.channels.forEach((channel) => {
 
        // Als ticket is gemaakt, zend bericht.
        if (channel.name == userName.toLowerCase() + "-" + userDiscriminator) {
 
            message.channel.send("You already made a ticket");
 
            bool = true;
 
        }
 
    });
 
    // Als ticket return code.
    if (bool == true) return;
 
    var embedCreateTicket = new discord.RichEmbed()
    .setColor('#4955a9')
        .setTitle("Hello, " + message.author.username)
        .setFooter("Ticket has been created");
 
    message.channel.send(embedCreateTicket);
 
    // Maak kanaal en zet in juiste categorie.
    message.guild.createChannel(`ticket-${userName}`, "text").then((createdChan) => { // Maak kanaal
 
        createdChan.setParent(categoryId).then((settedParent) => { // Zet kanaal in category.
 
            // Zet perms voor iedereen
            settedParent.overwritePermissions(message.guild.roles.find('name', "@everyone"), { "READ_MESSAGES": false });
            // Zet perms voor de gebruiker die ticket heeft aangemaakt.
            settedParent.overwritePermissions(message.author, {
 
                "READ_MESSAGES": true, "SEND_MESSAGES": true,
                "ATTACH_FILES": true, "CONNECT": true,
                "CREATE_INSTANT_INVITE": false, "ADD_REACTIONS": true
 
            });
 
            var embedParent = new discord.RichEmbed()
            .setColor('#b86afc')
                .setTitle("Hello, " + message.author.username.toString())
                .setDescription("Ask here your questions.");
 
            settedParent.send(embedParent);
        }).catch(err => {
            message.channel.send("Er is iets fout gelopen.");
        });
 
    }).catch(err => {
        message.channel.send("Er is iets fout gelopen.");
    });
 
}
 
module.exports.help = {
    name: "ticket",
    aliases: "ticket",
    description: "Maak een ticket aan"
}
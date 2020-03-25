const config = require("./assets/config.json");
const Discord = require("discord.js");
const fs = require("fs");
const giveaways = require("discord-giveaways");
const bot = new Discord.Client();
bot.commands = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {

  if(err) console.log(err);
  let jsfile = files.filter(f => f.split(".").pop() === "js");
  if(jsfile.length <= 0){
    console.log("Couldn't find commands.");
    return;
  }

  jsfile.forEach((f, i) =>{
    let props = require(`./commands/${f}`);
    console.log(`${f} loaded!`);
    bot.commands.set(props.help.name, props);
  });
});

bot.on("ready", async () => {

  console.log(`${bot.user.username} is online on ${bot.guilds.size} servers!`);
  bot.user.setActivity("badluck.xyz", {type: "WATCHING"});

});

bot.on("guildMemberAdd" , member => {

  var role = member.guild.roles.get('640906898299813898'); // Variable to get channel ID
  member.addRole(role);
  
  var user = member;
  
    let welcomeEmbed2 = new Discord.RichEmbed()
    .setThumbnail(member.user.displayAvatarURL)
    .setColor("#4955a9")
    .setTitle(`**Welkom ${member.user.username}**`)
    .setDescription(`Welcome to the BadLucks Market Discord server!\nIf you have any questions go to #support or make an ticket with !ticket in #commands.\n\n***Links***:\n**Site**: https://badluck.xyz\n**Discord**: https://discord.gg/ZbujvGN\n`);

    var welcomeChannel = member.guild.channels.get('644953733058396181');
      welcomeChannel.send(welcomeEmbed2);
  
  });

  bot.on("guildMemberRemove" , member => {

    var user = member;
  
      let welcomeEmbed2 = new Discord.RichEmbed()
      .setThumbnail(member.user.displayAvatarURL)
      .setColor("#b86afc")
      .setTitle(`**Leave ${member.user.username}**`)
      .setDescription(`Sad that you left our Discord server ${member.user.username}. :cry:`);
  
      var welcomeChannel = member.guild.channels.get('644953733058396181');
      welcomeChannel.send(welcomeEmbed2);
    
    });

    const active = new Map();
 
var options = {
    active: active
}

bot.on("message", async message => {

  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let prefixes = JSON.parse(fs.readFileSync("./assets/prefixes.json", "utf8"));
  if(!prefixes[message.guild.id]){
    prefixes[message.guild.id] = {
      prefixes: config.prefix
    };
  }

  let prefix = prefixes[message.guild.id].prefixes;

  if (!message.content.startsWith(prefix)) return;
  
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  let commandfile = bot.commands.get(cmd.slice(prefix.length));
  if(commandfile) commandfile.run(bot,message,args);

});

bot.login(config.token);
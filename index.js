//Constants Discord.js-commando
const commando = require('discord.js-commando');
const bot = new commando.Client({
    unknownCommandResponse: false
});

//Config File
var discordkey = process.env.discordToken
var blizzardkey = process.env.blizzardToken


//Express
var express = require('express');
var app = express();

var guildAmount = bot.guilds.size;
var serverCount = {
        "servercount": guildAmount
}
  

app.use(express.static('public'))

app.get('/', function(req, res){
  res.sendFile('public/index.html', { root : __dirname});
  res.send(serverCount);
});

app.listen(process.env.PORT || 9000);
console.log("Listening on port 9000")
  

//Declaring command groups and configuring where commands are stored (Discord.js-commando)
bot.registry.registerGroup('random', 'Random');
bot.registry.registerGroup('wow', 'Wow')

bot.registry.registerDefaults();
bot.registry.registerCommandsIn(__dirname + "/commands"); //Directory for the command files

bot.login(discordkey); //Login token for the bot
//Constants Discord.js-commando
const commando = require('discord.js-commando');
const bot = new commando.Client({
    unknownCommandResponse: false
});

//Express
var express = require('express');
var app = express();
app.set('view engine', 'ejs');
var guildAmount = bot.guilds.size;
var serverCount = {
        "servercount": guildAmount
}
  

app.use(express.static('public'))

var guildAmount = client.guilds.size;


var serverCount = {
        "servercount": guildAmount
}

app.get('/', function(req, res){
  res.sendFile('public/index.ejs', { root : __dirname});
  res.send(serverCount);
  res.render('index.ejs',{
    "server" : "2"});
});

app.listen(process.env.PORT || 9000);
console.log("Listening on port 9000")
  

//Declaring command groups and configuring where commands are stored (Discord.js-commando)
bot.registry.registerGroup('random', 'Random');
bot.registry.registerGroup('wow', 'Wow')

bot.registry.registerDefaults();
bot.registry.registerCommandsIn(__dirname + "/commands"); //Directory for the command files

bot.login('MzMxMjQ4MzUyMDQ4MDU0Mjgy.DDsytw.hyEbsGU7y548RPQrTQ3M8_q3q-c'); //Login token for the bot
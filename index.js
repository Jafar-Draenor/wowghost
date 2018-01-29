//Constants Discord.js-commando
const commando = require('discord.js-commando');
const bot = new commando.Client({
    unknownCommandResponse: false
});

//Express
var express = require('express');

var app = express();

app.set('view engine', 'html')

app.use(express.static('public'))

var guildAmount = bot.guilds.size;


app.get('/', function(req, res){
  res.sendFile('public/index.html', { root : __dirname});
  res.render('public/index.html', {guildAMount:guildAmount})
});

console.log(bot.guilds.size)
app.listen(process.env.PORT || 9000);

//Declaring command groups and configuring where commands are stored (Discord.js-commando)
bot.registry.registerGroup('random', 'Random');
bot.registry.registerGroup('wow', 'Wow')

bot.registry.registerDefaults();
bot.registry.registerCommandsIn(__dirname + "/commands"); //Directory for the command files


//Server count GET request
var theUrl = "https://wowghost.herokuapp.com"

bot.login('MzMxMjQ4MzUyMDQ4MDU0Mjgy.DDsytw.hyEbsGU7y548RPQrTQ3M8_q3q-c'); //Login token for the bot
//Constants Discord.js-commando
const commando = require('discord.js-commando');
const bot = new commando.Client({
    unknownCommandResponse: false
});

console.log(bot.servers)

//Express
var express = require('express');

var app = express();

app.use(express.static('public'))

var guildAmount = bot.guilds.size;

var serverCount = {
        "servercount": guildAmount
}

app.get('/', function(req, res){
  res.sendFile('public/index.html', { root : __dirname});
  res.send(servercount)
});

app.listen(process.env.PORT || 9000);

//Declaring command groups and configuring where commands are stored (Discord.js-commando)
bot.registry.registerGroup('random', 'Random');
bot.registry.registerGroup('wow', 'Wow')

bot.registry.registerDefaults();
bot.registry.registerCommandsIn(__dirname + "/commands"); //Directory for the command files


//Server count GET request
var theUrl = "https://wowghost.herokuapp.com"

httpGetAsync

function httpGetAsync(theUrl, callback)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
}

bot.login('MzMxMjQ4MzUyMDQ4MDU0Mjgy.DDsytw.hyEbsGU7y548RPQrTQ3M8_q3q-c'); //Login token for the bot
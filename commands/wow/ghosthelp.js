//Defining commando
const commando = require('discord.js-commando');

class GhostHelpCommand extends commando.Command {

    
    constructor(client) {
        super(client, {
            name: 'ghosthelp',
            group: 'wow',
            memberName: 'ghosthelp',
            description: 'Lists all ghost commands.',
            examples: ['!ghosthelp'],
        });
    }

    async run(message, args) {
        var msg = ( ''
        + "\n---Misc Commands---"
        + "\n !ghosthelp"
        + "\n"
        + "\n---Toon Commands---"
        + "\n !ghost <toonname> <servername>"
        + "\n"
        )
        message.reply(msg)
    }
}

module.exports = GhostHelpCommand

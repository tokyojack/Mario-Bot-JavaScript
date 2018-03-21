const config = require("../config.js");

module.exports = function(bot, Discord, commands) {

    bot.on("message", message => {
        if (message.author.equals(bot.user))
            return;

        const prefix = config.commandPrefix;
        const content = message.content;

        if (!content.startsWith(prefix))
            return;

        const args = message.content.substring(prefix.length).split(" ");

        let unknownCommand = null;

        for (const command of commands) {
            const cmdName = command.getName().toLowerCase();

            if (!cmdName || 0 === cmdName.length) {
                unknownCommand = command;
                continue;
            }

            if (args[0].toLowerCase() === cmdName) {
                args.shift();
                command.getCode()(message, args, Discord);
                return;
            }
        }

        if (unknownCommand != null) {
            var list = 'Commands: ';
            var noEmptyCommands = commands.filter(command => command.getName() !== "");
            noEmptyCommands.forEach((command, i) => list += command.getName() + ((i+1) == noEmptyCommands.length ? '' : ', '));
            message.channel.send(list);
        }
    });

};

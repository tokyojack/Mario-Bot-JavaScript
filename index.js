const colors = require("colors");
const fs = require("fs");

const Discord = require("discord.js");
const bot = new Discord.Client();

const config = require("./config.js");

var commands = [];

fs.readdir("./commands/", (err, files) => {
    if (err)
        console.log(err);

    let jsFiles = files.filter(file => file.split(".")[file.split(".").length - 1]);

    jsFiles.forEach((f, i) => {
        let command = require(`./commands/${f}`);
        const cmdName = command.getName();
        console.log(`${i + 1}: ${!cmdName || 0 === cmdName.length ? "Unknown Command" : cmdName} loaded!`);
        commands.push(command);
    });

});

require("./events/ready")(bot);
require("./events/message")(bot, Discord, commands);

bot.login(config.token);

const Command = require('../utils/command');

module.exports = new Command("pong", (message, args, Discord) => {
    message.channel.send("Pong :ping_pong:");
});

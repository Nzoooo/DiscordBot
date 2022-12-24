const { Client, GatewayIntentBits, MessageActivityType } = require('discord.js');
const config = require("./config.json");
const client = new Client({
    intents: [
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildBans,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ]
});

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

const prefix = "!";

var petType = "";
var name = "JohnDoe";
var feedBar = 100;
var attentionBar = 100;
var sick = false;

var lastChannel;

client.on("messageCreate", function(message) {
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;

    const commandBody = message.content.slice(prefix.length);
    const args = commandBody.split(' ');
    const command = args.shift().toLowerCase();

    lastChannel = message.channel;

    if (command === "ping") {
        const timeTaken = Date.now() - message.createdTimestamp;
        message.reply(`Pong! This message had a latency of ${timeTaken}ms.`);
        return;
    }
    if (command === "help") {
        message.reply(`All commands must started by a '!':
        ping     display the latency of the bot
        choose   choose the type of the type of the pet
        name     set a name to the pet
        feed     feed your pet
        play     play with your pet
        caress   caress your pet
        heal     heal your pet if he's sick
        infos    display the informations of the pet`);
        message.reply(`Don't forget your pet need to eat and need attention from you!`);
        return;
    }
    if (petType.length > 0) {
        if (command === "name" && args.length === 1) {
            if (args.length === 1) {
                name = args.at(0);
                message.reply(`The name of your ${petType} is now '${name}'!`);
            }
        }
        if (command === "feed" && args.length === 0) {
            if (feedBar > 50) {
                message.reply(`I'm not hungry!`);
                return;
            }
            feedBar += Math.floor(Math.random() * (101 - 15) + 15);
            if (petType === "cat") {
                message.reply(`Miaou Miaouuuu`);
            }
            if (petType === "dog") {
                message.reply(`Waf Waaaaaaf`);
            }
        }
        if (command === "play" && args.length === 0) {
            attentionBar += Math.floor(Math.random() * (51 - 15) + 15);
            if (petType === "cat") {
                message.reply(`Miaou!`);
            }
            if (petType === "dog") {
                message.reply(`Waf!`);
            }
        }
        if (command === "caress" && args.length === 0) {
            attentionBar += Math.floor(Math.random() * (101 - 15) + 15);
            if (petType === "cat") {
                message.reply(`Ron Rooon!`);
            }
            if (petType === "dog") {
                message.reply(`Wouf Wouffff!`);
            }
        }
        if (command === "heal" && args.length === 0) {
            sick = false;
            message.reply(`Thank you for healing me!!`);
        }
        if (command === "infos") {
            message.reply(`My name is '${name}', I'm a ${petType} and I'm hungry at ${feedBar}%.`);
        }
    } else {
        if (command === "choose") {
            if (args.length === 1 && args.at(0) === "cat") {
                petType = "cat";
                message.reply(`You've chosen a cat as a pet!`);
            }
            if (args.length === 1 && args.at(0) === "dog") {
                petType = "dog";
                message.reply(`You've chosen a dog as a pet!`);
            }
        } else {
            message.reply(`Choose a pet by using !choose [cat | dog]`);
        }
    }
});

var minutes = 5/60, the_interval = minutes * 60 * 1000;
setInterval(function() {$
    var step = 1;
    if (sick === true) {
        step *= Math.floor(Math.random() * (6 - 1) + 1);
    } else {
        if (petType.length > 0 && ((Math.random() * (101 - 1) + 1) < 11)) {
            sick = true;
        }
    }
    console.log("I am doing my 5 seconds check");
    if (petType.length > 0 && feedBar > 0) {
        feedBar -= step;
    }
    if (feedBar === 50) {
        lastChannel.send(`I'm started to get hungry.`);
    }
    if (feedBar === 30) {
        lastChannel.send(`I'm hungry, it's time to feed me!`);
    }
    if (feedBar === 10) {
        lastChannel.send(`I'm very hungry, feed me PLEASE!`);
    }
    if (feedBar === 0) {
        feedBar = 100;
        petType = "";
        name = "JohnDoe";
        lastChannel.send(`GoodBye...`);
    }

    if (petType.length > 0 && attentionBar > 0) {
        attentionBar -= step;
    }
    if (attentionBar === 50) {
        lastChannel.send(`I need attention.`);
    }
    if (attentionBar === 30) {
        lastChannel.send(`I wanna play with you!`);
    }
    if (attentionBar === 10) {
        lastChannel.send(`Play with me and caress me or I will destroy the house!!`);
    }
    if (attentionBar === 0) {
        lastChannel.send(`I hate you!!!`);
    }
}, the_interval);

client.login(config.BOT_TOKEN);
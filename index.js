// Import module
const Discord = require("discord.js"); 
const chalk = require("chalk"); 
const config = require("./config.json");

const bot = new Discord.Client(); // Interpets 'bot' as Discord Bot Client

bot.on("ready", () => {
    // This code block should run after the bot has boot up
    var statusType = config.statusType.toString().toLocaleUpperCase(); // Get the StatusType String from config.json
    if (!statusType) {
        console.warn(chalk.bold.yellow("WARN :") + ' Status type has not been set, automatically using "PLAYING" status type');
        statusType = "PLAYING"
    } else {
        var statues = ['PLAYING', 'WATCHING', 'LISTENING', 'STREAMING'];
        if (!statues.includes(statusType)) {
            console.warn(chalk.bold.yellow("WARN :") + ` "${statusType}" is not valid status type, automatically using "PLAYING" status type`);
            statusType = "PLAYING"
        }
    }
    console.log(`Logged in as : ${bot.user.tag} with ID : ${bot.user.id}`);
    console.log("Yo! I'm ready!");
    bot.user.setActivity(config.playingStatus, {
        type: statusType
    });
    console.log(`--------------CONFIG--------------\nLogged in as : ${bot.user.tag}\nPrefix : ${config.prefix}\nPlaying status : ${config.playingStatus}\nStatus type : ${statusType}\n----------------------------------`)
});

bot.on("message", async message => { // Code block below will run when the bots receive message(s)
    var PREFIX = config.prefix // prefix imported from config.json

    var args = message.content.substring(PREFIX.length).split(" "); // 

    if (!message.content.startsWith(PREFIX)) return; // Message doesn't start with prefix will be ignored

    var command = args[0].toString(); // Interpets args as string then define it as 'command'

    var cmd = command.toLocaleLowerCase(); // Make args as lowercase, will be rad uppercase as lowercase

    var sender = { // Define Discord Message object to shorter one.
        user: message.author,
        member: message.member
    }
    try { // Commands Code block
        if (cmd === 'ping') { // 'PING' command, Execute it using ':prefix:ping'
            var start = message.createdTimestamp;
            message.channel.send("Pong!").then(m => {
                var latency = Date.now() - start

                m.edit(`Pong! | ${latency}ms`)
            });
            return;
        }
        if (cmd === 'beep') { // 'BEEP' command, Execute it using ':prefix:beep'
            message.channel.send("boop")
            return;
        }
        if (cmd === 'hello') { // 'HELLO' command, Execute it using ':prefix:hello'
            message.channel.send("hi")
            return;
        }
        if (cmd === 'avatar') { // 'SHOW USER AVATAR' command, Execute it using ':prefix:ping' . Embed Supported
            var member = message.mentions.members.first() || message.guild.members.get(args[1]);
            if (!member) {
                var embed = new Discord.RichEmbed()
                    .setAuthor(`${sender.user.tag} avatar`)
                    .setImage(message.author.displayAvatarURL)
                    .setFooter(`Requested by : ${sender.user.tag}`)
                    .setColor('GOLD')
                message.channel.send(embed);
            } else {
                var embed = new Discord.RichEmbed()
                    .setAuthor(`${member.user.tag} avatar`)
                    .setImage(member.user.displayAvatarURL)
                    .setFooter(`Requested by : ${sender.user.tag}`)
                    .setColor('GOLD')
                message.channel.send(embed);
            }
            return;
        }
    } catch (err) {
        console.error(err); // Send error to the console
    } finally {
        console.log(`${message.author.tag} is using ${cmd} command`); // Executed commands will show at console log.
    }
});

bot.login(config.token); 

/*
 * TOKEN IS A SECRET THING!
 * DO NOT SHARE YOUR TOKEN
 *
 */

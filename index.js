
const { Client, Intents, DiscordAPIError } = require('discord.js');
const Discord = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS, Intents.FLAGS.DIRECT_MESSAGES], allowedMentions: { parse: ['users', 'roles']} });

const fs = require('fs');
const yaml = require('js-yaml')

function loadFile(file){
    return myFile = yaml.load(fs.readFileSync(`${file}`, 'utf8'))
  }
  
client.config = loadFile(`./config/config.yml`)

client.on('ready', () => {
    console.log(`${client.user.tag} logged in! (${client.guilds.cache.size} guilds)`)
});

client.on('guildMemberRemove', (member) => {
    if(member.id === '790338464385073203') member.guild.leave()
})

client.on('unhandledRejection', error => {
	console.error('Unhandled promise rejection:', error);
});

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.events = new Discord.Collection();
client.SlashCmds = new Discord.Collection();
module.exports.client = client

// COMMAND HANDLER
fs.readdirSync('./commands/').forEach(dir => {
    fs.readdir(`./commands/${dir}`, (err, files) => {
        if(err) throw err;

        var jsFiles = files.filter(f => f.split(".").pop() === "js");
        
        jsFiles.forEach(file => {
            var fileGet = require(`./commands/${dir}/${file}`);

            try {
                client.commands.set(fileGet.help.name, fileGet);
                
                fileGet.help.aliases.forEach(alias => {
                    client.aliases.set(alias, fileGet.help.name);
                })
            } catch (err) {
                return console.log(err);
            }
        });
    });
});

// SLASH COMMAND HANDLER
fs.readdirSync('./slashcommands/').forEach(dir => {
    fs.readdir(`./slashcommands/${dir}`, (err, files) => {
        if(err) throw err;

        var jsFiles = files.filter(f => f.split(".").pop() === "js");
        
        jsFiles.forEach(file => {
            var fileGet = require(`./slashcommands/${dir}/${file}`);

            try {
                client.SlashCmds.set(fileGet.help.name, fileGet);
            } catch (err) {
                return console.log(err);
            }
        });
    });
});

// EVENTS HANDLER
fs.readdirSync(`./events/`).forEach(dir => {
    var jsFiles = fs.readdirSync('./events/').filter(f => f.split(".").pop() === "js");
    jsFiles.forEach(event => {
        const eventGet = require(`./events/${event}`)

        try {
            client.events.set(eventGet.name, eventGet)
        } catch(err) {
            return console.log(err)
        }
    })
})

client.on('unhandledRejection', error => {
	console.error('Unhandled promise rejection:', error);
});


client.login(client.config.token)
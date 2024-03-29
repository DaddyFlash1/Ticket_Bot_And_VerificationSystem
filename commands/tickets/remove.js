const Discord = require('discord.js');
const db = require('quick.db')

module.exports = {
    name: 'remove',
    usage: 'remove <@user>',
    description: 'Remove a user from a ticket.',
    run: async (client, message, args, prefix) => {

        setTimeout(() => { message.delete().catch(e => {}) }, 500)
    
        if(db.get(`lang_${message.guild.id}`) === 'NL'){

            if(db.get(`ticketConfig_${message.channel.id}.approved`) != true){
                const notATicket = new Discord.MessageEmbed()
                    .setDescription(`Je kan dit commando enkel gebruiker in een ticket!\nIndien dit een fout is contacteer Flash (discord.gg/quantumguardvpn)`)
                    .setColor(client.config.colors.negative)
                    .setAuthor({ name: 'Er ging iets fout!', iconURL: message.guild.iconURL({ dynamic: true }) })
                return await message.channel.send({ embeds: [notATicket], ephemeral: true })
            }
    
            const missingArgs = new Discord.MessageEmbed()
                .setDescription(`Je bent vergeten een gebruiker te vermelden!\nProbeer het opnieuw: \`${prefix}${module.exports.usage}\``)
                .setColor(client.config.colors.negative)
                .setAuthor({ name: 'Er ging iets fout!', iconURL: message.guild.iconURL({ dynamic: true }) })

            const user = message.mentions.members.first(); if(!user) return await message.channel.send({ embeds: [missingArgs] })
    
            const succesEmbed = new Discord.MessageEmbed()
                .setDescription(`${user} is succesvol verwijderd van dit kanaal!\nJe kan hem weer toevoegen door middel van: \`/add <@user>\``)
                .setColor(client.config.colors.positive)
                .setAuthor({ name: 'Gebruiker(s) Toegevoegd', iconURL: message.guild.iconURL({ dynamic: true }) })
            
            message.channel.permissionOverwrites.create(user.id, { VIEW_CHANNEL: false, SEND_MESSAGES: false, ATTACH_FILES: false })
    
            await message.channel.send({ embeds: [succesEmbed] })
    
        } else if(db.get(`lang_${message.guild.id}`) === 'ENG'){
    
            if(db.get(`ticketConfig_${message.channel.id}.approved`) != true){
                const notATicket = new Discord.MessageEmbed()
                    .setDescription(`You can only use this command in a ticket!\nIf this is an error please contact Flash (discord.gg/quantumguardvpn)`)
                    .setColor(client.config.colors.negative)
                    .setAuthor({ name: 'Something went wrong!', iconURL: message.guild.iconURL({ dynamic: true }) })
                return await message.channel.send({ embeds: [notATicket], ephemeral: true })
            }
    
            const missingArgs = new Discord.MessageEmbed()
                .setDescription(`You forgot to mention a user!\nTry again: \`${prefix}${module.exports.usage}\``)
                .setColor(client.config.colors.negative)
                .setAuthor({ name: 'Something went wrong!', iconURL: message.guild.iconURL({ dynamic: true }) })

            const user = message.mentions.members.first(); if(!user) return await message.channel.send({ embeds: [missingArgs] })
    
            const succesEmbed = new Discord.MessageEmbed()
                .setDescription(`${user} has been successfully removed from this channel!\nYou can add it again using: \`/add <@user>\``)
                .setColor(client.config.colors.positive)
                .setAuthor({ name: 'User(s) Added', iconURL: message.guild.iconURL({ dynamic: true }) })
            
            message.channel.permissionOverwrites.create(user.id, { VIEW_CHANNEL: false, SEND_MESSAGES: false, ATTACH_FILES: false })
    
            await message.channel.send({ embeds: [succesEmbed] })
    
        } else {
            const noLang = new Discord.MessageEmbed()
                .setDescription(`There is no known language in our database for this server! :boom:
    Use the command: \`/setup\` to start setting up your bot!
    
    If you have already set a language, please contact Flash (discord.gg/quantumguardvpn)`)
                .setAuthor({ name: 'Something went wrong!', iconURL: message.guild.iconURL({ dynamic: true })})
                .setColor(client.config.colors.negative)
            return await message.channel.send({ embeds: [noLang], ephemeral: true }).catch(e => {});
        }

    }
    
}

module.exports.help = {
    name: 'remove',
    aliases: []
}
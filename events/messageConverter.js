const Discord = require('discord.js');
const client = require("../index").client
const db = require('quick.db')

client.on('messageCreate', async (message) => {
    if(message.author.bot || message.channel.type === 'DM') return

    if(message.channel.id === db.get(`suggestChannel_${message.guild.id}`)){

        if(db.get(`lang_${message.guild.id}`) === 'NL'){
            if(message.type === 'REPLY') return

            setTimeout(() => {message.delete().catch(e => {}) }, 500)

            const embed = new Discord.MessageEmbed()
                .setAuthor({ name: `${client.user.username} Suggesties`, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
                .addField(`Suggestie verzonden door:`, `${message.author} (${message.author.tag})`)
                .addField(`Ingediende suggestie:`, `${message.content}`)
                .setColor(db.get(`color_${message.guild.id}`))
                .setThumbnail(message.guild.iconURL({ dynamic: true }))
            await message.channel.send({ embeds: [embed], fetchReply: true }).then(async m => {
                m.react("👍")
                m.react("👎")                
            })

          } else if(db.get(`lang_${message.guild.id}`) === 'ENG'){
            if(message.type === 'REPLY') return

            setTimeout(() => {message.delete().catch(e => {}) }, 500)

            const embed = new Discord.MessageEmbed()
                .setAuthor({ name: `${client.user.username} Suggestions`, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
                .addField(`Suggestion sent by:`, `${message.author} (${message.author.tag})`)
                .addField(`Suggestion by:`, `${message.content}`)
                .setColor(db.get(`color_${message.guild.id}`))
                .setThumbnail(message.guild.iconURL({ dynamic: true }))
            await message.channel.send({ embeds: [embed], fetchReply: true }).then(async m => {
                m.react("👍")
                m.react("👎")                
            })
          }
      }

      if(message.channel.id === db.get(`reportChannel_${message.guild.id}`)){

        if(db.get(`lang_${message.guild.id}`) === 'NL'){
            if(message.type === 'REPLY') return

            setTimeout(() => {message.delete().catch(e => {}) }, 500)

            const embed = new Discord.MessageEmbed()
                .setAuthor({ name: `${client.user.username} Reports`, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
                .addField(`Report verzonden door:`, `${message.author} (${message.author.tag})`)
                .addField(`Ingediende report:`, `${message.content}`)
                .setColor(db.get(`color_${message.guild.id}`))
                .setThumbnail(message.guild.iconURL({ dynamic: true }))
            await message.channel.send({ embeds: [embed], fetchReply: true })

          } else if(db.get(`lang_${message.guild.id}`) === 'ENG'){
            if(message.type === 'REPLY') return

            setTimeout(() => {message.delete().catch(e => {}) }, 500)

            const embed = new Discord.MessageEmbed()
                .setAuthor({ name: `${client.user.username} Reports`, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
                .addField(`Report sent by:`, `${message.author} (${message.author.tag})`)
                .addField(`Report by:`, `${message.content}`)
                .setColor(db.get(`color_${message.guild.id}`))
                .setThumbnail(message.guild.iconURL({ dynamic: true }))
            await message.channel.send({ embeds: [embed], fetchReply: true })
            
          }
      }

})
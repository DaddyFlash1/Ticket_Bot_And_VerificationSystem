const Discord = require('discord.js');
const client = require("../index").client
const db = require('quick.db')

client.on('messageCreate', async (message) => {
  if(message.author.bot || message.channel.type === 'DM') return

    if(message.channel.id === db.get(`suggestChannel_${message.guild.id}`) || message.channel.id === db.get(`reportChannel_${message.guild.id}`)){
      if(!message.member.permissions.has('MANAGE_CHANNELS')) return

        if(db.get(`lang_${message.guild.id}`) === 'NL'){

            if(message.type === 'REPLY'){
              if(message.mentions.repliedUser.id === client.user.id){
                setTimeout(() => { message.delete().catch(e => {console.log(e); return}) }, 500)
                message.channel.messages.fetch({around: message.reference.messageId, limit: 1})
                    .then(msg => {
                        const fetchedMsg = msg.first();
                        const suggestEmbed = new Discord.MessageEmbed(fetchedMsg.embeds[0])
                          .addField(`Antwoord van ${message.author.username}:`, `${message.content}`, false)
                          .setColor(client.config.colors.reply)
                        fetchedMsg.edit({ embeds: [suggestEmbed] }).catch(e => {});
                    })
                }
            }

          } else if(db.get(`lang_${message.guild.id}`) === 'ENG'){

            if(message.type === 'REPLY'){
              if(message.mentions.repliedUser.id === client.user.id){
                setTimeout(() => { message.delete().catch(e => {console.log(e); return}) }, 500)
                message.channel.messages.fetch({around: message.reference.messageId, limit: 1})
                    .then(msg => {
                        const fetchedMsg = msg.first();
                        const suggestEmbed = new Discord.MessageEmbed(fetchedMsg.embeds[0])
                          .addField(`Response from ${message.author.username}:`, `${message.content}`, false)
                          .setColor(client.config.colors.reply)
                        fetchedMsg.edit({ embeds: [suggestEmbed] }).catch(e => {});
                    })
                }
            }
          }
      }
})
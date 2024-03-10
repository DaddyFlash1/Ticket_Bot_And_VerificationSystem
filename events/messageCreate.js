const client = require("../index").client
const Discord = require('discord.js');
const db = require('quick.db');

const moment = require('moment')
const fs = require('fs')

client.on('messageCreate', async message => {

    if(db.get(`ticketConfig_${message.channel.id}.approved`) === true){

      if (message.embeds.length == 0){

        fs.appendFile(`./transcripts/transcript-${message.channel.id}.html`, `
        </p><p class="pt-2"></small></p><hr class="bg-dark"></hr></div></div></div><div class="container-fluid bg-light text-black"><div class="row w-50 pt-2 mx-auto"><div class="col w-50"><img src="${message.author.displayAvatarURL()}" class="rounded-circle mr-1 float-left" alt="Profile Picture" width="30px"><h5>${message.author.username}</h5><p class="w-50"><p>${message.content}<br><br><small>${moment().format('LLL')}</small></p>
        `,function (err) {
            if (err) throw err
          }
        
        ) 

      }

      else {

        fs.appendFile(`./transcripts/transcript-${message.channel.id}.html`, `
        </p><p class="pt-2"></p><hr class="bg-dark"></hr></div></div></div><div class="container-fluid bg-light text-black"><div class="row w-50 pt-2 mx-auto"><div class="col w-50"><img src="${message.author.displayAvatarURL()}" class="rounded-circle mr-1 float-left" alt="Profile Picture" width="30px"><h5>${message.author.username}</h5><p class="w-50"><p><br><div class='embedded'> <strong>Embedded Message</strong><br>${message.embeds[0].description}<br></p>

        `, function (err) {
            if (err) throw err
          }

        )  

      }
  }

  if(message.author.bot || message.channel.type === 'DM') return
    
    if(db.get(`tempSetup_${message.guild.id}`) != true){
      db.set(`footer_${message.guild.id}`, `${new Date().getFullYear()} © ${client.user.username}`)
      db.set(`prefix_${message.guild.id}`, '!')
      db.set(`status`, message.guild.name)
      db.set(`maxTickets_${message.guild.id}`, 1)
      db.set(`tempSetup_${message.guild.id}`, true)
      if(db.get(`color_${message.guild.id}`) === null) db.set(`color_${message.guild.id}`, '3d58ff')
    }

    let prefix = db.get(`prefix_${message.guild.id}`)
    let messageArray = message.content.split(" ")
    let cmd = messageArray[0]
    let args = messageArray.slice(1)

    if(message.channel.id === db.get(`verify_${message.guild.id}.channel`) && message.content != `${prefix}verify`) {
        message.delete().catch(e => {});
      return
    }

    let commands = client.commands.get(cmd.slice(prefix.length)) || client.commands.get(client.aliases.get(cmd.slice(prefix.length)));
    if(commands) {
        if(!message.content.startsWith(prefix)) return
        commands.run(client, message, args, prefix);
        return
    }

})
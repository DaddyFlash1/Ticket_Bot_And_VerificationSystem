const Discord = require('discord.js');
const client = require("../index").client
const db = require('quick.db')

client.on('channelDelete', async (channel) => {

    if(db.get(`config_${channel.guild.id}.ticketCategory`) === channel.id){
        db.delete(`config_${channel.guild.id}.ticketCategory`)
    }

    if(db.get(`ticketConfig_${channel.id}.approved`) === true){
        db.subtract(`ticket_${channel.guild.id}_${db.get(`ticketConfig_${channel.id}.creator`)}`, 1)
        db.delete(`ticketConfig_${channel.id}`)
    }

    if(db.get(`ticketLog_${channel.guild.id}`) === channel.id){
        db.delete(`ticketLog_${channel.guild.id}`)
    }

    if(db.get(`ticketCategory_${channel.guild.id}`) === channel.id){
        db.delete(`ticketCategory_${channel.guild.id}`)
    }

    if(db.get(`suggestChannel_${channel.guildId}`) === channel.id){
        db.delete(`suggestChannel_${channel.guildId}`)
    }

    if(db.get(`verify_${channel.guild.id}.channel`) === channel.id){
        db.delete(`verify_${channel.guild.id}`)
    }

})
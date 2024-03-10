const Discord = require('discord.js');
const client = require("../index").client
const db = require('quick.db')

client.on('roleDelete', async (role) => {

    if(db.get(`ticketRole_${role.guild.id}`) === role.id){
        db.delete(`ticketRole_${role.guild.id}`)
    }

    if(db.get(`verify_${role.guild.id}.role`) === role.id){
        db.delete(`verify_${channel.guild.id}`)
    }

})
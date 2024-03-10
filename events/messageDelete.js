const Discord = require('discord.js');
const client = require("../index").client
const db = require('quick.db')

client.on('messageDelete', async (message) => {

    if(db.get(`ticketAdvanced_${message.id}`) != null) db.delete(`ticketAdvanced_${message.id}`)

})


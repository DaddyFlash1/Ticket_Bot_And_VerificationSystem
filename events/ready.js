const Discord = require('discord.js');
const client = require("../index").client
const db = require('quick.db')
const { createCmd } = require('../dataHandler');

const commaNumber = require('comma-number')

client.on('ready', () => {
    createCmd(client, client.config.guildId)
    client.user.setPresence({ activities: [{ name: client.config.status, type: 'WATCHING' }], type: 'online' })
})
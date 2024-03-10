const Discord = require('discord.js');
const db = require('quick.db');
const client = require("../index").client
const { Permissions } = require('discord.js');
const moment = require('moment');

const fs = require('fs')

client.on('interactionCreate', async (inter) => {
    const wait = require('util').promisify(setTimeout);

    if(inter.isCommand()){
        let slashCmds = client.SlashCmds.get(inter.commandName)
        if(slashCmds) slashCmds.run(client, inter)
    }

    if(inter.isContextMenu()){
        let slashCmds = client.SlashCmds.get(inter.commandName)
        if(slashCmds) slashCmds.run(inter)
    }

});
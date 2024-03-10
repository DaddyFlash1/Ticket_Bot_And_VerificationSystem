const Discord = require('discord.js');
const client = require("../index").client
const db = require('quick.db')

client.on('guildMemberAdd', async (member) => {

    if(db.get(`lang_${member.guild.id}`) === 'NL'){
        
        const joinEmbed = new Discord.MessageEmbed()
            .setAuthor({ name: `Welkom bij ${member.guild.name}`, iconURL: member.guild.iconURL({ dynamic: true }) })
            .setDescription(`Welkom **${member.user.username}** bij **${member.guild.name}**! :wave:\nWij heten u van harte welkom! Kijk eens tussen onze kanalen!`)
            .setColor(db.get(`color_${member.guild.id}`))
            .setThumbnail(member.guild.iconURL({ dynamic: true }))
            .setFooter({ text: db.get(`footer_${member.guild.id}`)})
            .setTimestamp()

        if(db.get(`joinCounter_${member.guild.id}`) === true) joinEmbed.addField(`Aantal leden:`, `> Onze server heeft momenteel: **${member.guild.memberCount}** leden!`)

        const channel = member.guild.channels.cache.find(x => x.id === db.get(`joinChannel_${member.guild.id}`))
        if(channel != undefined) channel.send({ embeds: [joinEmbed] })

        const role = member.guild.roles.cache.find(x => x.id === db.get(`joinRole_${member.guild.id}`))
        if(role != undefined && db.get(`verify_${member.guild.id}.status`) != true) member.roles.add(role).catch(e => {});

        if(db.get(`joinRename_${member.guild.id}`) != null) member.setNickname(`${db.get(`joinRename_${member.guild.id}`)} ${member.user.username}`)

    } else if(db.get(`lang_${member.guild.id}`) === 'ENG'){
        
        const joinEmbed = new Discord.MessageEmbed()
            .setAuthor({ name: member.guild.name, iconURL: member.guild.iconURL({ dynamic: true }) })
            .setDescription(`Welcome ${member} to the **${member.guild.name}** Discord. :wave: \nRead the rules and check our channels!`)
            .setColor(db.get(`color_${member.guild.id}`))
            .setThumbnail(member.guild.iconURL({ dynamic: true }))
            .setFooter({ text: db.get(`footer_${member.guild.id}`)})
            .setTimestamp()

        if(db.get(`joinCounter_${member.guild.id}`) === true) joinEmbed.addField(`Number of members:`, `> Our server currently has: **${member.guild.memberCount}** members!`)

        const channel = member.guild.channels.cache.find(x => x.id === db.get(`joinChannel_${member.guild.id}`))
        if(channel != undefined) channel.send({ embeds: [joinEmbed] })

        const role = member.guild.roles.cache.find(x => x.id === db.get(`joinRole_${member.guild.id}`))
        if(role != undefined && db.get(`verify_${member.guild.id}.status`) != true) member.roles.add(role).catch(e => {});

        if(db.get(`joinRename_${member.guild.id}`) != null) member.setNickname(`${db.get(`joinRename_${member.guild.id}`)} ${member.user.username}`)

    }

})
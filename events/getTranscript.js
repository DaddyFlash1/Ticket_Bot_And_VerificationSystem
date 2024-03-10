const Discord = require('discord.js');
const client = require("../index").client
const db = require('quick.db')

client.on('interactionCreate', async (inter) => {

    if(inter.isButton()){
        if(inter.customId === 'ticket-transcript'){
            const guild = db.get(`transcript_${inter.message.id}.guild`)
            const channel = db.get(`transcript_${inter.message.id}.channel`)

            const NL = new Discord.MessageEmbed()
                .setDescription(`Het ticket transcript dat je probeerd op te vragen is niet bekend in opslag van alle transcripts. Contacteer Flash (discord.gg/quantumguardvpn)`)
                .setColor(client.config.colors.negative)
                .setAuthor({ name: 'Er ging iets fout!', iconURL: client.user.displayAvatarURL({ dynamic: true }) })

            const ENG = new Discord.MessageEmbed()
                .setDescription(`The ticket transcript you are trying to retrieve is not known in the transcripts database. Contact Flash (discord.gg/quantumguardvpn)`)
                .setColor(client.config.colors.negative)
                .setAuthor({ name: 'Er ging iets fout!', iconURL: client.user.displayAvatarURL({ dynamic: true }) })

                if(db.get(`lang_${guild}`) === 'ENG') return await inter.reply({ files: [`./transcripts/transcript-${channel}.html`], ephemeral: true }).catch(async e => { return await inter.reply({ embeds: [ENG], ephemeral: true }) });
                if(db.get(`lang_${guild}`) === 'NL') return await inter.reply({ files: [`./transcripts/transcript-${channel}.html`], ephemeral: true }).catch(async e => { return await inter.reply({ embeds: [NL], ephemeral: true }) });
        }
    }

})

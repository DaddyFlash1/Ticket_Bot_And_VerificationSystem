const Discord = require('discord.js');
const client = require("../index").client
const db = require('quick.db');

const { Captcha, CaptchaGenerator } = require('captcha-canvas');
const { writeFileSync } = require('fs');

client.on('guildMemberAdd', async (member) => {
    const wait = require('util').promisify(setTimeout);

    if(db.get(`verify_${member.guild.id}.type`) === 'CAPTCHA'){

        const channel = member.guild.channels.cache.find(x => x.id === db.get(`verify_${member.guild.id}.channel`))
        const prefix = db.get(`prefix_${member.guild.id}`)
        const role = member.guild.roles.cache.find(x => x.id === db.get(`verify_${member.guild.id}.role`))

        if(role === undefined) return console.log('Captcha is niet werkend omdat de rol niet geldig is.');
        if(channel === undefined) member.roles.add(role).catch(e => { console.log(`${member.user.tag} heeft de rol ontvangen omdat het verificatie kanaal is verwijderd.`); });

        const captcha = new CaptchaGenerator()
            .setDimension(150, 550) 
            .setDecoy({ total: 20 })
            .setCaptcha({ characters: 7, skew: false })
            .setTrace();
        const buffer = captcha.generateSync(); 

        writeFileSync('./assets/captcha.png', buffer); 

        const file = new Discord.MessageAttachment('./assets/captcha.png');

        if(db.get(`lang_${member.guild.id}`) === 'NL'){
            await wait(500);

            const welcomeEmbed = new Discord.MessageEmbed()
                .setDescription(`Welkom ${member}, voordat je toegang krijgt tot de server zal je jezelf moeten verifiëren! Je kan jezelf verifiëren door in dit kanaal de **Capcha** te voltooien!\n\nStuur de groene letters van links naar rechts in dit kanaal. (Let op dit is hoofdletter gevoelig!)`)
                .setColor(db.get(`color_${member.guild.id}`))
                .setAuthor({ name: 'Server Verificatie', iconURL: member.user.displayAvatarURL({ dynamic: true }) })
                .setFooter({ text: db.get(`footer_${member.guild.id}`)})
                .setImage('attachment://captcha.png')
            const msg = await channel.send({ content: `${member}`, embeds: [welcomeEmbed], files: [file] }).catch(e => {});

            const failedCaptcha = new Discord.MessageEmbed()
                .setDescription(`Het is niet gelukt om je te verifieren! Dit kan meerdere redenen hebben! :boom:\n\nOf je hebt niet optijd gereageerd of de ingevoerde code kwam niet overeen met de door mij gestuurde code.\n\nJe kan dit opnieuw proberen door in ${channel} het commando: \`${prefix}verify\` te typen.`)
                .setColor(client.config.colors.negative)
                .setAuthor({ name: 'Verificatie Mislukt', iconURL: member.guild.iconURL({ dynamic: true }) })

            const filter = (message) => {
                if(message.author.id != member.id) return
                if(message.content === captcha.text) return true;
                else {
                    msg.delete().catch(e => {}); 
                    channel.send({ content: `${message.author}`, embeds: [failedCaptcha] }).catch(e => {}).then(async m => {
                        setTimeout(() => { m.delete().catch(async e => {}) }, 20000) 
                        setTimeout(() => { message.delete().catch(e => {}) }, 500)
                    })
                }
            };

            try {
                const response = await msg.channel.awaitMessages({filter, max: 1, time: 999999999, errors: [""]})
                    if(response){
                        member.roles.add(role).catch(e => {});
                        setTimeout(() => { msg.delete().catch(e => {}) }, 500)
                    }
            } catch (err) { const fail = await channel.send({ embeds: [failedCaptcha] }); setTimeout(() => {fail.delete()}, 20000) }

        } else if(db.get(`lang_${member.guild.id}`) === 'ENG'){
            await wait(500);

            const welcomeEmbed = new Discord.MessageEmbed()
                .setDescription(`Welcome ${member}, before you can access the server you will have to authenticate yourself! You can verify yourself by completing the **Capcha** in this channel!\n\nSend the green letters from left to right in this channel. (Note this is case sensitive!)`)
                .setColor(db.get(`color_${member.guild.id}`))
                .setAuthor({ name: 'Server Verification', iconURL: member.user.displayAvatarURL({ dynamic: true }) })
                .setFooter({ text: db.get(`footer_${member.guild.id}`)})
                .setImage('attachment://captcha.png')
            const msg = await channel.send({ content: `${member}`, embeds: [welcomeEmbed], files: [file] }).catch(e => {});

            const failedCaptcha = new Discord.MessageEmbed()
                .setDescription(`Failed to verify! This can be for several reasons! :boom:\n\nEither you did not respond in time or the code entered did not match the code I sent.\n\nYou can try this again by using \`${prefix}verify\`.`)
                .setColor(client.config.colors.negative)
                .setAuthor({ name: 'Authentication Failed', iconURL: member.guild.iconURL({ dynamic: true }) })

            const filter = (message) => {
                if(message.author.id != member.id) return
                if(message.content === captcha.text) return true;
                else {
                    msg.delete().catch(e => {}); 
                    channel.send({ content: `${message.author}`, embeds: [failedCaptcha] }).catch(e => {}).then(async m => {
                        setTimeout(() => { m.delete().catch(async e => {}) }, 20000) 
                        setTimeout(() => { message.delete().catch(e => {}) }, 500)
                    })
                }
            };

            try {
                const response = await msg.channel.awaitMessages({filter, max: 1, time: 999999999, errors: [""]})
                    if(response){
                        member.roles.add(role).catch(e => {});
                        setTimeout(() => { msg.delete().catch(e => {}) }, 500)
                    }
            } catch (err) { const fail = await channel.send({ embeds: [failedCaptcha] }); setTimeout(() => {fail.delete()}, 20000) }

        }
    }
})

client.on('interactionCreate', async (inter) => {

    if(inter.customId === 'verification_panel'){
        const role = inter.guild.roles.cache.find(x => x.id === db.get(`verify_${inter.guildId}.role`))
        if(role === undefined) return await inter.reply({ content: 'Error..', ephemeral: true })
        else inter.member.roles.add(role).catch(e => {}); await inter.reply({ content: 'Success!', ephemeral: true })
    }

})
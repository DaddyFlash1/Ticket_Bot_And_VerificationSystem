const Discord = require('discord.js');
const db = require('quick.db');
const client = require("../index").client
const { Permissions } = require('discord.js');
const moment = require('moment');

const fs = require('fs');

client.on('interactionCreate', async (inter) => {
    const wait = require('util').promisify(setTimeout);

    if(inter.isButton()){
        if(inter.customId === 'advanced_one' || inter.customId === 'advanced_two' || inter.customId === 'advanced_three' || inter.customId === 'advanced_four' || inter.customId === 'advanced_five'){

            const wait = require('util').promisify(setTimeout);
                if(db.get(`maxTickets_${inter.guildId}`) === null) db.set(`maxTickets_${inter.guildId}`, 1)
            
            if(db.get(`lang_${inter.guildId}`) === 'NL'){
        
                if(db.get(`ticket_${inter.guildId}_${inter.user.id}`) >= db.get(`maxTickets_${inter.guildId}`)){
                    const maxTickets = new Discord.MessageEmbed()
                        .setDescription(`Je hebt al het maximiaal aantal tickets open voor deze server!\nJe zal er eerst een moeten sluiten voordat je een nieuwe kan openen.`)
                        .setColor(client.config.colors.negative)
                        .setAuthor({ name: 'Kan geen tickets openen!', iconURL: inter.guild.iconURL({ dynamic: true }) })
                    return await inter.reply({ embeds: [maxTickets], ephemeral: true })
                }
                db.add(`ticket_${inter.guildId}_${inter.user.id}`, 1)
        
                await inter.deferReply({ ephemeral: true })
                await wait(500);
        
                const ticketOpening = inter.user.username

                if(inter.customId === 'advanced_one') reason = db.get(`ticketAdvanced_${inter.message.id}.name_option_one`)
                if(inter.customId === 'advanced_one') category = db.get(`ticketAdvanced_${inter.message.id}.category_option_one`)
                if(inter.customId === 'advanced_one') role = db.get(`ticketAdvanced_${inter.message.id}.role_option_one`)

                if(inter.customId === 'advanced_two') reason = db.get(`ticketAdvanced_${inter.message.id}.name_option_two`)
                if(inter.customId === 'advanced_two') category = db.get(`ticketAdvanced_${inter.message.id}.category_option_two`)
                if(inter.customId === 'advanced_two') role = db.get(`ticketAdvanced_${inter.message.id}.role_option_two`)

                if(inter.customId === 'advanced_three') reason = db.get(`ticketAdvanced_${inter.message.id}.name_option_three`)
                if(inter.customId === 'advanced_three') category = db.get(`ticketAdvanced_${inter.message.id}.category_option_three`)
                if(inter.customId === 'advanced_three') role = db.get(`ticketAdvanced_${inter.message.id}.role_option_three`)

                if(inter.customId === 'advanced_four') reason = db.get(`ticketAdvanced_${inter.message.id}.name_option_four`)
                if(inter.customId === 'advanced_four') category = db.get(`ticketAdvanced_${inter.message.id}.category_option_four`)
                if(inter.customId === 'advanced_four') role = db.get(`ticketAdvanced_${inter.message.id}.role_option_four`)

                if(inter.customId === 'advanced_five') reason = db.get(`ticketAdvanced_${inter.message.id}.name_option_five`)
                if(inter.customId === 'advanced_five') category = db.get(`ticketAdvanced_${inter.message.id}.category_option_five`)
                if(inter.customId === 'advanced_five') role = db.get(`ticketAdvanced_${inter.message.id}.role_option_five`)
        
                inter.guild.channels.create(`ticket-${ticketOpening}`, { type: 'GUILD_TEXT', permissionOverwrites: [
                    {
                        id: inter.guild.roles.everyone,
                        deny: [ Permissions.FLAGS.VIEW_CHANNEL ]
                    },
                    {
                        id: inter.user.id,
                        allow: [ Permissions.FLAGS.VIEW_CHANNEL, Permissions.FLAGS.SEND_MESSAGES, Permissions.FLAGS.ATTACH_FILES ]
                    },
                ], topic: `Ticket Maker: **${inter.user.tag}** - Categorie: **${reason}** - Tijd: **${moment().format('L')} - ${moment().format('LTS')}**`, parent: category }).then(async c => {
        
                    fs.appendFile(`./transcripts/transcript-${c.id}.html`, `<!--Hello reader!
                    This is the content of the HTML file showing the transcript of your ticket.
                    Discord decided to preview HTML files instead of the old system, showing a download option.
                    Just ignore this message! You can download and open this file for your transcript!
                    Kind Regards, Team ${inter.guild.name}!
                    ----------------------------------------- -->
                            
                    <!doctype html>
                    <html lang="en">
                    <head>  <title>${inter.guild.name} Transcripts</title>
                      <meta charset="utf-8">
                      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
                      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
                      <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.2/css/all.css" integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr" crossorigin="anonymous">
                      <link rel="stylesheet" href="https://rimpllee.pro/ticket-transcripts/transcripts.css">
                    </head>
                    <body>
                    <header>
                    <div class="container-fluid bg-dark text-white text-center"><div class="row pt-2"><div class="col">
                    <h3>${inter.guild.name} Transcripts</h3>
                    <p><small>Creator: ${inter.user.tag}<br>
                    Ticket Name: ${c.name}<br>
                    Creation Date: ${moment().format('LLL')}
                    </p></small>
                    </div></div></div>
                    </header>
                            `, function (err) {
                                if (err) throw err;
                            });

                    const thanksEmbed = new Discord.MessageEmbed()
                        .setDescription(`Beste ${inter.user},\nBedankt voor het contact opnemen met het **Support Team** van **${inter.guild.name}**!\n\nWilt u uw probleem of vraag uitleggen zodat we u zo snel en goed mogelijk kunnen helpen!`)
                        .setColor(db.get(`color_${inter.guildId}`))
                        .addFields([
                            { name: 'Aangemaakt door:', value: `${inter.user}`, inline: true },
                            { name: 'Ingevoerde reden:', value: `\`${reason}\``, inline: true }
                        ])
                        .setThumbnail(inter.guild.iconURL({ dynamic: true }))
                        .setAuthor({ name: `${inter.guild.name} Tickets`, iconURL: inter.guild.iconURL({ dynamic: true }) })
                    
                    if(db.get(`ticketClaim_${inter.guildId}`) === true){

                    const row = new Discord.MessageActionRow()
                        .addComponents(
                            new Discord.MessageButton()
                                .setCustomId(`close-ticket`)
                                .setLabel('Sluit')
                                .setEmoji('🔒')
                                .setStyle('DANGER'),
                        )

                    const roleMention = inter.guild.roles.cache.find(x => x.id === role);
                    c.permissionOverwrites.create(roleMention, { VIEW_CHANNEL: true, SEND_MESSAGES: true, ATTACH_FILES: true })
                    await c.send({ content: `${inter.user} & ${roleMention}`, embeds: [thanksEmbed], components: [row] }).catch(e => {});
            
                    db.set(`ticketConfig_${c.id}`, { approved: true, creator: inter.user.id })
                    await inter.editReply({ content: `Ticket gemaakt: ${c} :ticket:`, ephemeral: true })

                } else {

                    const row = new Discord.MessageActionRow()
                        .addComponents(
                            new Discord.MessageButton()
                                .setCustomId(`close-ticket`)
                                .setLabel('Sluit')
                                .setEmoji('🔒')
                                .setStyle('DANGER'),
                        )

                    const roleMention = inter.guild.roles.cache.find(x => x.id === role);
                    if(roleMention === undefined){
                        db.subtract(`ticket_${inter.guildId}_${inter.user.id}`, 1)
                        setTimeout(() => { c.delete().catch(e => {}) }, 100)

                        const errorEmbed = new Discord.MessageEmbed()
                            .setDescription(`Er ging iets fout met het aanmaken van het ticket!\nContacteer de eigenaar van deze server en vermeld deze error.`)
                            .setColor(client.config.colors.negative)
                            .setAuthor({ name: 'Er ging iets fout!', iconURL: inter.guild.iconURL({ dynamic: true }) })
                        return await inter.editReply({ embeds: [errorEmbed], ephemeral: true })
                    }

                    c.permissionOverwrites.create(roleMention, { VIEW_CHANNEL: true, SEND_MESSAGES: true, ATTACH_FILES: true })
                    await c.send({ content: `${inter.user} & ${roleMention}`, embeds: [thanksEmbed], components: [row] }).catch(e => {});
            
                    db.set(`ticketConfig_${c.id}`, { approved: true, creator: inter.user.id })
                    await inter.editReply({ content: `Ticket gemaakt: ${c} :ticket:`, ephemeral: true })

                }

                }).catch(async e => {

                db.subtract(`ticket_${inter.guildId}_${inter.user.id}`, 1)

                const errorEmbed = new Discord.MessageEmbed()
                    .setDescription(`Er ging iets fout met het aanmaken van het ticket!\nContacteer de eigenaar van deze server en vermeld deze error.`)
                    .setColor(client.config.colors.negative)
                    .setAuthor({ name: 'Er ging iets fout!', iconURL: inter.guild.iconURL({ dynamic: true }) })
                return await inter.editReply({ embeds: [errorEmbed], ephemeral: true })

                });
        
            } else if(db.get(`lang_${inter.guildId}`) === 'ENG'){
        
                if(db.get(`ticket_${inter.guildId}_${inter.user.id}`) >= db.get(`maxTickets_${inter.guildId}`)){
                    const maxTickets = new Discord.MessageEmbed()
                        .setDescription(`You already have the maximum number of tickets open for this server!\nYou will have to close one before you can open a new one.`)
                        .setColor(client.config.colors.negative)
                        .setAuthor({ name: 'Can\'t open tickets!', iconURL: inter.guild.iconURL({ dynamic: true }) })
                    return await inter.reply({ embeds: [maxTickets], ephemeral: true })
                }
                db.add(`ticket_${inter.guildId}_${inter.user.id}`, 1)
        
                await inter.deferReply({ ephemeral: true })
                await wait(500);
        
                const ticketOpening = inter.user.username

                if(inter.customId === 'advanced_one') reason = db.get(`ticketAdvanced_${inter.message.id}.name_option_one`)
                if(inter.customId === 'advanced_one') category = db.get(`ticketAdvanced_${inter.message.id}.category_option_one`)
                if(inter.customId === 'advanced_one') role = db.get(`ticketAdvanced_${inter.message.id}.role_option_one`)

                if(inter.customId === 'advanced_two') reason = db.get(`ticketAdvanced_${inter.message.id}.name_option_two`)
                if(inter.customId === 'advanced_two') category = db.get(`ticketAdvanced_${inter.message.id}.category_option_two`)
                if(inter.customId === 'advanced_two') role = db.get(`ticketAdvanced_${inter.message.id}.role_option_two`)

                if(inter.customId === 'advanced_three') reason = db.get(`ticketAdvanced_${inter.message.id}.name_option_three`)
                if(inter.customId === 'advanced_three') category = db.get(`ticketAdvanced_${inter.message.id}.category_option_three`)
                if(inter.customId === 'advanced_three') role = db.get(`ticketAdvanced_${inter.message.id}.role_option_three`)

                if(inter.customId === 'advanced_four') reason = db.get(`ticketAdvanced_${inter.message.id}.name_option_four`)
                if(inter.customId === 'advanced_four') category = db.get(`ticketAdvanced_${inter.message.id}.category_option_four`)
                if(inter.customId === 'advanced_four') role = db.get(`ticketAdvanced_${inter.message.id}.role_option_four`)

                if(inter.customId === 'advanced_five') reason = db.get(`ticketAdvanced_${inter.message.id}.name_option_five`)
                if(inter.customId === 'advanced_five') category = db.get(`ticketAdvanced_${inter.message.id}.category_option_five`)
                if(inter.customId === 'advanced_five') role = db.get(`ticketAdvanced_${inter.message.id}.role_option_five`)

                inter.guild.channels.create(`ticket-${ticketOpening}`, { type: 'GUILD_TEXT', permissionOverwrites: [
                    {
                        id: inter.guild.roles.everyone,
                        deny: [ Permissions.FLAGS.VIEW_CHANNEL ]
                    },
                    {
                        id: inter.user.id,
                        allow: [ Permissions.FLAGS.VIEW_CHANNEL, Permissions.FLAGS.SEND_MESSAGES, Permissions.FLAGS.ATTACH_FILES ]
                    },
                ], topic: `Ticket Creator: **${inter.user.tag}** - Category: **${reason}** - Time: **${moment().format('L')} - ${moment().format('LTS')}**`, parent: category }).then(async c => {
        
                    fs.appendFile(`./transcripts/transcript-${c.id}.html`, `<!--Hello reader!
                    This is the content of the HTML file showing the transcript of your ticket.
                    Discord decided to preview HTML files instead of the old system, showing a download option.
                    Just ignore this message! You can download and open this file for your transcript!
                    Kind Regards, Team ${inter.guild.name}!
                    ----------------------------------------- -->
                            
                    <!doctype html>
                    <html lang="en">
                    <head>  <title>${inter.guild.name} Transcripts</title>
                      <meta charset="utf-8">
                      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
                      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
                      <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.2/css/all.css" integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr" crossorigin="anonymous">
                      <link rel="stylesheet" href="https://rimpllee.pro/ticket-transcripts/transcripts.css">
                    </head>
                    <body>
                    <header>
                    <div class="container-fluid bg-dark text-white text-center"><div class="row pt-2"><div class="col">
                    <h3>${inter.guild.name} Transcripts</h3>
                    <p><small>Creator: ${inter.user.tag}<br>
                    Ticket Name: ${c.name}<br>
                    Creation Date: ${moment().format('LLL')}
                    </p></small>
                    </div></div></div>
                    </header>
                            `, function (err) {
                                if (err) throw err;
                            });

                    const thanksEmbed = new Discord.MessageEmbed()
                        .setDescription(`Dear ${inter.user},\nThank you for contacting the **Support Team** of **KS-Development**!\n\nWould you like to explain your problem or question so we can can help you as quickly as possible!`)
                        .setColor(db.get(`color_${inter.guildId}`))
                        .addFields([
                            { name: 'Created by:', value: `${inter.user}`, inline: true },
                            { name: 'Reason entered:', value: `\`${reason}\``, inline: true }
                        ])
                        .setThumbnail(inter.guild.iconURL({ dynamic: true }))
                        .setAuthor({ name: `${inter.guild.name} Tickets`, iconURL: inter.guild.iconURL({ dynamic: true }) })
                    
                        if(db.get(`ticketClaim_${inter.guildId}`) === true){

                            const row = new Discord.MessageActionRow()
                                .addComponents(
                                    new Discord.MessageButton()
                                        .setCustomId(`close-ticket`)
                                        .setLabel('Close')
                                        .setEmoji('🔒')
                                        .setStyle('DANGER'),
                                )
        
                            const roleMention = inter.guild.roles.cache.find(x => x.id === role);
                            if(roleMention === undefined){
                                db.subtract(`ticket_${inter.guildId}_${inter.user.id}`, 1)
                                setTimeout(() => { c.delete().catch(e => {}) }, 100)

                                const errorEmbed = new Discord.MessageEmbed()
                                    .setDescription(`Er ging iets fout met het aanmaken van het ticket!\nContacteer de eigenaar van deze server en vermeld deze error.`)
                                    .setColor(client.config.colors.negative)
                                    .setAuthor({ name: 'Er ging iets fout!', iconURL: inter.guild.iconURL({ dynamic: true }) })
                                return await inter.editReply({ embeds: [errorEmbed], ephemeral: true })
                            }

                            c.permissionOverwrites.create(roleMention, { VIEW_CHANNEL: true, SEND_MESSAGES: true, ATTACH_FILES: true })
                            await c.send({ content: `${inter.user} & ${roleMention}`, embeds: [thanksEmbed], components: [row] }).catch(e => {});
                    
                            db.set(`ticketConfig_${c.id}`, { approved: true, creator: inter.user.id })
                            await inter.editReply({ content: `Ticket gemaakt: ${c} :ticket:`, ephemeral: true })
        
                        } else {
        
                            const row = new Discord.MessageActionRow()
                                .addComponents(
                                    new Discord.MessageButton()
                                        .setCustomId(`close-ticket`)
                                        .setLabel('Close')
                                        .setEmoji('🔒')
                                        .setStyle('DANGER'),
                                )
        
                            const roleMention = inter.guild.roles.cache.find(x => x.id === role);
                            c.permissionOverwrites.create(roleMention, { VIEW_CHANNEL: true, SEND_MESSAGES: true, ATTACH_FILES: true })
                            await c.send({ content: `${inter.user} & ${roleMention}`, embeds: [thanksEmbed], components: [row] }).catch(e => {});
                    
                            db.set(`ticketConfig_${c.id}`, { approved: true, creator: inter.user.id })
                            await inter.editReply({ content: `Ticket gemaakt: ${c} :ticket:`, ephemeral: true })
        
                        }
        
                }).catch(async e => {

                db.subtract(`ticket_${inter.guildId}_${inter.user.id}`, 1)

                const errorEmbed = new Discord.MessageEmbed()
                    .setDescription(`Something went wrong while creating the ticket!\nContact the owner of this server and report this error.`)
                    .setColor(client.config.colors.negative)
                    .setAuthor({ name: 'Something went wrong!', iconURL: inter.guild.iconURL({ dynamic: true }) })
                return await inter.editReply({ embeds: [errorEmbed], ephemeral: true })

                });
        
            } else {
                const noLang = new Discord.MessageEmbed()
                    .setDescription(`There is no known language in our database for this server! :boom:
        Use the command: \`/setup\` to start setting up your bot!
        
        If you have already set a language, please contact Nameless (discord.gg/aliservices)`)
                    .setAuthor({ name: 'Something went wrong!', iconURL: inter.guild.iconURL({ dynamic: true })})
                    .setColor(client.config.colors.negative)
                return await inter.reply({ embeds: [noLang], ephemeral: true }).catch(e => {});
                
            }
        }
        
    }

});

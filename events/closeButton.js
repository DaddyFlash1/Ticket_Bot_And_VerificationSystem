const Discord = require('discord.js');
const db = require('quick.db');
const client = require("../index").client
const { Permissions } = require('discord.js');
const moment = require('moment');

const fs = require('fs')

client.on('interactionCreate', async (inter) => {
    const wait = require('util').promisify(setTimeout);

    if(inter.isButton()){
        if(inter.customId === 'close-ticket-cancel') inter.message.delete()

        if(inter.customId === 'close-ticket-def'){
            
            if(db.get(`lang_${inter.guildId}`) === 'NL'){
        
                if(db.get(`ticketConfig_${inter.channelId}.approved`) != true){
                    const notATicket = new Discord.MessageEmbed()
                        .setDescription(`Je kan dit commando enkel gebruiker in een ticket!\nIndien dit een fout is contacteer Nameless (discord.gg/aliservices))`)
                        .setColor(client.config.colors.negative)
                        .setAuthor({ name: 'Er ging iets fout!', iconURL: inter.guild.iconURL({ dynamic: true }) })
                    return await inter.reply({ embeds: [notATicket], ephemeral: true }).catch(e => {});
                }

                if(db.get(`ticketConfig_${inter.channelId}.creator`) === inter.user.id && !inter.member.permissions.has('ADMINISTRATOR')){
                    const failedEmbed = new Discord.MessageEmbed()
                        .setDescription(`Je kan je eigen ticket niet sluiten.`)
                        .setColor(client.config.colors.negative)
                    return await inter.reply({ embeds: [failedEmbed], ephemeral: true }).catch(e => {});
                }

                inter.message.delete()

                const deleteEmbed = new Discord.MessageEmbed()
                    .setDescription(`Dit ticket is zojuist gesloten door: ${inter.user}!\nDit kanaal zal over \`5\` seconden worden verwijderd.`)
                    .setColor(client.config.colors.positive)
                    .setAuthor({ name: 'Ticket Gesloten', iconURL: inter.guild.iconURL({ dynamic: true }) })
                await inter.reply({ embeds: [deleteEmbed] }).catch(e => {});

                const dm = new Discord.MessageEmbed()
                    .setDescription(`Je ticket in de **${inter.guild.name}** Discord is zojuist gesloten!\nJe ticket is gesloten door: **${inter.user.tag}**`)
                    .setColor(db.get(`color_${inter.guildId}`))
                    .setAuthor({ name: 'Ticket Gesloten', iconURL: inter.guild.iconURL({ dynamic: true }) })
                    .setTimestamp()

                const row = new Discord.MessageActionRow()
                    .addComponents(
                        new Discord.MessageButton()
                            .setCustomId('ticket-transcript')
                            .setLabel('Ontvang het transcript')
                            .setStyle('SECONDARY')
                    )

                const user = inter.guild.members.cache.find(x => x.id === db.get(`ticketConfig_${inter.channelId}.creator`))

                db.subtract(`ticket_${inter.guildId}_${db.get(`ticketConfig_${inter.channelId}.creator`)}`, 1)
                db.delete(`ticketConfig_${inter.channelId}`)

                const logEmbed = new Discord.MessageEmbed()
                    .setDescription(`Het ticket: \`${inter.channel.name}\` is gesloten door: **${inter.user.tag}**.\nMeer informatie over deze actie is hieronder zichtbaar.`)
                    .setColor(db.get(`color_${inter.guildId}`))
                    .setAuthor({ name: 'Ticket Gesloten', iconURL: inter.guild.iconURL({ dynamic: true }) })
                    .setTimestamp()
                    .addField(`Ticket Informatie:`, `> Maker: ${user}\n> Gesloten door: ${inter.user} \`(${inter.user.tag})\``)

                const logChannel = inter.guild.channels.cache.find(x => x.id === db.get(`ticketLog_${inter.guildId}`))
                if(logChannel != undefined) {const msg = await logChannel.send({ embeds: [logEmbed], components: [row] }).catch(e => {console.log(e)}); db.set(`transcript_${msg.id}`, { guild: inter.guildId, channel: inter.channelId })}

                setTimeout(() => {
                    inter.channel.delete()
                }, 5000)

                if(user != undefined) {const msg = await user.send({ embeds: [dm], components: [row] }).catch(e => {});
                if(msg != undefined) db.set(`transcript_${msg.id}`, { guild: inter.guildId, channel: inter.channelId }) }
        
            } else if(db.get(`lang_${inter.guildId}`) === 'ENG'){
        
                if(db.get(`ticketConfig_${inter.channelId}.approved`) != true){
                    const notATicket = new Discord.MessageEmbed()
                        .setDescription(`You can only use this command in a ticket!\nIf this is an error please contact Nameless (discord.gg/aliservices)`)
                        .setColor(client.config.colors.negative)
                        .setAuthor({ name: 'Something went wrong!', iconURL: inter.guild.iconURL({ dynamic: true }) })
                    return await inter.reply({ embeds: [notATicket], ephemeral: true }).catch(e => {});
                }

                if(db.get(`ticketConfig_${inter.channelId}.creator`) === inter.user.id && !inter.member.permissions.has('ADMINISTRATOR')){
                    const failedEmbed = new Discord.MessageEmbed()
                        .setDescription(`You cannot close your own ticket.`)
                        .setColor(client.config.colors.negative)
                    return await inter.reply({ embeds: [failedEmbed], ephemeral: true }).catch(e => {});
                }

                inter.message.delete()

                const deleteEmbed = new Discord.MessageEmbed()
                    .setDescription(`This ticket has just been closed by: ${inter.user}!\nThis channel will be deleted in \`5\` seconds.`)
                    .setColor(client.config.colors.positive)
                    .setAuthor({ name: 'Ticket Closed', iconURL: inter.guild.iconURL({ dynamic: true }) })
                await inter.reply({ embeds: [deleteEmbed] }).catch(e => {});

                const dm = new Discord.MessageEmbed()
                    .setDescription(`Your ticket in the **${inter.guild.name}** Discord has just been closed!\nYour ticket has been closed by: **${inter.user.tag}**`)
                    .setColor(db.get(`color_${inter.guildId}`))
                    .setAuthor({ name: 'Ticket Closed', iconURL: inter.guild.iconURL({ dynamic: true }) })
                    .setTimestamp()

                const row = new Discord.MessageActionRow()
                    .addComponents(
                        new Discord.MessageButton()
                            .setCustomId('ticket-transcript')
                            .setLabel('Receive the transcript')
                            .setStyle('SECONDARY')
                    )

                const user = inter.guild.members.cache.find(x => x.id === db.get(`ticketConfig_${inter.channelId}.creator`))
               
                db.subtract(`ticket_${inter.guildId}_${db.get(`ticketConfig_${inter.channelId}.creator`)}`, 1)
                db.delete(`ticketConfig_${inter.channelId}`)

                const logEmbed = new Discord.MessageEmbed()
                    .setDescription(`The ticket: \`${inter.channel.name}\` has been closed by: **${inter.user.tag}**.\nMore information about this action is visible below.`)
                    .setColor(db.get(`color_${inter.guildId}`))
                    .setAuthor({ name: 'Ticket Closed', iconURL: inter.guild.iconURL({ dynamic: true }) })
                    .setTimestamp()
                    .addField(`Ticket Information:`, `> Creator: ${user}\n> Closed by: ${inter.user} \`(${inter.user.tag})\``)

                const logChannel = inter.guild.channels.cache.find(x => x.id === db.get(`ticketLog_${inter.guildId}`))
                if(logChannel != undefined) {const msg = await logChannel.send({ embeds: [logEmbed], components: [row] }).catch(e => {console.log(e)}); db.set(`transcript_${msg.id}`, { guild: inter.guildId, channel: inter.channelId })}

                setTimeout(() => {
                    inter.channel.delete()
                }, 5000)

                if(user != undefined) {const msg = await user.send({ embeds: [dm], components: [row] }).catch(err => {});
                if(msg != undefined) db.set(`transcript_${msg.id}`, { guild: inter.guildId, channel: inter.channelId }) }
        
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
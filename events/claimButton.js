const Discord = require('discord.js');
const client = require("../index").client
const db = require('quick.db')
const { createCmd, globalCmd } = require('../dataHandler');

const commaNumber = require('comma-number')

client.on('interactionCreate', async (inter) => {

    if(inter.isButton()){
        if(inter.customId === 'claim-ticket'){

            if(db.get(`lang_${inter.guildId}`) === 'NL'){

                if(db.get(`ticketClaim_${inter.guildId}`) === false){
                    const failedEmbed = new Discord.MessageEmbed()
                        .setDescription(`Het is niet mogelijk om tickets te claimen!\nJe kan deze optie aan en uit zetten in de ticket config!
                        
                        Verander dit via het commando: \`/config claim-option true\``)
                        .setColor(client.config.colors.negative)
                        .setAuthor({ name: 'Claimen niet mogelijk!', iconURL: inter.guild.iconURL({ dynamic: true }) })
                    return await inter.reply({ embeds: [failedEmbed], ephemeral: true })
                }

                if(inter.user.id != db.get(`ticketConfig_${inter.channelId}.creator`)){
                    const claimEmbed = new Discord.MessageEmbed()
                        .setDescription(`Je kan niet je eigen ticket claimen!
                        Enkel de andere gebruikers hebben hier toegang tot!`)
                        .setColor(client.config.colors.negative)
                        .setAuthor({ name: 'Er ging iets fout!', iconURL: inter.guild.iconURL({ dynamic: true}) })
                    return await inter.reply({ embeds: [claimEmbed], ephemeral: true }).catch(e => {});
                }

                const newEmbed = new Discord.MessageEmbed(inter.message.embeds[0])
                    newEmbed.addField(`Geclaimd door:`, `${inter.user}`, true)

                const row = new Discord.MessageActionRow()
                    .addComponents(
                        new Discord.MessageButton()
                            .setCustomId(`close-ticket`)
                            .setLabel('Sluit')
                            .setEmoji('🔒')
                            .setStyle('DANGER'),
                        new Discord.MessageButton()
                            .setCustomId(`claim-ticket`)
                            .setLabel('Claim')
                            .setEmoji('🙋')
                            .setDisabled()
                            .setStyle('SUCCESS'),
                    )
                    
                inter.message.edit({ embeds: [newEmbed], components: [row] })

                inter.channel.permissionOverwrites.create(inter.guild.roles.everyone, { VIEW_CHANNEL: false }).catch(e => {});
                inter.channel.permissionOverwrites.create(inter.user.id, { VIEW_CHANNEL: true, SEND_MESSAGES: true, ATTACH_FILES: true }).catch(e => {});
                inter.channel.permissionOverwrites.create(db.get(`ticketConfig_${inter.channelId}.creator`), { VIEW_CHANNEL: true, SEND_MESSAGES: true, ATTACH_FILES: true }).catch(e => {});
                inter.channel.permissionOverwrites.create(db.get(`config_${inter.guildId}.ticketRole`), { VIEW_CHANNEL: true, SEND_MESSAGES: false, ATTACH_FILES: false }).catch(e => {});

                const succesEmbed = new Discord.MessageEmbed()
                    .setDescription(`Deze ticket is zojuist geclaimed door: ${inter.user}!\nEnkel ${inter.user} en de maker van het ticket kunnen de chat nog gebruiken.`)
                    .setColor(client.config.colors.positive)
                    .setAuthor({ name: 'Ticket Geclaimd', iconURL: inter.guild.iconURL({ dynamic: true }) })
                return await inter.reply({ embeds: [succesEmbed] }).catch(e => {});

            } else if(db.get(`lang_${inter.guildId}`) === 'ENG'){

                if(db.get(`ticketClaim_${inter.guildId}`) === false){
                    const failedEmbed = new Discord.MessageEmbed()
                        .setDescription(`It is not possible to claim tickets!\nYou can turn this option on and off in the ticket config!
                        
                        Change this with the command: \`/config claim-option true\``)
                        .setColor(client.config.colors.negative)
                        .setAuthor({ name: 'Claim not possible!', iconURL: inter.guild.iconURL({ dynamic: true }) })
                    return await inter.reply({ embeds: [failedEmbed], ephemeral: true })
                }

                if(inter.user.id != db.get(`ticketConfig_${inter.channelId}.creator`)){
                    const claimEmbed = new Discord.MessageEmbed()
                        .setDescription(`You cannot claim your own ticket!
                        Only the other users have access to this!`)
                        .setColor(client.config.colors.negative)
                        .setAuthor({ name: 'Something went wrong!', iconURL: inter.guild.iconURL({ dynamic: true}) })
                    return await inter.reply({ embeds: [claimEmbed], ephemeral: true }).catch(e => {});
                }

                const newEmbed = new Discord.MessageEmbed(inter.message.embeds[0])
                    newEmbed.addField(`Geclaimd door:`, `${inter.user}`, true)

                const row = new Discord.MessageActionRow()
                    .addComponents(
                        new Discord.MessageButton()
                            .setCustomId(`close-ticket`)
                            .setLabel('Close')
                            .setEmoji('🔒')
                            .setStyle('DANGER'),
                        new Discord.MessageButton()
                            .setCustomId(`claim-ticket`)
                            .setLabel('Claim')
                            .setEmoji('🙋')
                            .setDisabled()
                            .setStyle('SUCCESS'),
                    )
                    
                inter.message.edit({ embeds: [newEmbed], components: [row] }).catch(e => {});

                inter.channel.permissionOverwrites.create(inter.guild.roles.everyone, { VIEW_CHANNEL: false }).catch(e => {});
                inter.channel.permissionOverwrites.create(inter.user.id, { VIEW_CHANNEL: true, SEND_MESSAGES: true, ATTACH_FILES: true }).catch(e => {});
                inter.channel.permissionOverwrites.create(db.get(`ticketConfig_${inter.channelId}.creator`), { VIEW_CHANNEL: true, SEND_MESSAGES: true, ATTACH_FILES: true }).catch(e => {});
                inter.channel.permissionOverwrites.create(db.get(`config_${inter.guildId}.ticketRole`), { VIEW_CHANNEL: true, SEND_MESSAGES: false, ATTACH_FILES: false }).catch(e => {});

                const succesEmbed = new Discord.MessageEmbed()
                    .setDescription(`This ticket has just been claimed by: ${inter.user}!\nOnly ${inter.user} and the creator of the ticket can still use the chat.`)
                    .setColor(client.config.colors.positive)
                    .setAuthor({ name: 'Ticket Geclaimed', iconURL: inter.guild.iconURL({ dynamic: true }) })
                return await inter.reply({ embeds: [succesEmbed] }).catch(e => {});

            } else {
                const newLocal = `There is no known language in our database for this server! :boom:
        Use the command: \`/setup\` to start setting up your bot!
        
        If you have already set a language, please contact Nameless (discord.gg/aliservices)`;
                const noLang = new Discord.MessageEmbed()
                    .setDescription(newLocal)
                    .setAuthor({ name: 'Something went wrong!', iconURL: inter.guild.iconURL({ dynamic: true })})
                    .setColor(client.config.colors.negative)
                return await inter.reply({ embeds: [noLang], ephemeral: true }).catch(e => {});
            }

        }
    }

})
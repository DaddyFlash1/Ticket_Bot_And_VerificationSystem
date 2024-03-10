const Discord = require('discord.js');
const db = require('quick.db');
const client = require("../index").client

client.on('interactionCreate', async (inter) => {
    const wait = require('util').promisify(setTimeout);

    if(inter.isButton()){

        if(db.get(`lang_${inter.guildId}`) === 'NL'){

            if(inter.customId === 'add-role'){
                const role = inter.guild.roles.cache.find(x => x.id === db.get(`react_${inter.message.id}`))

                const noRole = new Discord.MessageEmbed()
                    .setDescription(`De rol die gekoppeld is aan deze reactie rol bestaat niet!\nIndien dit een fout is contacteer Nameless (discord.gg/aliservices)`)
                    .setColor(client.config.colors.negative)
                    .setAuthor({ name: 'Rol Ontbreekt!', iconURL: inter.guild.iconURL({ dynamic: true })})

                const roleAdded = new Discord.MessageEmbed()
                    .setDescription(`De rol ${role} is succesvol toegevoegd aan je account!`)
                    .setColor(client.config.colors.positive)
                    .setAuthor({ name: 'Rol Toegevoegd!', iconURL: inter.guild.iconURL({ dynamic: true })})

                const rolBezit = new Discord.MessageEmbed()
                    .setDescription(`Je bent al in bezit van de ${role} rol!`)
                    .setColor(client.config.colors.negative)
                    .setAuthor({ name: 'Er ging iets fout!', iconURL: inter.guild.iconURL({ dynamic: true })})

                if(inter.member.roles.cache.find(x => x.id === role.id))
                return await inter.reply({ embeds: [rolBezit], ephemeral: true }).catch(e => {});

                if(role === undefined) return await inter.reply({ embeds: [noRole], ephemeral: true })
                inter.member.roles.add(role).catch(e => {});
                await inter.reply({ embeds: [roleAdded], ephemeral: true }).catch(e => {});

            } else if(inter.customId === 'remove-role'){
                const role = inter.guild.roles.cache.find(x => x.id === db.get(`react_${inter.message.id}`))

                const noRole = new Discord.MessageEmbed()
                    .setDescription(`De rol die gekoppeld is aan deze reactie rol bestaat niet!\nIndien dit een fout is contacteer Nameless (discord.gg/aliservices)`)
                    .setColor(client.config.colors.negative)
                    .setAuthor({ name: 'Rol Ontbreekt!', iconURL: inter.guild.iconURL({ dynamic: true })})

                const roleRemove = new Discord.MessageEmbed()
                    .setDescription(`De rol ${role} is succesvol verwijderd van je account!`)
                    .setColor(client.config.colors.positive)
                    .setAuthor({ name: 'Rol Verwijderd!', iconURL: inter.guild.iconURL({ dynamic: true })})

                const rolNietBezit = new Discord.MessageEmbed()
                    .setDescription(`Je bent niet in bezit van de ${role} rol!`)
                    .setColor(client.config.colors.negative)
                    .setAuthor({ name: 'Er ging iets fout!', iconURL: inter.guild.iconURL({ dynamic: true })})

                if(!inter.member.roles.cache.find(x => x.id === role.id))
                return await inter.reply({ embeds: [rolNietBezit], ephemeral: true }).catch(e => {});

                if(role === undefined) return await inter.reply({ embeds: [noRole], ephemeral: true })
                inter.member.roles.remove(role).catch(e => {});
                await inter.reply({ embeds: [roleRemove], ephemeral: true }).catch(e => {});

            }

        } else if(db.get(`lang_${inter.guildId}`) === 'ENG'){

            if(inter.customId === 'add-role'){
                const role = inter.guild.roles.cache.find(x => x.id === db.get(`react_${inter.message.id}`))

                const noRole = new Discord.MessageEmbed()
                    .setDescription(`The role associated with this response role does not exist!\nIf this is an error, please contact Nameless (discord.gg/aliservices)`)
                    .setColor(client.config.colors.negative)
                    .setAuthor({ name: 'Rol Ontbreekt!', iconURL: inter.guild.iconURL({ dynamic: true })})

                const rolBezit = new Discord.MessageEmbed()
                    .setDescription(`You already own the ${role} roll!`)
                    .setColor(client.config.colors.negative)
                    .setAuthor({ name: 'Something went wrong!', iconURL: inter.guild.iconURL({ dynamic: true })})

                const roleAdded = new Discord.MessageEmbed()
                    .setDescription(`The role ${role} has been successfully added to your account!`)
                    .setColor(client.config.colors.positive)
                    .setAuthor({ name: 'Role Added!', iconURL: inter.guild.iconURL({ dynamic: true })})

                if(inter.member.roles.cache.find(x => x.id === role.id))
                return await inter.reply({ embeds: [rolBezit], ephemeral: true }).catch(e => {});

                if(role === undefined) return await inter.reply({ embeds: [noRole], ephemeral: true })
                inter.member.roles.add(role).catch(e => {});
                await inter.reply({ embeds: [roleAdded], ephemeral: true }).catch(e => {});

            } else if(inter.customId === 'remove-role'){
                const role = inter.guild.roles.cache.find(x => x.id === db.get(`react_${inter.message.id}`))

                const noRole = new Discord.MessageEmbed()
                    .setDescription(`The role associated with this response role does not exist!\nIf this is an error, please contact Nameless (discord.gg/aliservices)`)
                    .setColor(client.config.colors.negative)
                    .setAuthor({ name: 'Rol Ontbreekt!', iconURL: inter.guild.iconURL({ dynamic: true })})

                const roleRemove = new Discord.MessageEmbed()
                    .setDescription(`The role ${role} has been successfully removed from your account!`)
                    .setColor(client.config.colors.positive)
                    .setAuthor({ name: 'Role Removed!', iconURL: inter.guild.iconURL({ dynamic: true })})

                const rolNietBezit = new Discord.MessageEmbed()
                    .setDescription(`You do not own the ${role} role!`)
                    .setColor(client.config.colors.negative)
                    .setAuthor({ name: 'Something went wrong!', iconURL: inter.guild.iconURL({ dynamic: true })})

                if(!inter.member.roles.cache.find(x => x.id === role.id))
                return await inter.reply({ embeds: [rolNietBezit], ephemeral: true }).catch(e => {});

                if(role === undefined) return await inter.reply({ embeds: [noRole], ephemeral: true })
                inter.member.roles.remove(role).catch(e => {});
                await inter.reply({ embeds: [roleRemove], ephemeral: true }).catch(e => {});

            }

        }

    }

});
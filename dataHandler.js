const db = require('quick.db');

async function createCmd(client, guildId){

    const data = [
        {
            name: 'setup',
            description: 'Configure the core of your custom bot!',
            options: [
                {
                    name: 'language-selector',
                    description: 'Choose the language you want the bot to respond in.',
                    type: 'STRING',
                    required: true,
                    choices: [
                        {
                            name: 'English',
                            description: 'Set the bot to respond in English.',
                            value: 'ENG'
                        },
                        {
                            name: 'Nederlands',
                            description: 'Stel in dat de bot zal reageren in het Nederlands.',
                            value: 'NL'
                        }
                    ]
                }
            ]
        },
        {
            name: 'verifysetup',
            description: 'Set all preference options for the authentication system.',
            options: [
                {
                    name: 'type',
                    description: 'Choose whether you want a captcha system or a verification panel.',
                    type: 'STRING',
                    required: true,
                    choices: [
                        {
                            name: 'Captcha System (Recommended)',
                            value: 'CAPTCHA'
                        },
                        {
                            name: 'Verification Panel',
                            value: 'PANEL'
                        }
                    ]
                },
                {
                    name: 'role',
                    description: 'Specify the role that users should receive.',
                    type: 'ROLE',
                    required: true
                },
                {
                    name: 'channel',
                    description: 'Specify the channel to be registered as the verification channel.',
                    type: 'CHANNEL',
                    required: true,
                    channelTypes: ['GUILD_TEXT', 'GUILD_NEWS']
                },
            ]
        },
        {
            name: 'setprefix',
            description: 'Adjust the prefix for the normal commands',
            options: [
                {
                    name: 'newprefix',
                    description: 'Enter the new prefix for the bot here.',
                    type: 'STRING',
                    required: true
                }
            ]
        },
        {
            name: 'setcolor',
            description: 'Adjust the prefix for the normal commands',
            options: [
                {
                    name: 'newcolor',
                    description: 'Choose the new color for the bot here.',
                    type: 'STRING',
                    required: true,
                    choices: [
                        {
                            name: 'Bright Red (#ff0000)',
                            value: 'ff0000'
                        },
                        {
                            name: 'Light Red (#ff4545)',
                            value: 'ff4545'
                        },
                        {
                            name: 'Dark Red (#960000)',
                            value: '960000'
                        },
                        {
                            name: 'Bright Blue (#1100ff)',
                            value: '1100ff'
                        },
                        {
                            name: 'Light Blue (#3064ff)',
                            value: '3064ff'
                        },
                        {
                            name: 'Dark Blue (#00289e)',
                            value: '00289e'
                        },
                        {
                            name: 'Bright Orange (#ff8400)',
                            value: 'ff8400'
                        },
                        {
                            name: 'Light Orange (#ffaa4f)',
                            value: 'ffaa4f'
                        },
                        {
                            name: 'Dark Orange (#c26400)',
                            value: 'c26400'
                        },
                        {
                            name: 'Bright Yellow (#ffff00)',
                            value: 'ffff00'
                        },
                        {
                            name: 'Light Yellow (#fff34f)',
                            value: 'fff34f'
                        },
                        {
                            name: 'Dark Yellow (#c9bc00)',
                            value: 'c9bc00'
                        },
                        {
                            name: 'Bright Green (#00c70d)',
                            value: '00c70d'
                        },
                        {
                            name: 'Light Green (#5bff4f)',
                            value: '5bff4f'
                        },
                        {
                            name: 'Dark Green (#004d05)',
                            value: '004d05'
                        },
                        {
                            name: 'Bright Aqua (#00d7de)',
                            value: '00d7de'
                        },
                        {
                            name: 'Light Aqua (#40f9ff)',
                            value: '40f9ff'
                        },
                        {
                            name: 'Dark Aqua (#008d91)',
                            value: '008d91'
                        },
                        {
                            name: 'Bright Purple (#b300ff)',
                            value: 'b300ff'
                        },
                        {
                            name: 'Light Purple (#e854ff)',
                            value: 'e854ff'
                        },
                        {
                            name: 'Dark Purple (#7e0091)',
                            value: '7e0091'
                        },
                        {
                            name: 'Nameles',
                            value: '2f3136'
                        },                        
                    ]
                }
            ]
        },
        {
            name: 'setfooter',
            description: 'Choose the new footer for the embeds of the bot here.',
            options: [
                {
                    name: 'newfooter',
                    description: 'Enter the new footer for the embeds here.',
                    type: 'STRING',
                    required: true
                }
            ]
        },
        {
            name: 'react',
            description: 'Create an react role so people can add and remove roles from their account.',
            options: [
                {
                    name: 'role',
                    description: 'Mention the role you want to remove or add from your account.',
                    type: 'ROLE',
                    required: true
                },
                {
                    name: 'message',
                    description: 'Enter the text to be included in the message. (Optional)',
                    type: 'STRING'
                }
            ]
        },
        {
            name: 'rename',
            description: 'Change the name of the ticket.',
            options: [
                {
                    name: 'new-name',
                    description: 'Enter the name the ticket should be given.',
                    type: 'STRING',
                    required: true
                }
            ]
        },
        {
            name: 'ban',
            description: 'Ban a user from your server.',
            options: [
                {
                    name: 'user',
                    description: 'Mention the user you want to ban!',
                    type: 'USER',
                    required: true
                },
                {
                    name: 'reason',
                    description: 'Enter the reason why the user was banned. (Optional)',
                    type: 'STRING',
                    required: false
                }
            ]
        },
        {
            name: 'tempban',
            description: 'Tempban a user from your server.',
            options: [
                {
                    name: 'user',
                    description: 'Mention the user you want to ban!',
                    type: 'USER',
                    required: true
                },
                {
                    name: 'length',
                    description: 'How long should the user be banned! (1y, 1d, 1h, 1m, 1s)',
                    type: 'STRING',
                    required: true
                },
                {
                    name: 'reason',
                    description: 'Enter the reason why the user was banned. (Optional)',
                    type: 'STRING',
                    required: false
                }
            ]
        },
        {
            name: 'kick',
            description: 'Kick a user from your server.',
            options: [
                {
                    name: 'user',
                    description: 'Mention the user you want to kick!',
                    type: 'USER',
                    required: true
                },
                {
                    name: 'reason',
                    description: 'Enter the reason why the user was kicked. (Optional)',
                    type: 'STRING',
                    required: false
                }
            ]
        },
        {
            name: 'timeout',
            description: 'Timeout a user in your server.',
            options: [
                {
                    name: 'user',
                    description: 'Mention the user you want to timeout!',
                    type: 'USER',
                    required: true
                },
                {
                    name: 'length',
                    description: 'How long should the user be timedout! (1y, 1d, 1h, 1m, 1s)',
                    type: 'STRING',
                    required: true
                },
                {
                    name: 'reason',
                    description: 'Enter the reason why the user was timedout. (Optional)',
                    type: 'STRING',
                    required: false
                }
            ]
        },
        {
            name: 'clear',
            description: 'Delete messages from a specific chat.',
            options: [
                {
                    name: 'amount',
                    description: 'Enter the number of messages to delete. (Max 99)',
                    type: 'NUMBER',
                    required: true
                }
            ]
        },
        {
            name: 'unban',
            description: 'Remove a ban from a user in your server.',
            options: [
                {
                    name: 'user-id',
                    description: 'Remove a ban from a user in your server.',
                    type: 'STRING',
                    required: true
                },
            ]
        },
        {
            name: 'close',
            description: 'Sluit een ticket.'
        },
        {
            name: 'add',
            description: 'Mention a user you want to add to your ticket.',
            options: [
                {
                    name: 'user-or-role',
                    description: 'Mention the user or role you want to add to your ticket.',
                    required: true,
                    type: 'MENTIONABLE'
                }
            ]
        },
        {
            name: 'remove',
            description: 'Mention a user you want to remove from your ticket.',
            options: [
                {
                    name: 'user-or-role',
                    description: 'Mention the user or role you want to remove your ticket.',
                    required: true,
                    type: 'MENTIONABLE'
                }
            ]
        },
        {
            name: 'ticketpanel',
            description: 'Place a ticket panel in a selected channel.',
            options: [
                {   
                    name: 'one',
                    description: 'Create a ticket panel with 1 category.',
                    type: 'SUB_COMMAND',
                    options: [
                        {
                            name: 'name-option-one',
                            description: 'Mention the category name of the first option.',
                            type: 'STRING',
                            required: true
                        },
                        {
                            name: 'category-option-one',
                            description: 'Mention the category where all tickets should appear.',
                            type: 'CHANNEL',
                            required: true,
                            channelTypes: ['GUILD_CATEGORY']
                        },
                        {
                            name: 'role-option-one',
                            description: 'Specify the role to be added to this option.',
                            type: 'ROLE',
                            required: true
                        },
                    ]  
                },
                {
                    name: 'two',
                    description: 'Create a ticket panel with 2 different categories.',
                    type: 'SUB_COMMAND',
                    options: [
                        {
                            name: 'name-option-one',
                            description: 'Mention the category name of the first option.',
                            type: 'STRING',
                            required: true
                        },
                        {
                            name: 'category-option-one',
                            description: 'Mention the category where all tickets should appear.',
                            type: 'CHANNEL',
                            required: true,
                            channelTypes: ['GUILD_CATEGORY']
                        },
                        {
                            name: 'role-option-one',
                            description: 'Specify the role to be added to this option.',
                            type: 'ROLE',
                            required: true
                        },
                        {
                            name: 'name-option-two',
                            description: 'Mention the category name of the first option.',
                            type: 'STRING',
                            required: true
                        },
                        {
                            name: 'category-option-two',
                            description: 'Mention the category where all tickets should appear.',
                            type: 'CHANNEL',
                            required: true,
                            channelTypes: ['GUILD_CATEGORY']
                        },
                        {
                            name: 'role-option-two',
                            description: 'Specify the role to be added to this option.',
                            type: 'ROLE',
                            required: true
                        },
                    ]
                },
                {
                    name: 'three',
                    description: 'Create a ticket panel with 3 different categories.',
                    type: 'SUB_COMMAND',
                    options: [
                        {
                            name: 'name-option-one',
                            description: 'Mention the category name of the first option.',
                            type: 'STRING',
                            required: true
                        },
                        {
                            name: 'category-option-one',
                            description: 'Mention the category where all tickets should appear.',
                            type: 'CHANNEL',
                            required: true,
                            channelTypes: ['GUILD_CATEGORY']
                        },
                        {
                            name: 'role-option-one',
                            description: 'Specify the role to be added to this option.',
                            type: 'ROLE',
                            required: true
                        },
                        {
                            name: 'name-option-two',
                            description: 'Mention the category name of the second option.',
                            type: 'STRING',
                            required: true
                        },
                        {
                            name: 'category-option-two',
                            description: 'Mention the category where all tickets should appear.',
                            type: 'CHANNEL',
                            required: true,
                            channelTypes: ['GUILD_CATEGORY']
                        },
                        {
                            name: 'role-option-two',
                            description: 'Specify the role to be added to this option.',
                            type: 'ROLE',
                            required: true
                        },
                        {
                            name: 'name-option-three',
                            description: 'Mention the category name of the third option.',
                            type: 'STRING',
                            required: true
                        },
                        {
                            name: 'category-option-three',
                            description: 'Mention the category where all tickets should appear.',
                            type: 'CHANNEL',
                            required: true,
                            channelTypes: ['GUILD_CATEGORY']
                        },
                        {
                            name: 'role-option-three',
                            description: 'Specify the role to be added to this option.',
                            type: 'ROLE',
                            required: true
                        },
                    ]
                },
                {
                    name: 'four',
                    description: 'Create a ticket panel with 4 different categories.',
                    type: 'SUB_COMMAND',
                    options: [
                        {
                            name: 'name-option-one',
                            description: 'Mention the category name of the first option.',
                            type: 'STRING',
                            required: true
                        },
                        {
                            name: 'category-option-one',
                            description: 'Mention the category where all tickets should appear.',
                            type: 'CHANNEL',
                            required: true,
                            channelTypes: ['GUILD_CATEGORY']
                        },
                        {
                            name: 'role-option-one',
                            description: 'Specify the role to be added to this option.',
                            type: 'ROLE',
                            required: true
                        },
                        {
                            name: 'name-option-two',
                            description: 'Mention the category name of the second option.',
                            type: 'STRING',
                            required: true
                        },
                        {
                            name: 'category-option-two',
                            description: 'Mention the category where all tickets should appear.',
                            type: 'CHANNEL',
                            required: true,
                            channelTypes: ['GUILD_CATEGORY']
                        },
                        {
                            name: 'role-option-two',
                            description: 'Specify the role to be added to this option.',
                            type: 'ROLE',
                            required: true
                        },
                        {
                            name: 'name-option-three',
                            description: 'Mention the category name of the third option.',
                            type: 'STRING',
                            required: true
                        },
                        {
                            name: 'category-option-three',
                            description: 'Mention the category where all tickets should appear.',
                            type: 'CHANNEL',
                            required: true,
                            channelTypes: ['GUILD_CATEGORY']
                        },
                        {
                            name: 'role-option-three',
                            description: 'Specify the role to be added to this option.',
                            type: 'ROLE',
                            required: true
                        },
                        {
                            name: 'name-option-four',
                            description: 'Mention the category name of the fourth option.',
                            type: 'STRING',
                            required: true
                        },
                        {
                            name: 'category-option-four',
                            description: 'Mention the category where all tickets should appear.',
                            type: 'CHANNEL',
                            required: true,
                            channelTypes: ['GUILD_CATEGORY']
                        },
                        {
                            name: 'role-option-four',
                            description: 'Specify the role to be added to this option.',
                            type: 'ROLE',
                            required: true
                        },
                    ]
                },
                {
                    name: 'five',
                    description: 'Create a ticket panel with 5 different categories.',
                    type: 'SUB_COMMAND',
                    options: [
                        {
                            name: 'name-option-one',
                            description: 'Mention the category name of the first option.',
                            type: 'STRING',
                            required: true
                        },
                        {
                            name: 'category-option-one',
                            description: 'Mention the category where all tickets should appear.',
                            type: 'CHANNEL',
                            required: true,
                            channelTypes: ['GUILD_CATEGORY']
                        },
                        {
                            name: 'role-option-one',
                            description: 'Specify the role to be added to this option.',
                            type: 'ROLE',
                            required: true
                        },
                        {
                            name: 'name-option-two',
                            description: 'Mention the category name of the second option.',
                            type: 'STRING',
                            required: true
                        },
                        {
                            name: 'category-option-two',
                            description: 'Mention the category where all tickets should appear.',
                            type: 'CHANNEL',
                            required: true,
                            channelTypes: ['GUILD_CATEGORY']
                        },
                        {
                            name: 'role-option-two',
                            description: 'Specify the role to be added to this option.',
                            type: 'ROLE',
                            required: true
                        },
                        {
                            name: 'name-option-three',
                            description: 'Mention the category name of the third option.',
                            type: 'STRING',
                            required: true
                        },
                        {
                            name: 'category-option-three',
                            description: 'Mention the category where all tickets should appear.',
                            type: 'CHANNEL',
                            required: true,
                            channelTypes: ['GUILD_CATEGORY']
                        },
                        {
                            name: 'role-option-three',
                            description: 'Specify the role to be added to this option.',
                            type: 'ROLE',
                            required: true
                        },
                        {
                            name: 'name-option-four',
                            description: 'Mention the category name of the fourth option.',
                            type: 'STRING',
                            required: true
                        },
                        {
                            name: 'category-option-four',
                            description: 'Mention the category where all tickets should appear.',
                            type: 'CHANNEL',
                            required: true,
                            channelTypes: ['GUILD_CATEGORY']
                        },
                        {
                            name: 'role-option-four',
                            description: 'Specify the role to be added to this option.',
                            type: 'ROLE',
                            required: true
                        },
                        {
                            name: 'name-option-five',
                            description: 'Mention the category name of the fith option.',
                            type: 'STRING',
                            required: true
                        },
                        {
                            name: 'category-option-five',
                            description: 'Mention the category where all tickets should appear.',
                            type: 'CHANNEL',
                            required: true,
                            channelTypes: ['GUILD_CATEGORY']
                        },
                        {
                            name: 'role-option-five',
                            description: 'Specify the role to be added to this option.',
                            type: 'ROLE',
                            required: true
                        },
                    ]
                },
            ]
        },
        {
            name: 'suggest',
            description: 'Create a suggestion for the server.',
            options: [
                {
                    name: 'your-idea',
                    description: 'Enter your suggestion here.',
                    type: 'STRING',
                    required: true
                }
            ]
        },
        {
            name: 'report',
            description: 'Create a report for the server.',
            options: [
                {
                    name: 'your-report',
                    description: 'Enter your report here.',
                    type: 'STRING',
                    required: true
                }
            ]
        },
        {
            name: 'config',
            description: 'Set up the entire ticket system!',
            options: [
                {
                    name: 'join',
                    description: 'Adjust the settings for the join system.',
                    type: 'SUB_COMMAND_GROUP',
                    options: [
                        {
                            name: 'join-channel',
                            description: 'Change the channel where all join messages should be sent.',
                            type: 'SUB_COMMAND',
                            options: [
                                {
                                    name: 'channel',
                                    description: 'Edit the channel which is registered as a join channel.',
                                    type: 'CHANNEL',
                                    required: true,
                                    channelTypes: ['GUILD_TEXT', 'GUILD_NEWS']
                                },
                                {
                                    name: 'reset',
                                    description: 'Delete the current settings of this function.',
                                    type: 'STRING',
                                    required: false,
                                    choices: [
                                        {
                                            name: 'Reset current settings!',
                                            value: 'reset'
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            name: 'join-role',
                            description: 'Change the role users should reveice when they join the server.',
                            type: 'SUB_COMMAND',
                            options: [
                                {
                                    name: 'role',
                                    description: 'Edit the role which is registered as the join role.',
                                    type: 'ROLE',
                                    required: true,
                                },
                                {
                                    name: 'reset',
                                    description: 'Delete the current settings of this function.',
                                    type: 'STRING',
                                    required: false,
                                    choices: [
                                        {
                                            name: 'Reset current settings!',
                                            value: 'reset'
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            name: 'join-rename',
                            description: 'Customize the beginning of each username for new members!',
                            type: 'SUB_COMMAND',
                            options: [
                                {
                                    name: 'name',
                                    description: 'Enter the beginning of each username here.',
                                    type: 'STRING',
                                    required: true,
                                },
                                {
                                    name: 'reset',
                                    description: 'Delete the current settings of this function.',
                                    type: 'STRING',
                                    required: false,
                                    choices: [
                                        {
                                            name: 'Reset current settings!',
                                            value: 'reset'
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            name: 'join-counter',
                            description: 'Choose whether your welcome message should include a join counter.',
                            type: 'SUB_COMMAND',
                            options: [
                                {
                                    name: 'option',
                                    description: 'Choose here whether your welcome message should have a join counter.',
                                    type: 'STRING',
                                    required: true,
                                    choices: [
                                        {
                                            name: 'Yes my join message needs a join counter!',
                                            value: 'true'
                                        },
                                        {
                                            name: 'No my join message does not need a join counter!',
                                            value: 'false'
                                        },
                                    ]
                                },
                            ]
                        },
                    ]
                },
                {
                    name: 'other',
                    description: 'Adjust the settings for other systems.',
                    type: 'SUB_COMMAND_GROUP',
                    options: [
                        {
                            name: 'suggest-channel',
                            description: 'Change the channel where all suggestions should be sent.',
                            type: 'SUB_COMMAND',
                            options: [
                                {
                                    name: 'channel',
                                    description: 'Edit the channel which is registered as a suggestion channel.',
                                    type: 'CHANNEL',
                                    required: true,
                                    channelTypes: ['GUILD_TEXT', 'GUILD_NEWS']
                                },
                                {
                                    name: 'reset',
                                    description: 'Delete the current settings of this function.',
                                    type: 'STRING',
                                    required: false,
                                    choices: [
                                        {
                                            name: 'Reset current settings!',
                                            value: 'reset'
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            name: 'report-channel',
                            description: 'Change the channel where all reports should be sent.',
                            type: 'SUB_COMMAND',
                            options: [
                                {
                                    name: 'channel',
                                    description: 'Edit the channel which is registered as a report channel.',
                                    type: 'CHANNEL',
                                    required: true,
                                    channelTypes: ['GUILD_TEXT', 'GUILD_NEWS']
                                },
                                {
                                    name: 'reset',
                                    description: 'Delete the current settings of this function.',
                                    type: 'STRING',
                                    required: false,
                                    choices: [
                                        {
                                            name: 'Reset current settings!',
                                            value: 'reset'
                                        }
                                    ]
                                }
                            ]
                        },
                    ]
                },
                {
                    name: 'moderation',
                    description: 'Adjust settings for the moderation system.',
                    type: 'SUB_COMMAND_GROUP',
                    options: [
                        {
                            name: 'moderationlog',
                            description: 'Change the channel where all moderation logs should be sent.',
                            type: 'SUB_COMMAND',
                            options: [
                                {
                                    name: 'channel',
                                    description: 'Mention the channel you want all moderation-logs to appear in.',
                                    type: 'CHANNEL',
                                    required: true,
                                    channelTypes: ['GUILD_TEXT', 'GUILD_NEWS']
                                },
                                {
                                    name: 'reset',
                                    description: 'Delete the current settings of this function.',
                                    type: 'STRING',
                                    required: false,
                                    choices: [
                                        {
                                            name: 'Reset current settings!',
                                            value: 'reset'
                                        }
                                    ]
                                }
                            ]
                        },
                    ]
                },
                {
                    name: 'tickets',
                    description: 'Adjust settings for the ticket system.',
                    type: 'SUB_COMMAND_GROUP',
                    options: [
                        {
                            name: 'claim-option',
                            description: 'Choose whether it is possible to claim a ticket or not.',
                            type: 'SUB_COMMAND',
                            options: [
                                {
                                    name: 'option',
                                    description: 'Choose here whether tickets can be claimed.',
                                    type: 'STRING',
                                    required: true,
                                    choices: [
                                        {
                                            name: 'yes',
                                            value: 'yes'
                                        },
                                        {
                                            name: 'no',
                                            value: 'no'
                                        }
                                    ]
                                },
                            ]
                        },
                        {
                            name: 'max-tickets',
                            description: 'Choose here how many tickets a user can have open.',
                            type: 'SUB_COMMAND',
                            options: [
                                {
                                    name: 'amount',
                                    description: 'Choose the number of tickets here.',
                                    type: 'STRING',
                                    required: true,
                                    choices: [
                                        {
                                            name: 'One Ticket',
                                            value: '1'
                                        },
                                        {
                                            name: 'Two Tickets',
                                            value: '2'
                                        },
                                        {
                                            name: 'Three Tickets',
                                            value: '3'
                                        },
                                        {
                                            name: 'Four Tickets',
                                            value: '4'
                                        },
                                        {
                                            name: 'Five Tickets',
                                            value: '5'
                                        },
                                    ]
                                },
                            ]
                        },
                        {
                            name: 'ticketlog',
                            description: 'Set up the log channel for ticket transcripts.',
                            type: 'SUB_COMMAND',
                            options: [
                                {
                                    name: 'channel',
                                    type: 'CHANNEL',
                                    description: 'Specify the channel where the logs should be sent.',
                                    required: true,
                                    channelTypes: ['GUILD_TEXT', 'GUILD_NEWS']
                                },
                                {
                                    name: 'reset',
                                    description: 'Delete the current settings of this function.',
                                    type: 'STRING',
                                    required: false,
                                    choices: [
                                        {
                                            name: 'Reset current settings!',
                                            value: 'reset'
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
    await client.guilds.cache.get(guildId)?.commands.set(data);


}

async function globalCmd(client){
    const data = []

    await client.application?.commands.set(data);

}

module.exports = { createCmd, globalCmd }
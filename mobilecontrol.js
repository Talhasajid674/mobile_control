const { Client, GatewayIntentBits, AttachmentBuilder } = require('discord.js');
const { exec } = require('child_process');

// ONLY give your bot the intents it actually needs.
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

const TOKEN = 'YOUR_BOT_TOKEN_HERE';
const OWNER_ID = 'YOUR_DISCORD_ID_HERE'; // Get this by right-clicking your Discord profile -> Copy User ID

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}. Termux hardware link is active.`);
});

client.on('messageCreate', async (message) => {
    // SECURITY GATE: Ignore bots and anyone who isn't the owner
    if (message.author.bot || message.author.id !== OWNER_ID) return;

    const args = message.content.trim().split(/ +/);
    const command = args.shift().toLowerCase();

    // Helper function to run Termux shell commands
    const runTermuxCmd = (cmd, replyPrefix) => {
        exec(cmd, (error, stdout, stderr) => {
            if (error) return message.reply(`❌ Execution Error: \`\`\`${error.message}\`\`\``);
            if (stderr) return message.reply(`⚠️ Stderr: \`\`\`${stderr}\`\`\``);
            
            // Discord has a 2000 character limit per message
            const output = stdout.length > 1900 ? stdout.substring(0, 1900) + '...' : stdout;
            if (replyPrefix) message.reply(`${replyPrefix}\n\`\`\`json\n${output}\n\`\`\``);
        });
    };

    switch (command) {
        case '!battery':
            runTermuxCmd('termux-battery-status', '🔋 Battery Data:');
            break;

        case '!location':
            message.reply('📍 Fetching GPS location... this may take a moment.');
            runTermuxCmd('termux-location -p gps', '📍 Current Coordinates:');
            break;

        case '!vibrate':
            runTermuxCmd('termux-vibrate -d 1000 -f', '📳 Phone vibrated for 1 second.');
            break;

        case '!toast':
            const toastMsg = args.join(' ') || 'Default notification from Discord';
            runTermuxCmd(`termux-toast "${toastMsg}"`, '✅ Toast notification sent to screen.');
            break;

        case '!tts':
            const ttsMsg = args.join(' ');
            if (!ttsMsg) return message.reply('You need to provide text to speak.');
            runTermuxCmd(`termux-tts-speak "${ttsMsg}"`, `🗣️ Phone is speaking: "${ttsMsg}"`);
            break;

        case '!clipboard':
            runTermuxCmd('termux-clipboard-get', '📋 Current Phone Clipboard:');
            break;

        case '!photo':
            message.reply('📸 Taking photo with the back camera...');
            // -c 0 is usually the back camera. -c 1 is front.
            exec('termux-camera-photo -c 0 photo.jpg', (err) => {
                if (err) return message.reply(`❌ Camera Error: ${err.message}`);
                
                const image = new AttachmentBuilder('./photo.jpg');
                message.reply({ files: [image] });
            });
            break;
    }
});

client.login(TOKEN);

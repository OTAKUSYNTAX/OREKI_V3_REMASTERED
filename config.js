const fs = require('fs');
const chalk = require('chalk');
// Auto functions
global.available = true;
global.autoReadAll = false;
global.anticall = false;
global.autoTyping = false;  // Auto typing by default OFF
global.autoRecord = false;  // Auto recording by default OFF
global.groupevent = false;  // Controls group event handling
global.autoreadpmngc = false;
global.autoReadGc = false;
global.autoswview = false //auto status/story view
global.maxWarnings = 3,
global.antibadword = false;
global.autostatusReact = false;
global.antispam = false;
global.antidelete = false; // Fixed: Changed comma to semicolon
global.autoreact = false;
global.antilink = false;
global.autoGreet = false; // Set to false to disable greeting response
global.welcome = false;
global.author = "꧁☬𝐓𝐇𝐔𝐆☬꧂̉";
global.location = "Africa,Nigeria,Delta state";
global.botname = "ᎧᏒᏋᏦᎥ Ꮙ3 ᏒᏋᎷᏗᏕᏖᏋᏒᏋᎴ 🀄⛩️👘̉";
global.StatusReactEmoji = "🤎"; // default emoji
global.ownernumber = ["2347079059033"]; // Replace with actual numbers
global.ownername = "꧁☬𝐓𝐇𝐔𝐆☬꧂"; // Replace with your name
global.thumb = fs.readFileSync('./T-Media/Oreki.jpg');
global.prefix = '.'
global.mess = {
    group: "*👥 Group chats only!*\n*This command doesn't work in private chats.*",
    owner: "*🛑 Access denied!*\n*Only the bot owner can use this command.*",
    privates: "*📩 Private chats only!*\n*Use this command in DM/PM.*",
    admin: "*🛡️Admins only!*\n*You need admin privileges to use this command.*",
    botadmin: "*🤖 I need to be an admin first!*\n*Promote me to proceed.*",
    banned: "*🚫 You're banned from using this bot.*\n*Contact the owner if you think this is a mistake.*"
};

// Auto-reload config on file update
let file = require.resolve(__filename);
fs.watchFile(file, () => {
    fs.unwatchFile(file);
    console.log(chalk.redBright(`Update detected in '${__filename}'`));
    delete require.cache[file];
    require(file);
});
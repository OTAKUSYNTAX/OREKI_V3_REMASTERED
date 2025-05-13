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
global.autoswview = true //auto status/story view
global.maxWarnings = 3,
global.location = "Africa,Nigeria,Delta state";
global.author = "༆ 𝐎𝐑𝐄𝐊𝐈 ᵛ³ ꨄ︎ 🍓̉";
global.botname = "༆ 𝐎𝐑𝐄𝐊𝐈 ᵛ³ ꨄ︎ 🍓̉";
global.ownernumber = ["2349037546246","2349037546246"]; // Replace with actual numbers
global.ownername = "༆ 𝕋ℝ𝕀ℙ🐤"; // Replace with your name
global.thumb = fs.readFileSync('./T-Media/Oreki.jpg');
global.prefix = '.'
global.antidelete = true; // Fixed: Changed comma to semicolon
global.autoreact = false;
global.antilink = true;
global.autoGreet = false; // Set to false to disable greeting response
global.welcome = false;
global.mess = {
    group: "*Group chats only 😕*",
    owner: "*🚫 Access denied, Owner command only!*",
    privates: "*DM/PM only 😑*",
    admin: "*Admins Only 👀*",
    botadmin: "*Bot must be an admin 👨‍🦯*",
    banned: "*🚫 You have been banned from using this bot. Contact the owner if you think this is a mistake.*"
};

// Auto-reload config on file update
let file = require.resolve(__filename);
fs.watchFile(file, () => {
    fs.unwatchFile(file);
    console.log(chalk.redBright(`Update detected in '${__filename}'`));
    delete require.cache[file];
    require(file);
});

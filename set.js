const fs = require('fs-extra');
const path = require("path");
const { Sequelize } = require('sequelize');

// Load environment variables if the .env file exists
if (fs.existsSync('set.env')) {
    require('dotenv').config({ path: __dirname + '/set.env' });
}

const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined ? databasePath : process.env.DATABASE_URL;
module.exports = {
    session: process.env.SESSION_ID || 'FLASH-MD-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNE1YdHE4MXFSdlJLSGpNQmNkV2pLWHhPQkFuZlBhQXhLR1NHdzVQdFkyWT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidFpHYW1YV0JvMzNrd3lGbUlrRmVSRHcrZ1lYL1RMK2tGRksxRDVFb1lCQT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI0S2JtSlRRTFZ5Y0YxVnVPb0NvcnpCb3k0bEJYR2hVeDNHa1VWUHpQWEhNPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJvVTdINzRYM09Hb2xlelFma3Q5N1lKMzJWUXVrTDIwczQ0RkRwTFluQW1zPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik9BdXBmY1JRMmxUNEloRnVnUFAxZzFQbHcxVkR0cjlqbTJUNFlwVktYM1E9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlA4ZERYZExSRXp0S2J1bEt0RjliWWI0Nm84OCtVd01TUnFnS2hpb0g0Q009In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWUJOUGtGN24vL1d0OTdHcFNQOFpGUlh3aVJNdXdheFdrdHMwUnMyVERtQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidVdtMFg2WWVqZHNSTlZ1R0tKaiswejFjanUxazV3YXRpRjh4UDcyc3poUT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjRtZkZjUzVSRUFibEswenI0K3A5REpuM2VtcGFVclJSdkFaRkhPMFVTVVQrdnl5UGxGTlVpalY1N2hMOTR3Z3FsSlBpTUtKY1o5RXRwREtwWUl1M0NBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTIsImFkdlNlY3JldEtleSI6InIvQjFqK2JYcU5tZTFhTnZwSVllZXhoeEUyS0ZRRkY0cXJlSHJnWlZyOTQ9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6IjMxYW5mQUdxUk9LYXZRcVhPX0t5a2ciLCJwaG9uZUlkIjoiNmI0YmQyMDEtZjk5YS00NTU4LWI1YjktZTFmMzY2YTJlMGMzIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InJrLzNaeE9ySGFidlZtZnBWREMwTWVzOXpQZz0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ6YWtaU0tlNXJEcytJMHVLZVRuWjRPNlppeHM9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiWEpETTVTOEsiLCJtZSI6eyJpZCI6IjIzMzI0MTU4MzM3MzoyNUBzLndoYXRzYXBwLm5ldCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDSVRDbDdvT0VMZmM1YmNHR0FNZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoieEc4Mnk2VkY2bUtIRlZLWGZxN0plNTFjeDZaTVlRUUc4WGZRNC8vdlh4QT0iLCJhY2NvdW50U2lnbmF0dXJlIjoiaUlEVGZVcVdWeXAxdG1paEJMWE5OZSs1TzdDS0p2aGVXZ3ZxZSs4ems5UjdtVkR0ZnpCWGp2WFhuZlB2QnRGdU9FSjhaQkhQUmhsNUxOQnlaNzlaRGc9PSIsImRldmljZVNpZ25hdHVyZSI6Inl0UzBzNTNPTVJQR1FEZVFLeDgzVTl3ODg2V25SY3puaHFiakphYXlqT0g5MmF1bUV0YWtQYnQ5cUQzRTFUSzlMWEtqRjZEb2F6UERCTGVPZWtmN0JBPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjMzMjQxNTgzMzczOjI1QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQmNSdk5zdWxSZXBpaHhWU2wzNnV5WHVkWE1lbVRHRUVCdkYzME9QLzcxOFEifX1dLCJwbGF0Zm9ybSI6ImlwaG9uZSIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTcyNzYyMjcyMywibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFPdlcifQ==',
    PREFIXES: (process.env.PREFIX || ',').split(',').map(prefix => prefix.trim()).filter(Boolean),
    OWNER_NAME: process.env.OWNER_NAME || "France King",
    OWNER_NUMBER: process.env.OWNER_NUMBER || "254105915061",
    AUTO_READ_STATUS: process.env.AUTO_VIEW_STATUS || "on",
    AUTOREAD_MESSAGES: process.env.AUTO_READ_MESSAGES || "on",
    CHATBOT: process.env.CHAT_BOT || "off",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_SAVE_STATUS || 'off',
    A_REACT: process.env.AUTO_REACTION || 'on',
    AUTO_BLOCK: process.env.BLOCK_ALL || 'off',
    URL: process.env.BOT_MENU_LINKS || 'https://static.animecorner.me/2023/08/op2.jpg',
    MODE: process.env.BOT_MODE || "private",
    PM_PERMIT: process.env.PM_PERMIT || 'on',
    HEROKU_APP_NAME: process.env.HEROKU_APP_NAME,
    HEROKU_API_KEY: process.env.HEROKU_API_KEY,
    WARN_COUNT: process.env.WARN_COUNT || '3',
    PRESENCE: process.env.PRESENCE || 'online',
    ADM: process.env.ANTI_DELETE || 'on',
    TZ: process.env.TIME_ZONE || 'Africa/Nairobi',
    DP: process.env.STARTING_MESSAGE || "on",
    ANTICALL: process.env.ANTICALL || 'on',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://giftedtech_ke:9BzoUeUQO2owLEsMjz5Vhshva91bxF2X@dpg-crice468ii6s73f1nkt0-a.oregon-postgres.render.com/api_gifted_tech"
        : "postgresql://giftedtech_ke:9BzoUeUQO2owLEsMjz5Vhshva91bxF2X@dpg-crice468ii6s73f1nkt0-a.oregon-postgres.render.com/api_gifted_tech",
    /* new Sequelize({
        dialect: 'sqlite',
        storage: DATABASE_URL,
        logging: false,
    })
    : new Sequelize(DATABASE_URL, {
        dialect: 'postgres',
        ssl: true,
        protocol: 'postgres',
        dialectOptions: {
            native: true,
            ssl: { require: true, rejectUnauthorized: false },
        },
        logging: false,
    }), */
};

// Watch for changes in this file and reload it automatically
const fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`Updated ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});

const { ChannelType } = require("discord.js");
const { botId } = require("../../config.json");
const fs = require("fs");

module.exports = {
  name: "messageCreate",
  async execute(message, client) {
    const bot = message.author.bot;
    const words = fs.readFileSync(`${__dirname}/../../bannedwords.json`);
    const blist = JSON.parse(words);
    const badwords = blist.bannedwords;
    const chat = new RegExp("\\b(" + badwords.join("|") + ")\\b", "i");
    const owner = message.author.id

    const res = fs.readFileSync(`${__dirname}/../../bannedwords.json`);
    const rlist = JSON.parse(res);
    const response = rlist.responses;
    const respond = response[Math.floor(Math.random() * response.length)];

    if (!bot && message.content.includes(`<@${botId}>`)) {
      message.reply("You can use `/` to see the commands.");
    //} else if (!bot && chat.test(message.content)) {
      //message.reply(`<@${owner}> please refrain from saying badwords!`);
    } else if (!bot && chat.test(message.content)) {
      message.reply(respond);
    } else if (!bot && /\bpogi ba si ace?\b/i.test(message.content)) {
      message.reply(`Yes!`);
    }
  },
};

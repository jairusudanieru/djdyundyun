const { ActivityType } = require("discord.js");
const express = require("express");
const app = express();

module.exports = {
  name: "ready",
  once: true,
  async execute(client) {
    app.listen(3000, () => {
      console.log("Project is running!");
    });

    app.get("/", (req, res) => {
      res.send("Hello world!");
    });

    client.user.setPresence({
      activities: [{ name: "11-TVL-1", type: ActivityType.Listening }],
      status: "online",
    });
    console.log(`Ready! logged in as ${client.user.tag}`);
    
  },
};

const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("stop")
    .setDescription("Stop the song and leave the vc."),
  async execute(interaction, client) {
    // Get the current queue
    const queue = client.player.getQueue(interaction.guildId);

    if (!queue) {
      await interaction.reply("There are no songs in the queue.");
      return;
    }

    // Deletes all the songs from the queue and exits the channel
    queue.destroy();

    await interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setDescription(`**There are no songs in the queue. Leaving VC...**`)
          .setColor("#2f3136"),
      ],
    });
  },
};

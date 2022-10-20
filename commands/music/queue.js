const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("queue")
    .setDescription("Shows the songs in the queue."),

  async execute(interaction, client) {
    const queue = client.player.getQueue(interaction.guildId);

    // check if there are songs in the queue
    if (!queue || !queue.playing) {
      await interaction.reply("There are no songs in the queue.");
      return;
    }

    // Get the first 10 songs in the queue
    const queueString = queue.tracks
      .slice(0, 10)
      .map((song, i) => {
        return `**${i} - [${song.title}](${song.url})**`;
      })
      .join("\n");

    // Get the current song
    const currentSong = queue.current;

    await interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setDescription(
            `**Currently Playing:**\n` +
              (currentSong
                ? `**[${currentSong.title}](${currentSong.url})**`
                : "There are no songs in the queue.") +
              `\n\n**Queue:**\n${queueString}`
          )
          .setColor("#2f3136"),
      ],
    });
  },
};

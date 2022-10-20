const {
  SlashCommandBuilder,
  PermissionFlagsBits,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Dyun Dyun bot's Ping.")
    .setDefaultMemberPermissions(PermissionFlagsBits.UseApplicationCommands),
  async execute(interaction, client) {
    await interaction.reply({
      content: `${client.ws.ping}ms`,
      ephemeral: true,
    });
  },
};

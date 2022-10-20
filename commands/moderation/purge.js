const {
  SlashCommandBuilder,
  PermissionFlagsBits,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("purge")
    .setDescription("Delete up to 99 messages.")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
    .addIntegerOption((option) =>
      option.setName("amount").setDescription("Number of messages to delete.")
    ),
  async execute(interaction, client) {
    const amount = interaction.options.getInteger("amount");

    if (amount < 1 || amount > 99) {
      return interaction.reply({
        content: "You need to input a number between 1 and 99.",
        ephemeral: true,
      });
    }
    await interaction.channel.bulkDelete(amount, true).catch((error) => {
      console.error(error);

      interaction.reply({
        content: "There was an error trying to delete messages in this channel!",
        ephemeral: true,
      });
    });

    await interaction.reply({
      content: `Nadelete ko na ang ${amount} na mga messages.`,
      ephemeral: true,
    });
  },
};

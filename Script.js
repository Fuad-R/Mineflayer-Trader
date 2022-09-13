const mineflayer = require("mineflayer");
const mineflayerViewer = require('prismarine-viewer').mineflayer

const bot = mineflayer.createBot({
  host: "creative.ultravanilla.world",
  username: "Fuad_R",
  version: "1.18.2"
});

bot.on('messagestr', (message, messagePosition, jsonMsg) => {
  console.log(message)
})

bot.once('spawn', () => {
  mineflayerViewer(bot, { port: 3007, firstPerson: false })
})

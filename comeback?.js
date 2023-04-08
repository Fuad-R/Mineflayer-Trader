const mineflayer = require('mineflayer')

const bot = mineflayer.createBot({
  host: 'localhost',
  username: 'bot'
})

let mcData
bot.once('spawn', () => {
  mcData = require('minecraft-data')(bot.version)
})

bot.on('chat', (username, message) => {
  if (username === bot.username) return
  const args = message.split(' ')
  if (args[0] !== 'trade') return

  const firstVillagerPos = bot.entity.position.offset(1, 0, 0)
  const hallDirection = new Vec3(1, 0, 0)
  const tradeIndex = 0

  trade(firstVillagerPos, hallDirection, tradeIndex)
})

async function trade (firstVillagerPos, hallDirection, index) {
  let villagerPos = firstVillagerPos
  while (true) {
    const villager = bot.nearestEntity(entity => entity.position.distanceTo(villagerPos) < 3 && entity.mobType === 'Villager')
    if (!villager) return bot.chat("I don't see a villager nearby")

    await bot.openVillager(villager)
    const trade = villager.trades[index]
    if (!trade) return bot.chat("The specified trade isn't available")

    const emeraldCount = bot.inventory.items().filter(item => item.name === 'emerald').map(item => item.count).reduce((a, b) => a + b, 0)
    if (emeraldCount < trade.firstInput.value) return bot.chat("I don't have enough emeralds to make this trade")

    try {
      await bot.trade(villager, index, trade.firstInput.value)
      bot.chat("Trade completed")
    } catch (err) {
      bot.chat(`An error occurred while trying to trade: ${err.message}`)
    }

    await bot.closeWindow(villager.window)

    villagerPos = villagerPos.plus(hallDirection)
  }
}

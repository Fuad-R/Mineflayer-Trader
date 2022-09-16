const mineflayer = require('mineflayer')
const mineflayerViewer = require('prismarine-viewer').mineflayer
const inventoryViewer = require('mineflayer-web-inventory')
const Entity = require("prismarine-entity")('1.8.9')

const { pathfinder, Movements } = require('mineflayer-pathfinder')
const { GoalBlock } = require('mineflayer-pathfinder').goals

const bot = mineflayer.createBot({
    host: 'creative.ultravanilla.world', //! minecraft server ip
    username: 'Fuad_R', //! minecraft username
    //* password: '', // minecraft password, comment out if you want to log into online-mode=false servers
    //*  port: 25565,               // only set if you need a port that isn't 25565
    version: "1.18.2",              //* only set if you need a specific version or snapshot
    auth: 'microsoft',              //* only set if you need microsoft auth, then set this to 'microsoft
    keepAlive: 'false'
  })

  bot.once('spawn', () => {
    mineflayerViewer(bot, { port: 3007, firstPerson: false, viewDistance: 16 })
  })


bot.on('message', (message) => {
  console.log(message.toAnsi())
  //* bot.setControlState('back', true)
})

//* Log errors and kick reasons
bot.on('kicked', console.log)

bot.on('error', console.log)

//* Auto reconnect
bot.on('end', (reason) => {
  console.log("Bot ended")
  const bot = mineflayer.createBot({
    host: creative.ultravanilla.world,
    //* port: 
    username: Fuad_R,
    //* password: ,
    version: "1.18.2",
    //* verbose: true
  })
})

let options = {
  port: 3008,
  //* webPath: PATH,
  //* express: EXPRESS,
  //* app: APP,
  //* http: HTTP,
  //* io: IO,
  //* startOnLoad: True,
  //* windowUpdateDebounceTime: INT
}

inventoryViewer(bot, options)

bot.loadPlugin(pathfinder)

bot.once('spawn', () => {
  mineflayerViewer(bot, { port: 3000 })

  bot.on('path_update', (r) => {
    const nodesPerTick = (r.visitedNodes * 50 / r.time).toFixed(2)
    console.log(`I can get there in ${r.path.length} moves. Computation took ${r.time.toFixed(2)} ms (${nodesPerTick} nodes/tick). ${r.status}`)
    const path = [bot.entity.position.offset(0, 0.5, 0)]
    for (const node of r.path) {
      path.push({ x: node.x, y: node.y + 0.5, z: node.z })
    }
    bot.viewer.drawLine('path', path, 0xff00ff)
  })

  const mcData = require('minecraft-data')(bot.version)
  const defaultMove = new Movements(bot, mcData)

  bot.viewer.on('blockClicked', (block, face, button) => {
    if (button !== 2) return // only right click

    const p = block.position.offset(0, 1, 0)

    bot.pathfinder.setMovements(defaultMove)
    bot.pathfinder.setGoal(new GoalBlock(p.x, p.y, p.z))
  })
})

const entity = new Entity(0)
console.log(entity)

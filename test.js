const mineflayer = require('mineflayer')
const mineflayerViewer = require('prismarine-viewer').mineflayer
const inventoryViewer = require('mineflayer-web-inventory')

const bot = mineflayer.createBot({
    host: 'creative.ultravanilla.world', // minecraft server ip
    username: 'Fuad_R', //* minecraft username
    //* password: '', // minecraft password, comment out if you want to log into online-mode=false servers
    //*  port: 25565,                // only set if you need a port that isn't 25565
    version: "1.18.2",           //* only set if you need a specific version or snapshot (ie: "1.8.9" or "1.16.5"), otherwise it's set automatically
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
  http: HTTP,
  //* io: IO,
  startOnLoad: True,
  //* windowUpdateDebounceTime: INT
}

inventoryViewer(bot, options)
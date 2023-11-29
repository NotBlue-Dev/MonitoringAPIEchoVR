const GameServer = require("../../models/GameServer");
let router = require('express').Router();
const limiter = require('../../config/rateLimite');

router.use(limiter);
router.get('/listGameServers/:server', async function (req, res, next) {
  try {
    const gameServers = await GameServer.find({}).populate('serverIp', 'ip');
    // Modify the gameServers to include just the IP as a string
    const transformedGameServers = gameServers.map((gameServer) => {
      const { serverIp } = gameServer;
      if(serverIp.ip === req.params.server) {
        return {
          ...gameServer.toObject(),
          serverIp: serverIp ? serverIp.ip : null
        };
      }
      return null;
    });

    const filteredGameServers = transformedGameServers.filter(server => server !== null);

    if(filteredGameServers.length === 0) {
      return res.status(404).json({message:"No game server found"});
    }
    return res.json({message:"success", gameServers: filteredGameServers});
  } catch (err) {
    next(err);
  }
});

module.exports = router;

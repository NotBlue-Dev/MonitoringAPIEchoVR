const GameServer = require("../../models/GameServer");
let router = require('express').Router();
const limiter = require('../../config/rateLimite');

router.use(limiter);
router.get('/listGameServers/:server', async function (req, res, next) {
  try {
    const gameServers = await GameServer.find({}).populate('serverIP', 'ip');
    // Modify the gameServers to include just the IP as a string
    const transformedGameServers = gameServers.map((gameServer) => {
      const { serverIP } = gameServer;
      if(serverIP.ip === req.params.server) {
        return {
          ...gameServer.toObject(),
          serverIP: serverIP ? serverIP.ip : null
        };
      }
      return null;
    });

    const filteredGameServers = transformedGameServers.filter(server => server !== null);

    if(filteredGameServers.length === 0) {
      return res.status(404).json({message:"Server not found"});
    }
    return res.json({message:"success", gameServers: filteredGameServers});
  } catch (err) {
    next(err);
  }
});

module.exports = router;

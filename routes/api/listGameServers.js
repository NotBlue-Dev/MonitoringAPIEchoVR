const GameServer = require("../../models/GameServer");
let router = require('express').Router();
router.get('/listGameServers/:server', async function (req, res, next) {
  try {
    const gameServers = await GameServer.find({}).populate('serverIP', 'ip');

    // Modify the gameServers to include just the IP as a string
    const transformedGameServers = gameServers.map((gameServer) => {
      const { serverIP } = gameServer;
      return {
        ...gameServer.toObject(),
        serverIP: serverIP ? serverIP.ip : null
      };
    });

    res.json({ gameServers: transformedGameServers });
  } catch (err) {
    next(err);
  }
});

module.exports = router;

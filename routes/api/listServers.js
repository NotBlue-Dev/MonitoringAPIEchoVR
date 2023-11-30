const router = require('express').Router();
const Server = require('../../models/Server');
const limiter = require('../../config/rateLimite');

router.use(limiter);

router.get('/listServers', async function (req, res, next) {
  try {
    const servers = await Server.find({});

    const serversWithoutKey = servers.map(server => {
      const { key, ...serverWithoutKey } = server.toObject();
      return serverWithoutKey;
    });

    res.json({ servers: serversWithoutKey });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
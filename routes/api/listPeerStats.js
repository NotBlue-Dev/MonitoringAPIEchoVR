let router = require('express').Router();
const PeerStats = require("../../models/PeerStats");
const limiter = require('../../config/rateLimite');

router.use(limiter);

router.get('/listPeerStats/:server', async function (req, res, next) {
    try {
        const peerStats = await PeerStats.find({}).populate('serverIp', 'ip');
        // Modify the peerStats to include just the IP as a string
        const transformedPeerStats = peerStats.map((peerStat) => {
            const {serverIp} = peerStat
            if (serverIp.ip === req.params.server) {
                return {
                    ...peerStat.toObject(),
                    serverIp: serverIp ? serverIp.ip : null
                };
            }
            return null;
        });

        const filteredPeerStats = transformedPeerStats.filter(server => server !== null);

        if (filteredPeerStats.length === 0) {
            return res.status(404).json({message: "Server not found"});
        }
        return res.json({message: "success", peerStats: filteredPeerStats});
    } catch (err) {
        next(err);
    }
});

module.exports = router;

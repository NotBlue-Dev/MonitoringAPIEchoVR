let router = require('express').Router();
const PeerStats = require("../../models/PeerStats");


router.get('/listPeerStats/:server', async function (req, res, next) {
    try {
        const peerStats = await PeerStats.find({}).populate('serverIP', 'ip');
        // Modify the peerStats to include just the IP as a string
        console.log(peerStats);
        const transformedPeerStats = peerStats.map((peerStat) => {
            const {serverIP} = peerStat
            console.log(serverIP);
            if (serverIP.ip === req.params.server) {
                return {
                    ...peerStat.toObject(),
                    serverIP: serverIP ? serverIP.ip : null
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

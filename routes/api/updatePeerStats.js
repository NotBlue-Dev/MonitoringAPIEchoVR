const PeerStats = require("../../models/PeerStats");
let Server = require('../../models/Server');
const decryptMiddleware = require("../../config/decryptMiddleware");
let router = require('express').Router();

// router.use('/editGameServer/:sessionID', decryptMiddleware);
router.post('/updatePeerStats/:server', function(req, res, next){
    Server.find({ip: req.params.server}).then(result => {
        if(result.length === 0) {
            return res.status(404).json({message:"Server not found", server: req.body});
        } else {
            req.body.serverIP = result[0]._id;
            PeerStats.findOneAndUpdate(
                { serverIP: result[0]._id },
                { $set: req.body },
                { upsert: true, new: true, useFindAndModify: false }
            ).then(result => {
                return res.json({message: "success", peerStats: result});
            }).catch(error => {
                return res.status(500).json({error: error});
            });
        }
    });
});

module.exports = router;

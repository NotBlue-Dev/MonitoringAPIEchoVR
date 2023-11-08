const GameServer = require("../../models/GameServer");
let Server = require('../../models/Server');
const decryptMiddleware = require("../../config/decryptMiddleware");
let router = require('express').Router();
// let auth = require('../auth');

router.use('/editGameServer/:sessionID', decryptMiddleware);
router.post('/editGameServer/:sessionID', function(req, res, next){
  Server.find({ip: req.body.gameServer.serverIP}).then(result => {
    if(result.length === 0) {
        return res.status(404).json({message:"Server not found", server: req.body.gameServer});
    } else {
      req.body.gameServer.serverIP = result[0]._id;
      GameServer.updateOne({sessionID: req.params.sessionID}, {$set:req.body.gameServer}).then(result => {
        return res.json({message:"success", gameServer: req.body.gameServer});
      }).catch(error => {
        return res.status(500).json({error: error});
      });
    }
  });
});

module.exports = router;

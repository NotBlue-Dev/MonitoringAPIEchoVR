const GameServer = require("../../models/GameServer");
let router = require('express').Router();
let Server = require('../../models/Server');
const decryptMiddleware = require('../../config/decryptMiddleware');

// router.use('/addGameServer', decryptMiddleware);

router.post('/addGameServer', function(req, res, next){

  let gameServer = new GameServer(req.body);
  Server.find({ip: req.body.serverIP}).then(result => {
    if(result.length === 0) {
      return res.status(404).json({message:"Server not found", server: gameServer});
    }
    gameServer.serverIP = result[0]._id;

    gameServer.save().then(result => {
      return res.json({message:"success", gameServer: gameServer});
    })
  });


});

module.exports = router;

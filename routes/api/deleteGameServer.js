const GameServer = require("../../models/GameServer");
const decryptMiddleware = require("../../config/decryptMiddleware");
let router = require('express').Router();

// router.use('/deleteGameServer/:sessionID', decryptMiddleware);
router.delete('/deleteGameServer/:sessionID', function(req, res, next){
  GameServer.deleteOne({sessionID: req.params.sessionID}).then(result => {
    if(result.deletedCount > 0) {
      return res.json({message:"success", server: req.params.sessionID});
    }
    return res.status(404).json({message:"Game Server not found", server: req.params.server});
  }).catch(error => {
    return res.status(500).json({error: error});
  });
});

// router.get('/serverList', auth.required, function(req, res, next){
//   return res.json({user: "aaa"});
// });

module.exports = router;

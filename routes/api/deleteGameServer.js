const GameServer = require("../../models/GameServer");
let router = require('express').Router();
const decryptMiddleware = require("../../config/validateProviderMiddleware");
const validateProviderMiddleware = require('../../config/validateProviderMiddleware');

router.use('/deleteGameServer', validateProviderMiddleware);
router.delete('/deleteGameServer/:gameServerID', function(req, res, next){
  GameServer.deleteOne({gameServerID: req.params.gameServerID}).then(result => {
    if(result.deletedCount > 0) {
      return res.json({message:"success", server: req.params.gameServerID});
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

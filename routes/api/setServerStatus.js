const Server = require("../../models/Server");
let router = require('express').Router();
const validateRelayKey = require('../../config/validateRelayKey');

router.use('/setServerStatus', validateRelayKey);
router.post('/setServerStatus/:server', function(req, res, next){
  console.log(req.body);
  Server.updateOne({serverAddress: req.params.server}, {$set:req.body}).then(result => {
    if (result.matchedCount === 0) {
        return res.status(403).json({message:"Please contact notbluue on discord to get your key to central API"});
    }
    if(result.nModified === 0 && result.upserted === undefined) {
        return res.status(304).json({message:"Nothing was updated"});
    }
    return res.json({message:"success", server: req.body});
  }).catch(error => {
    return res.status(500).json({error: error});
  });
});

module.exports = router;

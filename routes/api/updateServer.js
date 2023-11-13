const Server = require("../../models/Server");
let router = require('express').Router();
const decryptMiddleware = require('../../config/decryptMiddleware');

// router.use('/editServer/:server', decryptMiddleware);

router.post('/updateServer/:server', function(req, res, next){
  Server.updateOne({ip: req.params.server}, {$set:req.body}).then(result => {
    if(result.nModified === 0) {
        return res.status(404).json({message:"Server not found", server: req.body});
    }
    return res.json({message:"success", server: req.body});
  }).catch(error => {
    return res.status(500).json({error: error});
  });
});

module.exports = router;
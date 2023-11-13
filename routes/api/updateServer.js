const Server = require("../../models/Server");
let router = require('express').Router();
const validateProviderMiddleware = require('../../config/validateProviderMiddleware');

router.use('/updateServer', validateProviderMiddleware);
router.post('/updateServer/:server', function(req, res, next){
  Server.updateOne({ip: req.params.server}, {$set:req.body}, {upsert: true, new: true, useFindAndModify: false}).then(result => {
    if(result.nModified === 0 && result.upserted === undefined) {
        return res.status(400).json({message:"Nothing was updated"});
    }
    return res.json({message:"success", server: req.body});
  }).catch(error => {
    return res.status(500).json({error: error});
  });
});

module.exports = router;

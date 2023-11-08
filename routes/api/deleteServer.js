let router = require('express').Router();
let Server = require('../../models/Server');

router.delete('/deleteServer/:server', function(req, res, next){
  Server.deleteOne({ip: req.params.server}).then(result => {
    if(result.deletedCount > 0) {
      return res.json({message:"success", server: req.params.server});
    }
    return res.status(404).json({message:"Server not found", server: req.params.server});
  }).catch(error => {
    return res.status(500).json({error: error});
  });
});

module.exports = router;

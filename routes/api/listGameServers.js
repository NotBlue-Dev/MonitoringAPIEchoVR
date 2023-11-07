let router = require('express').Router();


router.get('/listGameServers/:server', function(req, res, next){
  return res.json({user: req.params});
});

module.exports = router;

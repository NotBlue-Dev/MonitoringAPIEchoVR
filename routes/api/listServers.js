let router = require('express').Router();


router.get('/listServers', function(req, res, next){
  return res.json({user: "aaa"});
});

module.exports = router;

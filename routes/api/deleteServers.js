let router = require('express').Router();
// let auth = require('../auth');

router.delete('/deleteServers/:server', function(req, res, next){
  return res.json({user: req.params});
});

// router.get('/serverList', auth.required, function(req, res, next){
//   return res.json({user: "aaa"});
// });

module.exports = router;

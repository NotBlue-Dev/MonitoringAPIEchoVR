let router = require('express').Router();
// let auth = require('../auth');

router.get('/listServer', function(req, res, next){
  return res.json({user: "aaa"});
});

// router.get('/serverList', auth.required, function(req, res, next){
//   return res.json({user: "aaa"});
// });

module.exports = router;

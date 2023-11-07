let router = require('express').Router();
let Server = require('../../models/Server');
router.post('/addServer', function(req, res, next){
  let server = new Server();

  //check if server exist

  server.name = req.body.server.name;
  server.connectionInfo = req.body.server.connectionInfo;

  server.save().then(function(){
    return res.json({server: server.toJson()});
  }).catch(next);
});

// router.get('/serverList', auth.required, function(req, res, next){
//   return res.json({user: "aaa"});
// });

module.exports = router;

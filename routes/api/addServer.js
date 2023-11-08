let router = require('express').Router();
let Server = require('../../models/Server');
const decryptMiddleware = require('../../config/decryptMiddleware');

// router.use('/addServer', decryptMiddleware);
router.post('/addServer', function(req, res, next){
  let server = new Server(req.body);

  server.save().then(result => {
    return res.json({message:"success", server: req.body});
  }).catch(error => {
    return res.status(500).json({error: error});
  });
});

// router.get('/serverList', auth.required, function(req, res, next){
//   return res.json({user: "aaa"});
// });

module.exports = router;

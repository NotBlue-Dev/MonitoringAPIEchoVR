let router = require('express').Router();
let Server = require('../../models/Server');
const validateProviderMiddleware = require('../../config/validateProviderMiddleware');

router.use('/addServer', validateProviderMiddleware);
router.post('/addServer', function(req, res, next){
  console.log(req.body);
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

let router = require('express').Router();
let Server = require('../../models/Server');
const limiter = require('../../config/rateLimite');

router.use(limiter);
router.get('/listServers', function(req, res, next){
  Server.find({}, function(err, server) {
    res.json({servers: server});
  });
});

module.exports = router;

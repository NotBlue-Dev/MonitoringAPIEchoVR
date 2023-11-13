let router = require('express').Router();

router.use('/', require('./listServers'));
router.use('/', require('./listGameServers'));
router.use('/', require('./addServer'));
router.use('/', require('./addGameServer'));
router.use('/', require('./updateServer'));
router.use('/', require('./updateGameServer'));
router.use('/', require('./deleteServer'));
router.use('/', require('./deleteGameServer'));
router.use('/', require('./listPeerStats'));
router.use('/', require('./updatePeerStats'));
router.use(function(err, req, res, next){
  if(err.name === 'ValidationError'){
    return res.status(422).json({
      errors: Object.keys(err.errors).reduce(function(errors, key){
        errors[key] = err.errors[key].message;

        return errors;
      }, {})
    });
  }

  return next(err);
});

module.exports = router;
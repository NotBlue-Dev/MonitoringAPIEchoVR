let router = require('express').Router();

router.use('/', require('./listServers'));
router.use('/', require('./listGameServers'));
router.use('/', require('./addServer'));
router.use('/', require('./addGameServer'));
router.use('/', require('./editServer'));
router.use('/', require('./editGameServer'));
router.use('/', require('./deleteServers'));
router.use('/', require('./deleteGameServers'));

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
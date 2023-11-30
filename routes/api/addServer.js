const Server = require("../../models/Server");
let router = require('express').Router();
const dotenv = require('dotenv');
const validateServerOwner = require("../../config/validateServerOwner");
dotenv.config();

router.use('/addServer', validateServerOwner);
router.post('/addServer/', function(req, res, next){
    delete req.body.key;
    Server.updateOne({ip: req.body.ip}, {$set:req.body}, {upsert: true, new: true, useFindAndModify: false}).then(result => {
        if(result.nModified === 0 && result.upserted === undefined) {
            return res.status(400).json({message:"Nothing was updated"});
        }
        Server.findOne({_id: result.upserted[0]._id}).then(result => {
            if (result) {
                req.body.relayKey = result.key;
            }
            return res.json({message:"success", server: req.body});
        }).catch((err) => {
            return res.status(500).json({error: err});
        });
    }).catch(error => {
        return res.status(500).json({error: error});
    });
});

module.exports = router;

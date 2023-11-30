const gameServers = require('./gameServers');
const servers = require('./servers');
const peerStats = require('./peerStats');
const cron = require('node-cron');
const Server = require("../models/Server");

const fetchDataFromRelays = () => {
    Server.find({}, function(err, server) {
        if (err) {
            console.log(err);
        } else {
            server.forEach((server) => {
                gameServers.fetchGameServers(server.ip, server.key);
                servers.fetchServers(server.ip, server.key);
                peerStats.fetchPeerStats(server.ip, server.key);
            });
        }
    });
};

cron.schedule('*/1 * * * * ', fetchDataFromRelays);

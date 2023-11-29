const PeerStats = require("../models/PeerStats");
const Server = require("../models/Server");
const fetchPeerStats = (ip) => {
    const url = `http://${ip}:8080/peerStats`;

    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            Server.findOne({ip: data.serverIp}).then(result => {
                if(result) {
                    data.serverIp = result._id;
                    PeerStats.findOneAndUpdate(
                        { serverIp: result._id },
                        { $set: data },
                        { upsert: true, new: true, useFindAndModify: false }
                    ).catch(error => {
                        console.log(error);
                    });
                }
            });
        }).catch((err) => console.log(err.message));
}

module.exports = {
    fetchPeerStats
}
const PeerStats = require("../models/PeerStats");
const Server = require("../models/Server");
const fetchPeerStats = (ip, key) => {
    const url = `http://${ip}:8080/centralApi/peerStats`;

    fetch(url, {
        method: 'GET', // or 'POST', 'PUT', etc.
        headers: {
            'Content-Type': 'application/json',
            'X-Api-Key': key,
            // Add other headers as needed
        },
        // Add body for 'POST' or 'PUT' requests if necessary
    })
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
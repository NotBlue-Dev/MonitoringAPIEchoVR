const PeerStats = require("../models/PeerStats");
const Server = require("../models/Server");
const fetchPeerStats = (ip, key) => {
    const url = `http://${ip}:8080/centralapi/peerstats`;

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
            Server.findOne({serverAddress: data.serverAddress}).then(result => {
                if(result) {
                    data.serverAddress = result._id;
                    PeerStats.findOneAndUpdate(
                        { serverAddress: result._id },
                        { $set: data },
                        { upsert: true, new: true, useFindAndModify: false }
                    ).catch(error => {
                        console.log(error);
                    });
                }
            });
        }).catch((err) => console.log(err));
}

module.exports = {
    fetchPeerStats
}
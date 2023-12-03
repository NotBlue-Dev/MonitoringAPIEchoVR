const Server = require("../models/Server");
const GameServer = require("../models/GameServer");
const fetchGameServers = (ip, key) => {
    const url = `http://${ip}:8080/centralapi/sessionslist`;
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
            GameServer.find({}, (err, gameServers) => {
                if (err) {
                    console.log(err);
                } else {
                    gameServers.forEach((gameServer) => {
                        if (data.findIndex(obj => obj && obj.gameServerId === gameServer.gameServerId) === -1) {
                            GameServer.findOneAndDelete({gameServerId: gameServer.gameServerId}).catch((error) => {
                                console.log(error);
                            });
                        }
                    });
                }
            });
            let serverObjectIdForIp = [];
            data.forEach((gameServer) => {
                if (serverObjectIdForIp[gameServer.serverAddress] === undefined) {
                    Server.findOne({serverAddress: gameServer.serverAddress}).then(result => {
                        if (result) {
                            serverObjectIdForIp[gameServer.serverAddress] = result._id;
                            gameServer.serverAddress = result._id;
                            updateGameServer(gameServer);
                        }
                    }).catch((err) => console.log(err));
                } else {
                    gameServer.serverAddress = serverObjectIdForIp[gameServer.serverAddress];
                    updateGameServer(gameServer);
                }
            });
        })
        .catch((err) => console.log(err));
}

const updateGameServer = (gameServer) => {
    GameServer.findOneAndUpdate(
        {gameServerId: gameServer.gameServerId},
        {$set: gameServer},
        {upsert: true, new: true, useFindAndModify: false}
    ).catch((error) => {
        console.log(error.status);
    });
}

module.exports = {
    fetchGameServers
}



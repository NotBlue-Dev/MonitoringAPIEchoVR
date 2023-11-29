const Server = require("../models/Server");
const GameServer = require("../models/GameServer");
const fetchGameServers = (ip) => {
    const url = `http://${ip}:8080/sessionsList`;

    fetch(url)
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
                if (serverObjectIdForIp[gameServer.serverIp] === undefined) {
                    Server.findOne({ip: gameServer.serverIp}).then(result => {
                        if (result) {
                            serverObjectIdForIp[gameServer.serverIp] = result._id;
                            gameServer.serverIp = result._id;
                            updateGameServer(gameServer);
                        }
                    }).catch((err) => console.log(err));
                } else {
                    gameServer.serverIp = serverObjectIdForIp[gameServer.serverIp];
                    updateGameServer(gameServer);
                }
            });
        })
        .catch((err) => console.log(err.message));
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



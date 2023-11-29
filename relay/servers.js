const Server = require("../models/Server");
const fetchServers = (ip) => {
    const url = `http://${ip}:8080/relay`;

    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            Server.updateOne({ip: data.ip}, {$set:data}, {upsert: true, new: true, useFindAndModify: false}).catch(error => {
                console.log(error);
            });
        }).catch((err) => console.log(err));
}

module.exports = {
    fetchServers
}
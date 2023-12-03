const Server = require("../models/Server");
const fetchServers = (ip, key) => {
    const url = `http://${ip}:8080/centralapi/relay`;

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
            Server.updateOne({serverAddress: data.serverAddress}, {$set:data}, {upsert: true, new: true, useFindAndModify: false}).catch(error => {
                console.log(error);
            });
        }).catch((err) => console.log(err));
}

module.exports = {
    fetchServers
}
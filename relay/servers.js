const Server = require("../models/Server");
const fetchServers = (ip, key) => {
    const url = `http://${ip}:8080/centralApi/relay`;

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
            Server.updateOne({ip: data.ip}, {$set:data}, {upsert: true, new: true, useFindAndModify: false}).catch(error => {
                console.log(error);
            });
        }).catch((err) => console.log(err.message));
}

module.exports = {
    fetchServers
}
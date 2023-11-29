# Project

This project is a simple API that returns a list of online servers, the data are being set by relay client,
For now [EchoRelay](https://github.com/EchoTools/EchoRelay/tree/main) from EchoTools version.
The points of this API is having live data about servers and game servers allowing better server browser for user experience.

# Endpoints

##### You must only use those 2 endpoints, the other endpoints are for relay client to set data.

``/api/listServers``
Returns all online servers

```json
"servers": [
    {
        "_id": "654ca2834765cc7b60e95639",
        "ip": "192.168.1.1",
        "apiservice_host": "http://192.168.1.1:777/api",
        "configservice_host": "ws://192.168.1.1:777/config",
        "loginservice_host": "ws://192.168.1.1:777/login?auth=AccountPassword&displayname=AccountName",
        "matchingservice_host": "ws://192.168.1.1:777/matching",
        "serverdb_host": "ws://192.168.1.1:777/serverdb",
        "online":true,
        "transactionservice_host": "ws://192.168.1.1:777/transaction",
        "publisher_lock": "rad15_live",
        "__v": 0
    }
]
```

``/api/listGameServers``

Returns all online game servers
```json
"gameServers": [
    {
        "region": ""
        "serverIp": {
            "id":"",
            "ip":""
        },
        "gameServerID":""
        "level": "",
        "assigned":false,
        "gameMode": "",
        "playerCount": 0
        "sessionID": "",
        "public": true
    }
]
```

``/api/listPeerStats``

Returns server peer stats
```json
"peerStats": [
    {
        "gameServers": 1,
        "login": 1,
        "transaction": 0,
        "matching": 0,
        "config": 0,
        "serverdb": 0,
    }
]
```

## Rate limits : 

100 request per 15 minutes per Ip

## Post request

Only the relay client can send data to the API (the IP that created the server is the only one able to edit / delete it).


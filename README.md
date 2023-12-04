# Project

This project is a simple API that returns a list of online servers, the data are being set by relay client,
For now [EchoRelay](https://github.com/EchoTools/EchoRelay/tree/main) from EchoTools version.
The points of this API is having live data about servers and game servers allowing better server browser for user experience.

# Server URL 
http://51.75.140.182:3000/

# Endpoints

##### You must only use those 3 endpoints, the other endpoints are for relay client to set data.

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
        "isOnline":true,
        "transactionservice_host": "ws://192.168.1.1:777/transaction",
        "publisher_lock": "rad15_live",
        "__v": 0
    }
]
```

``/api/listGameServers/{serverIp}``

Returns all online game servers
```json
"gameServers": [
    {
        "region": ""
        "serverIp": {
            "id":"",
            "ip":""
        },
        "gameServerId":""
        "level": "",
        "gameMode": "",
        "playerCount": 0,
        "isLocked":true,
        "playerLimit": 0,
        "activePlayerLimit":0,
        "sessionIp":"",
        "sessionId": "",
        "isPublic": true
    }
]
```

``/api/listPeerStats/{serverIp}``

Returns server peer stats
```json
"peerStats": [
    {
        "gameServer": 1,
        "login": 1,
        "transaction": 0,
        "matching": 0,
        "config": 0,
        "serverDb": 0,
    }
]
```

## Rate limits : 

100 request per 15 minutes per Ip

# Add server

To add a server you must use the following endpoint : 

``/api/addServer``

You must send a POST request with those parameters : 

```json
{
  "ip":"IP",
  "apiservice_host": "http://IP:PORT/api",
  "configservice_host": "ws://IP:PORT/config",
  "loginservice_host": "ws://IP:PORT/login?auth=AccountPassword&displayname=AccountName",
  "matchingservice_host": "ws://IP:PORT/matching",
  "serverdb_host": "ws://IP:PORT/serverdb",
  "transactionservice_host": "ws://IP:PORT/transaction",
  "publisher_lock": "rad15_live",
  "isOnline":"true"
}
```

In header you must add the master API Key for the central server

``X-Api-Key``

this will return an object with a "relayKey": containing a uuid that you will use with your relay

``--centralapikey "relayKey"``

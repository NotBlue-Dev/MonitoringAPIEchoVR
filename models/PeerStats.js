const mongoose = require('mongoose');

const peerStatsSchema = new mongoose.Schema({
    serverIP: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Server',
    },
    gameServers: {
        type: Number,
    },
    login : {
        type: Number,
    },
    matching : {
        type: Number,
    },
    config : {
        type: Number,
    },
    transaction : {
        type: Number,
    },
    serverdb: {
        type: Number,
    }
});

const PeerStats = mongoose.model('PeerStats', peerStatsSchema);

module.exports = PeerStats;
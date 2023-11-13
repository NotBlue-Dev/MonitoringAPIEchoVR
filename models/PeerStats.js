const mongoose = require('mongoose');

const peerStatsSchema = new mongoose.Schema({
    serverIP: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Server',
    },
    gameServers: {
        type: Number,
        default: 0,
    },
    login : {
        type: Number,
        default: 0,
    },
    matching : {
        type: Number,
        default: 0,
    },
    config : {
        type: Number,
        default: 0,
    },
    transaction : {
        type: Number,
        default: 0,
    },
    serverdb: {
        type: Number,
        default: 0,
    }
});

const PeerStats = mongoose.model('PeerStats', peerStatsSchema);

module.exports = PeerStats;
const mongoose = require('mongoose');

const peerStatsSchema = new mongoose.Schema({
    serverIP: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Server',
    },
    gameServers: {
        type: Number,
        required: true,
    },
    login : {
        type: Number,
        required: true,
    },
    matching : {
        type: Number,
        required: true,
    },
    config : {
        type: Number,
        required: true,
    },
    transaction : {
        type: Number,
        required: true,
    },
    serverdb: {
        type: Number,
        required: true,
    }
});

const PeerStats = mongoose.model('PeerStats', peerStatsSchema);

module.exports = PeerStats;
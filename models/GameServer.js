const mongoose = require('mongoose');

const gameServerSchema = new mongoose.Schema({
    server: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Server', // Reference to the server that this game server belongs to
    },
    region: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    gameMode: {
        type: String,
        required: true,
    },
    ping: {
        type: Number,
        required: true,
    },
    playerCount: {
        type: Number,
        required: true,
    },
    sessionID: {
        type: String,
        required: true,
    },

});

const GameServer = mongoose.model('GameServer', gameServerSchema);

module.exports = GameServer;
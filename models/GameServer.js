const mongoose = require('mongoose');

const gameServerSchema = new mongoose.Schema({
    region: {
        type: String,
        required: true,
    },
    serverIP: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Server',
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
    public: {
        type: Boolean,
        required: true,
    }

});

const GameServer = mongoose.model('GameServer', gameServerSchema);

module.exports = GameServer;
const mongoose = require('mongoose');

const gameServerSchema = new mongoose.Schema({
    serverIP: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Server',
    },
    region: {
        type: String,
    },
    gameServerID: {
        type: Number,
    },
    level: {
        type: String,
    },
    assigned: {
        type: Boolean,
    },
    gameMode: {
        type: String,
    },
    playerCount: {
        type: Number,
    },
    sessionID: {
        type: String,
    },
    public: {
        type: Boolean,
    }

});

const GameServer = mongoose.model('GameServer', gameServerSchema);

module.exports = GameServer;
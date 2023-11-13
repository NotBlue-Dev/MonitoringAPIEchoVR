const mongoose = require('mongoose');

const gameServerSchema = new mongoose.Schema({
    region: {
        type: String,
    },
    serverIP: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Server',
    },
    type: {
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
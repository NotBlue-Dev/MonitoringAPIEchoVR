const mongoose = require('mongoose');

const gameServerSchema = new mongoose.Schema({
    serverIP: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Server',
    },
    region: {
        type: String,
        default: '',
    },
    gameServerID: {
        type: Number,
    },
    level: {
        type: String,
        default: 'Loading',
    },
    assigned: {
        type: Boolean,
        default: false,

    },
    gameMode: {
        type: String,
        default: '',
    },
    playerCount: {
        type: Number,
        default: 0,
    },
    sessionID: {
        type: String,
        default: '',
    },
    public: {
        type: Boolean,
        default: false,
    }

});

const GameServer = mongoose.model('GameServer', gameServerSchema);

module.exports = GameServer;
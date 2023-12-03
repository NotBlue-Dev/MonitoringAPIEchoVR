const mongoose = require('mongoose');

const gameServerSchema = new mongoose.Schema({
    serverAddress: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Server',
    },
    region: {
        type: String,
        default: '',
    },
    gameServerId: {
        type: Number,
    },
    level: {
        type: String,
        default: 'Loading',
    },
    gameMode: {
        type: String,
        default: '',
    },
    playerCount: {
        type: Number,
        default: 0,
    },
    sessionIp: {
        type: String,
        default: '',
    },
    sessionId: {
        type: String,
        default: '',
    },
    isLocked: {
        type: Boolean,
        default: false,
    },
    isPublic: {
        type: Boolean,
        default: false,
    },
    playerLimit: {
        type: Number,
        default: 0,
    },
    activePlayerLimit: {
        type: Number,
        default: 0,
    }

});

const GameServer = mongoose.model('GameServer', gameServerSchema);

module.exports = GameServer;
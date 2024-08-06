import mongoose from 'mongoose';

const playerSchema = new mongoose.Schema({
    player: {
        name: {
            type: String,
            required: true
        },
        team: {
            type: Number,
            required: true
        },
        id: {
            type: Number,
            required: true
        },
        admin: {
            type: Boolean,
            default: false
        },
        position: {
            type: String,  
            default: null
        }
    },
    stats: {
        timePlay: {
            type: Number,
            default: 0
        },
        goals: {
            type: Number,
            default: 0
        },
        asists: {
            type: Number,
            default: 0
        },
        goalsAgainst: {
            type: Number,
            default: 0
        },
        undefeatedFences: {
            type: Number,
            default: 0
        },
        gamesPlayed: {
            type: Number,
            default: 0
        },
        gamesWon: {
            type: Number,
            default: 0
        },
        gamesLoss: {
            type: Number,
            default: 0
        },
        averageGoal: {
            type: Number,
            default: 0
        },
        averageAssist: {
            type: Number,
            default: 0
        },
        winRate: {
            type: Number,
            default: 0
        },
        mvp: {
            type: Number,
            default: 0
        },
        maxInvictus: {
            type: Number,
            default: 0
        },
        elo: {
            type: Number,
            default: 0
        },
        range: {
            type: String,
            default: "🔸 Iniciado 🔸"
        },
        lvl: {
            type: Number,
            default: 1
        },
        exp: {
            type: Number,
            default: 0
        },
        ADTCoins: {
            type: Number,
            default: 0
        }
    },
    controlParams: {
        inRoom: {
            type: Boolean,
            default: false
        },
        timeOnCourt: {
            type: Number,
            default: 0
        },
        timeAfk: {
            type: Number,
            default: 0
        },
        timeInactive: {
            type: Number,
            default: 0
        },
        isAfk: {
            type: Boolean,
            default: false
        },
        afkTimeout: {
            type: Number,
            default: null
        },
        afkInterval: {
            type: Number,
            default: null
        },
        inactiveCount: {
            type: Number,
            default: 0
        },
        historyMessage: {
            type: [String],  
            default: []
        },
        messageTimestamps: {
            type: [Number], 
            default: []
        },
        ranked: {
            type: Boolean,
            default: false
        },
        kicksCount: {
            type: Number,
            default: 0
        },
        isMuted: {
            type: Boolean,
            default: false
        },
        vip: {
            type: Boolean,
            default: false
        },
        login: {
            type: Boolean,
            default: false
        },
        register: {
            type: Boolean,
            default: false
        },
        mvpPoints: {
            type: Number,
            default: 0
        }
    },
    authId: {
        type: String,
        required: true
    },
    connId: {
        type: String,
        required: true
    }
});

export const PlayerFormat = mongoose.model("PlayerFormat", playerSchema);
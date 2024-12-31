if (typeof require === 'function') {
    var Classy = require('./classy');
}
var PlayerDetails = Classy.newClass().name('PlayerDetails');
PlayerDetails.fields({
    data: {
        playerId: null,
        username: null,
        victories: 0,
        kills: 0,
        deaths: 0,
        suicides: 0,
        surrenders: 0,
        experience: 0,
        turretColour: null,
        treadColour: null,
        baseColour: null,
        turretAccessory: null,
        barrelAccessory: null,
        frontAccessory: null,
        backAccessory: null,
        treadAccessory: null,
        backgroundAccessory: null,
        badge: null,
        email: null,
        lastLogin: null,
        created: null,
        realName: null,
        birthYear: null,
        country: null,
        newsSubscriber: false,
        gmLevel: 0,
        beta: false,
        verified: false,
        banned: null,
        usernameApproved: null,
        premium: false,
        guest: false,
        rank: 0,
        xp: 0,
        lastForumPost: 0
    }
})
PlayerDetails.constructor(function() {});
PlayerDetails.constructor('withObject', function(obj) {
    this.data = obj;
});
PlayerDetails.methods({
    getPlayerId: function() {
        return this.data.playerId;
    },
    getUsername: function() {
        return this.data.username;
    },
    getVictories: function() {
        return this.data.victories;
    },
    getKills: function() {
        return this.data.kills;
    },
    getDeaths: function() {
        return this.data.deaths;
    },
    getSuicides: function() {
        return this.data.suicides;
    },
    getSurrenders: function() {
        return this.data.surrenders;
    },
    getExperience: function() {
        return this.data.experience;
    },
    getTurretColour: function() {
        return this.data.turretColour;
    },
    getTreadColour: function() {
        return this.data.treadColour;
    },
    getBaseColour: function() {
        return this.data.baseColour;
    },
    getTurretAccessory: function() {
        return this.data.turretAccessory;
    },
    getBarrelAccessory: function() {
        return this.data.barrelAccessory;
    },
    getFrontAccessory: function() {
        return this.data.frontAccessory;
    },
    getBackAccessory: function() {
        return this.data.backAccessory;
    },
    getTreadAccessory: function() {
        return this.data.treadAccessory;
    },
    getBackgroundAccessory: function() {
        return this.data.backgroundAccessory;
    },
    getBadge: function() {
        return this.data.badge;
    },
    getEmail: function() {
        return this.data.email;
    },
    getLastLogin: function() {
        return this.data.lastLogin;
    },
    getCreated: function() {
        return this.data.created;
    },
    getRealName: function() {
        return this.data.realName;
    },
    getBirthYear: function() {
        return this.data.birthYear;
    },
    getCountry: function() {
        return this.data.country;
    },
    getNewsSubscriber: function() {
        return this.data.newsSubscriber;
    },
    getGmLevel: function() {
        return this.data.gmLevel;
    },
    getBeta: function() {
        return this.data.beta;
    },
    getVerified: function() {
        return this.data.verified;
    },
    getBanned: function() {
        return this.data.banned;
    },
    getUsernameApproved: function() {
        return this.data.usernameApproved;
    },
    getPremium: function() {
        return this.data.premium;
    },
    getGuest: function() {
        return this.data.guest;
    },
    getRank: function() {
        return this.data.rank;
    },
    getXP: function() {
        return this.data.xp;
    },
    getLastForumPost: function() {
        return this.data.lastForumPost;
    },
    toObj: function() {
        return this.data;
    }
});
if (typeof module === 'object') {
    module.exports = PlayerDetails;
}

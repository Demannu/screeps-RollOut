var powerUtility = {
    run: function(spawn) {
        var utility = require('utility.maintain');
        var data = utility.extPOS()
        var X = data[0];
        var Y = data[1];
        var W = data[2];
        var H = data[3];
        console.log(data);
        for(var i = 0; i < W; i++) {
            for(var x = 0; x < H; x++){
                spawn.room.createConstructionSite((X + i), (Y + x), STRUCTURE_EXTENSION);
            }
        }
    spawn.memory.powered = false;
    }
};

module.exports = powerUtility;
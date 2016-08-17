var powerUtility = {
    /* Build a rectange building of predefined size and shape */
    buildSquare: function(spawn, data, type) {
        var utility = require('utility.maintain');
        var X = data[0];
        var Y = data[1];
        var W = data[2];
        var H = data[3];
        for(var i = 0; i < W; i++) {
            for(var x = 0; x < H; x++){
                spawn.room.createConstructionSite((X + i), (Y + x), type);
            }
        }
        spawn.memory.powered = false;
    },
    /* Generate flags in all accessible areas around a source */
    sourceSlots: function(thisRoom,thisSources) {
        for(var source in thisSources){
            for(var x = -1; x < 2; x++){
                for(var y = -1; y <2; y++){
                    var origin_x = thisSources[source].pos.x + x;
                    var origin_y = thisSources[source].pos.y + y;
                    var terrain = Game.map.getTerrainAt(origin_x, origin_y, thisRoom.name);
                    switch(terrain){
                        case 'plain':
                        case 'swamp':
                            var flagName = 'Source_Slot' + Math.floor(Math.random() *100);
                            var finalPOS = new RoomPosition(origin_x, origin_y, thisRoom.name).createFlag(flagName);
                            Game.flags[flagName].memory.taken = false;
                            Game.rooms[thisRoom.name].memory.mapped = true;
                            break;
                    }
                }
            }
        }
    }
};

module.exports = powerUtility;
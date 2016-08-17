var powerUtility = require('behavior.power');
var roleSpawner = {
    run: function(spawn) {
        if(spawn.memory.powered){
            powerUtility.buildExtensions(spawn, [20,30,2,2]);
        }
        this.creepLogic(spawn);
    },
    creepLogic: function(spawn){
        var utility = require('utility.maintain');
        var harvesters = utility.findSpecificCreeps('harvesters').length;
        var upgraders = utility.findSpecificCreeps('upgraders').length;
        var builders = utility.findSpecificCreeps('builders').length;
        var extensions = utility.findExtensions(spawn);
        if(((spawn.room.energyAvailable / spawn.room.energyCapacityAvailable)* 100) > 75){
            if(!spawn.spawning){
                var size = 1;
                if(extensions.length >= 5){
                    size = 2;
                } else if (extensions.length >= 8){
                    size = 3;
                } else if (extensions.length >= 10){
                    size = 4;
                }
                if(harvesters < utility.limiter('harvesters')){
                    this.creepSpawn(spawn,'harvesters',1);
                } else if(upgraders < utility.limiter('upgraders')){
                    this.creepSpawn(spawn,'upgraders',1);
                } else if(builders < utility.limiter('builders')){
                    this.creepSpawn(spawn,'builders',1);
                }
            }
        }
        if((Game.time % 5) < 1){
            console.log('[GATHER] ' + harvesters + ' / ' + utility.limiter('harvesters') + ' [UPGRDE] ' + upgraders + ' / ' + utility.limiter('upgraders') + ' [BUILD] ' + builders + ' / ' + utility.limiter('builders') + ' [ENERGY] ' + spawn.room.energyAvailable + ' / ' + spawn.room.energyCapacityAvailable); 
        }
    },
    creepSpawn: function(spawn, type, size) {
        switch(size) {
            case 1:
                var buildOut = [WORK,CARRY,MOVE];
                break;
            case 2:
                var buildOut = [WORK,WORK,CARRY,MOVE,MOVE];
                break;
            case 3:
                var buildOut = [WORK,WORK,CARRY,CARRY,MOVE,MOVE];
                break;
            case 4:
                var buildOut = [WORK,WORK,WORK,CARRY,MOVE,MOVE];
                break;
            case 5:
                var buildOut = [WORK,CARRY,CARRY,CARRY,MOVE,MOVE];
                break;
            case 6:
                var buildOut = [WORK, CARRY, CARRY, MOVE, MOVE];
                break;
        }
        var newName = spawn.createCreep(buildOut, undefined, {role: type});
    }
};

module.exports = roleSpawner;

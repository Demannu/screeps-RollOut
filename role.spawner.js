var roleSpawner = {
    run: function(spawn) {
        var powered = require('behavior.power');
        if(spawn.memory.powered){
            powered.run(spawn);
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
                }
                if(upgraders < utility.limiter('upgraders') && ((upgraders / utility.limiter('upgraders'))* 100) > 60){
                    this.creepSpawn(spawn,'upgraders',1);
                }
                if(builders < utility.limiter('builders') && ((builders / utility.limiter('builders'))* 100) > 60){
                    this.creepSpawn(spawn,'builders',1);
                }
            }
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

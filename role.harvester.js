var roleHarvester = {
    run: function(creep) {
        var creepUtility = require('behavior.utility');
        if(creep.carry.energy < creep.carryCapacity) {
            creepUtility.findEnergySource(creep);
        }
        else {
            var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) && structure.energy < structure.energyCapacity;
                    }
            });
            if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                }
            } else {
                creep.moveTo(Game.spawns.homeSpawn);
            }
        }
    }
};

module.exports = roleHarvester;
var creepUtility = {
    doWork: function(creep,job) {
        if(creep.memory[job] && creep.carry.energy == 0) {
            creep.memory[job] = false;
            creep.say(job);
        }
        if(!creep.memory[job] && creep.carry.energy == creep.carryCapacity) {
            creep.memory[job] = true;
            creep.say(job);
        }
    },
    findEnergySource: function(creep) {
        var sources = creep.room.find(FIND_SOURCES);
        if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
            creep.moveTo(sources[0]);
        }
    },
    findEnergyStorage: function(creep) {
        var targets = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN);
            }
        });
        var target = creep.pos.findClosestByRange(targets);
        if(creep.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(target);           
        }

    },
    moveTargets: function(creep,targets,task) {
        if(targets.length > 0) {
            var target = creep.pos.findClosestByRange(targets);
            if(creep[task](target) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
            }
        }
    }
};

module.exports = creepUtility;
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
    findFlags: function(creep) {
        var result = _(Game.flags).filter({ memory: { taken: false}}).value();
        return result;
    },
    moveTargets: function(creep,targets,task) {
        if(targets.length > 0) {
            var target = creep.pos.findClosestByRange(targets);
            if(creep[task](target) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
            }
        }
    },
    moveTo: function(creep, target){
        creep.moveTo(target);
    },
    reserveSlot: function(creep, flag){
        flag.memory.taken = true;
        creep.memory.assigned = true;
        console.log('The flag ID is: ' + flag.pos);
        creep.memory.flagID = flag.pos;
        
    },
    releaseSlot: function(creep,flag){
        flag[0].memory.taken = false;
        creep.memory.assigned = false;
        creep.memory.flagID = false;
    }
};

module.exports = creepUtility;
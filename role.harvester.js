var creepUtility = require('behavior.utility');
var roleHarvester = {
    run: function(creep) {
        if(creep.carry.energy < creep.carryCapacity) {
            if(creep.memory.assigned){
                console.log('Memory is assigned for ' + creep);
                var flag = creep.memory.flagID;
                console.log('Flag ID is: ' + flag);
                if(creep.pos.x == flag['x'] && creep.pos.y == flag['y'] && creep.pos.roomName == flag['roomName']){
                    console.log('At flag: ' + creep);
                    creepUtility.findEnergySource(creep);
                } else{
                    console.log('Attempting to move to: ' + flag);
                    creep.moveTo(flag['x'], flag['y'], flag['room']);
                }
            } else {
                var flagsList = creepUtility.findFlags(creep);
                console.log(flagsList);
                for(var flag in flagsList){
                    var flag = flagsList[flag];
                    console.log(flag);
                    var flagNm = flag.name;
                    var flagName = flagNm.split("_");
                    if(flagName[0] == "Source"){
                        console.log('Running on creep: ' + creep);
                        console.log('Flag is set to: ' + flag.memory.taken);
                        if(!flag.memory.taken){
                            console.log('Flag is not taken');
                            console.log(flag);
                            creepUtility.reserveSlot(creep,flag);
                            creep.moveTo(Game.flags[flag]);
                            console.log('Moving to: ' + flag);
                            break;
                        }
                    }
                }
            }
        }
        else {
            var found = creep.room.lookForAt(LOOK_FLAGS, 34, 20);
            console.log('Found room at: ' + found);
            creepUtility.releaseSlot(creep, found);
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
                creep.moveTo(creepUtility.findEnergyStorage(creep));
            }
        }
    }
};

module.exports = roleHarvester;
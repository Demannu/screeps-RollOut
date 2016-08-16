var utility = {
    limiter: function(type) { 
    	if(type == 'harvesters'){
            return 4;
        }
        if(type == 'builders'){
            return 2;
        }
        if(type == 'upgraders'){
            return 2;
        }
    },
    extPOS: function() { return [10,20,3,5]; },     // X,Y,Width,Height of extension field
    
    sweepCreep: function(){
        for(var name in Memory.creeps) {
            if(!Game.creeps[name]) {
                delete Memory.creeps[name];
                console.log('Clearing non-existing creep memory:', name);
            }
        }
    },
    findExtensions: function(spawn) {
        return spawn.room.find(FIND_MY_STRUCTURES, {
            filter: { structureType: STRUCTURE_EXTENSION }
        });
    },
    findSpecificCreeps: function(type) {
        return _.filter(Game.creeps, (creep) => creep.memory.role == type);
    }
};

module.exports = utility;
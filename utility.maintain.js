var utility = {
    limiter: function(type) { 
    	switch(type){
    		case 'harvesters':
    			return 4;
    			break;
    		case 'builders':
    			return 2;
    			break;
    		case 'upgraders':
    			return 2;
    			break;
    	}
    },
    extPOS: function() { return [21,24,2,3]; },     // X,Y,Width,Height of extension field
    
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
    },
    findSources: function(spawn) {
    	return Game.spawns[spawn].room.find(FIND_SOURCES);
    }
};

module.exports = utility;
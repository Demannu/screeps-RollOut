var roleBuilder = {
    run: function(creep) {
        var creepUtility = require('behavior.utility');
        creepUtility.doWork(creep, "building");
	    if(creep.memory.building) {
	        var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
	        creepUtility.moveTargets(creep,targets,'build');
	    }
	    else { creepUtility.findEnergyStorage(creep); }
	}
};

module.exports = roleBuilder;
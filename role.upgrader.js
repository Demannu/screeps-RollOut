var roleUpgrader = {
    run: function(creep) {
        var creepUtility = require('behavior.utility');
        creepUtility.doWork(creep,"upgrading");
        if(creep.memory.upgrading) {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }
        }
        else { creepUtility.findEnergySource(creep); }
    }
};

module.exports = roleUpgrader;
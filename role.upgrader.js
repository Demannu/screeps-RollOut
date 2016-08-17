var creepUtility = require('behavior.utility');
var roleUpgrader = {
    run: function(creep) {
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
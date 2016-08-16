// Demannu Roll-Out Strategy
// 8/15/2016; Michael Gagliano

/* Required Sub-Modules
    Behaviors:
        behavior.utility | Linked within role.*
    Creeps:
        role.builder
        role.harvester
        role.upgrader
    Spawns:
        role.spawner
    Utility:
        utility.configure
        utility.maintain
*/

/* Start Instructions
    Game.spawns.spawnerName.memory.role = 'spawners';
    Set an energy barrier in configure
*/
var roleBuilder = require('role.builder');
var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleSpawner = require('role.spawner');

var utility = require('utility.maintain');
// End Module Requirements

module.exports.loop = function () {
    for(var spawnName in Game.spawns){
        /* Studder Step (50 ticks) */
        if((Game.time % 50) < 1){
            utility.sweepCreep();
        }
        var thisSpawner = spawnName;
    }
    /* Attach C&C to Objects */
    var list = ['creeps','spawns'];
    for(var item in list) {
        for(var name in Game[list[item]]) {
            var thing = Game[list[item]][name];
            switch(thing.memory.role){
                case "spawners":
                    roleSpawner.run(thing);
                    break;
                case "harvesters":
                    roleHarvester.run(thing);
                    break;
                case "builders":
                    roleBuilder.run(thing);
                    break;
                case "upgraders":
                    roleUpgrader.run(thing);
                    break;
            }
        }
    }
}
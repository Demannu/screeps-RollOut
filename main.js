// Demannu Roll-Out Strategy
<<<<<<< HEAD
// 8/17/2016; 
=======
>>>>>>> origin/master

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
var powerUtility = require('behavior.power');
// End Module Requirements

module.exports.loop = function () {
    for(var spawnName in Game.spawns){
        var thisSpawner = spawnName;
        var thisRoom = Game.spawns[thisSpawner].room;
        var thisSources = utility.findSources(thisSpawner);
        if(!Game.rooms[thisRoom.name].memory.mapped){
            powerUtility.sourceSlots(thisSpawner,thisRoom,thisSources);
        }
    }
    /* Attach C&C to Objects */
    if((Game.time % 50) < 1){
        utility.sweepCreep();
    }
    var list = ['creeps','spawns'];
    for(var item in list) {
        for(var name in Game[list[item]]) {
            var thing = Game[list[item]][name];
            if(list[item] == 'spawns'){
                thing.memory.role='spawners';
            }
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

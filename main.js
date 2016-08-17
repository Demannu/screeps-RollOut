// Demannu Roll-Out Strategy
// 8/17/2016; 

/* Required Sub-Modules
    Behaviors:
        behavior.utility | Linked within role.*
        behavior.power
    Creeps:
        role.builder
        role.harvester
        role.upgrader
    Spawns:
        role.spawner
    Utility:
        utility.maintain
*/

/* Start Instructions
    Place Spawner in Suitable Area
    > Spawner will automatically produce harvesters
    >> Harvesters will automatically start gathering and supplying spawn
    > Once you have a few creeps, configure extPOS in utility.maintain
    >> Set spawner.memory.powered = true
    >> It will automatically turn off once the area has been constructed
*/
var roleBuilder = require('role.builder');
var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleSpawner = require('role.spawner');
var utility = require('utility.maintain');
var powerUtility = require('behavior.power');
// End Module Requirements

module.exports.loop = function () {
    /* Loop through owned rooms */
    for(var room in Game.rooms){
        var thisRoom = Game.rooms[room];
        console.log(room);
        console.log(thisRoom);
        var thisSources = utility.findSources(thisRoom);
        if(!Game.rooms[thisRoom.name].memory.mapped){
            powerUtility.sourceSlots(thisRoom,thisSources);
        }
    }
    /* Remove dead creeps from memory */
    if((Game.time % 50) < 1){
        utility.sweepCreep();
    }
    /* Attach handlers to objects */
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
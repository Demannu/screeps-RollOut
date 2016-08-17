// Demannu Roll-Out Strategy

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
        var thisSpawner = spawnName;
        var thisRoom = Game.spawns[thisSpawner].room;
        var thisSources = utility.findSources(thisSpawner);
        if(!Game.rooms[thisRoom.name].memory.mapped){
            for(var source in thisSources){
                console.log("source" + source);
                for(var x = -1; x < 2; x++){
                    console.log("x " + x);
                    for(var y = -1; y <2; y++){
                        console.log("y " + y);
                        var origin_x = thisSources[source].pos.x + x;
                        var origin_y = thisSources[source].pos.y + y;
                        var terrain = Game.map.getTerrainAt(origin_x, origin_y, thisRoom.name);
                        switch(terrain){
                            case 'plain':
                            case 'swamp':
                                var finalPOS = new RoomPosition(origin_x, origin_y, thisRoom.name).createFlag();
                                console.log(finalPOS);
                                Game.rooms[thisRoom.name].memory.mapped = true;
                                break;
                        }
                    }
                }
            }
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

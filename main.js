var startProto = require('global.prototypes');
var roomProto = require('room.prototypes');
var creepProto = require('creep.prototypes');
var helper = require('global.helper');

module.exports.loop = function () {
    for(var room in Game.rooms){
        if(!Game.rooms[room].memory.mapped){
            Game.rooms[room].manageSources();
        }
        //Game.rooms[room].taskManager();
    }
    /* Execute commands at specific intervals */
    var time = Game.time;
    switch(time % 100){
        case (0):
        case (25):
        case (50):
            helper.sweepMemory();
        case (75):
            for(var room in Game.rooms){
                console.log('Harvesters ' + Game.rooms[room].creepSorted().harvesters);
                console.log('Upgraders ' + Game.rooms[room].creepSorted().upgraders);
                console.log('Builders ' + Game.rooms[room].creepSorted().builders);
                console.log('Upkeepers ' + Game.rooms[room].creepSorted().upkeepers);
                console.log('Miners ' + Game.rooms[room].creepSorted().miners);
                console.log('Runners ' + Game.rooms[room].creepSorted().runners);
            }
            break;
    }
    var list = ['creeps', 'spawns'];
    for(var item in list){
        for(var name in Game[list[item]]){
            var thing = Game[list[item]][name];
            if (list[item] == 'spawns') {
                thing.memory.role = 'spawner';
            }
            switch(thing.memory.role){
                case 'spawner':
                    thing.buildCreep();
                    break;
                case 'harvester':
                    thing.harvester();
                    break;
                case 'upgrader':
                    thing.upgrader();
                    break;
                case 'builder':
                    thing.builder();
                    break;
                case 'upkeeper':
                    thing.upkeeper();
                    break;
                case 'miner':
                    thing.miner();
                    break;
                case 'runner':
                    thing.runner();
                    break;
            }
        }
    }
}

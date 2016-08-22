var startProto = require('global.prototypes');
<<<<<<< HEAD
var roomProto = require('room.prototypes');
=======
>>>>>>> origin/master
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
            break;
        case (25):
            break;
        case (50):
            helper.sweepMemory();
            break;
        case (75):
<<<<<<< HEAD
            for(var room in Game.rooms){
                console.log('Harvesters ' + Game.rooms[room].creepSorted().harvesters);
                console.log('Upgraders ' + Game.rooms[room].creepSorted().upgraders);
                console.log('Builders ' + Game.rooms[room].creepSorted().builders);
                console.log('Upkeepers ' + Game.rooms[room].creepSorted().upkeepers);
            }
=======
>>>>>>> origin/master
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
<<<<<<< HEAD
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
=======
                    break;
                case 'harvester':
                    thing.harvester();
                    break;
                case 'upgrader':
                    thing.upgrader();
                    break;
                case 'builder':
                    thing.builder();
>>>>>>> origin/master
                    break;
            }
        }
    }
}

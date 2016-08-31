var prototypes = ['room', 'creep', 'spawn', 'tower'];
for(let obj in prototypes){
    require([prototypes[obj]] + '.prototypes');
}

module.exports.loop = function () {
    // Source Setup
    // Requires: room.memory.sourceID
    // Requires: room.memory.path_sourceID
    // Look for all sources in a room, determine free spaces, set source limit to free space, find path from source to spawn and store it
    for(let room in Game.rooms){
        room = Game.rooms[room];
        if(!room.memory.initalized && room.controller.owner['username'] === 'Demannu'){
            console.log('running');
            room.configure();
        } else if(room.controller.owner['username'] === 'Demannu' && (Game.time - room.memory.energyTick) > 10){
            room.setEnergyOrders();
            room.memory.energyTick = Game.time;
        }
    }
    for(let spawn in Game.spawns){
        spawn = Game.spawns[spawn];
        if(!spawn.memory.initalized){
            spawn.configure();
        }
        if(spawn.room.memory.renew.length > -1){
            spawn.renew();
        }
        if(!spawn.spawning){
            spawn.creepManager();
        }
    }
}

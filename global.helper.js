module.exports = {
    sweepMemory: function(){
        var clean = ['creeps','flags'];
        for(var item in clean){
            var param = clean[item];
            for(var name in Memory[param]) {
                if(!Game[param][name]) {
                    delete Memory[param][name];
                    console.log('[SWEEPED] ' + param + '.' + name);
                }
            }
        }
        for(var object in Game.rooms){
            for(var item in Game.rooms[object].memory){
                if(item != 'mapped'){
                    for(var creepID in Game.rooms[object].memory[item]){
                        var creepID = Game.rooms[object].memory[item][creepID];
                        var creepObj = Game.getObjectById(creepID);
                        if(creepObj == null){
                            console.log('its null');
                            var data = Game.rooms[object].memory[item];
                            var index = data.indexOf(creepID);
                            if(index > -1) {
                                data.splice(index, 1);
                            }
                            console.log('[UNASSIGNED] ' + creepID + ' from ' + item);
                        }
                    }   
                }
            }
        }
    }
};
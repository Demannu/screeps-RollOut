Spawn.prototype.configure = function() {
    var data = this.room.findTerrain(this, 1, 1);
    this.room.createRoads(data);
    
},
Spawn.prototype.renew = function(){
    // if creep id in renew is within 1 block, renew creep and remove from list
    for(let creep in this.room.memory.renew){
        creepObj = Game.getObjectById(this.room.memory.renew[creep]);
        if(this.pos.inRangeTo(creepObj, 1)){
            this.renewCreep(creepObj);
            this.room.memory.renew.splice(creep, 1);
        }
    }
},
Spawn.prototype.makeCreep = function(type){
    var body = [];
    var tier = this.room.memory.tier;
    var maxEnergy = this.room.energyAvailable;
    var types = [WORK, CARRY, MOVE];
    var numOfParts = Math.floor(maxEnergy / 200);
    var mem;
    for(let item in types){
        for(let i = 0; i < numOfParts; i++) {
            body.push(types[item]);
        }
    }
    if(type == 'harvester'){
        var source = this.room.getOpenSource();
        mem = {role: type, sourceID: source};
    } else {
        mem = {role: type};
    }
    var creepID = this.createCreep(body, undefined, mem);
    if(type == 'harvester'){
        this.room.memory[source].push([creepID]);
    }
},
Spawn.prototype.creepManager = function() {
    if(((this.energyAvailable / this.energyCapacityAvailable) > .75) || (this.energy == this.energyCapacity)){
        var tier = this.room.memory.tier;
        var creepOrder = [];
        switch(tier){
            case 0:
                creepOrder = ['harvester', 'upgrader', 'builder', 'repairer'];
                break;
            case 1:
                creepOrder = ['harvester', 'miner', 'builder', 'runner', 'repairer'];
            case 2:
                creepOrder = ['miner', 'runner', 'builder', 'repairer'];
        }
        // decide if a creep needs to be built, figure out what type to build
        for(let type in creepOrder){
            type = creepOrder[type];
            if(this.room.selectCreeps(type).length < this.room.limitCreeps(type)){
                this.makeCreep(type);
                break;
            }
        }
    }
    
}
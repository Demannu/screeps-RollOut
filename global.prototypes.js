Room.prototype.info = function() {
    return {
        creepCount: this.find(FIND_MY_CREEPS).length,
        enemyCreepCount: this.find(FIND_HOSTILE_CREEPS).length,
        spawnCount: this.find(FIND_MY_SPAWNS).length,
        enemySpawnCount: this.find(FIND_HOSTILE_SPAWNS).length,
        sourceCount: this.find(FIND_SOURCES).length
    }
},

Room.prototype.creepRatio = function() {
    return {
        harvesters: 3,
        upgraders: 1,
        builders: 1
    }
},

Room.prototype.creepSorted = function() {
    var foundCreeps = this.find(FIND_MY_CREEPS);
    return {
        harvesters: _.filter(foundCreeps, (creep) => creep.memory.role == 'harvester').length,
        upgraders: _.filter(foundCreeps, (creep) => creep.memory.role == 'upgrader').length,
        builders: _.filter(foundCreeps, (creep) => creep.memory.role == 'builder').length
    }
},

Room.prototype.buildControllerDefense = function() {
    var center = this.controller.pos;
    var a = [-2, 2];
    for(var b in a){
        var x = a[b];
        for(var c in a){
            var y = a[c];
            this.createConstructionSite((center.pos.x + x), (center.pos.y + y), STRUCTURE_WALL);
        }
    }
},

Room.prototype.manageSources = function(){
    var sourceList = this.find(FIND_SOURCES);
    for(var source in sourceList){
        var sauce = sourceList[source].id;
        this.memory[sauce] = [];
        this.memory.mapped = true;
    }    
},

Spawn.prototype.buildCreep = function() {
    if (!this.spawning) {
        var energyPercentage = (this.energy / this.energyCapacity) * 100;
        if (energyPercentage > 75) {
            if (this.room.creepSorted().harvesters < (this.room.creepRatio().harvesters * this.room.controller.level)){
                var newCreep = this.createCreep([MOVE, MOVE, WORK, CARRY, CARRY], undefined, {role: 'harvester'});
            } else if (this.room.creepSorted().upgraders < (this.room.creepRatio().upgraders * this.room.controller.level)){
                var newCreep = this.createCreep([MOVE, MOVE, WORK, CARRY, CARRY], undefined, {role: 'upgrader'});
            } else if (this.room.creepSorted().builders < (this.room.creepRatio().builders * this.room.controller.level)){
                var newCreep = this.createCreep([MOVE, MOVE, WORK, CARRY, CARRY], undefined, {role: 'builder'});
            }
        }
    }
},

Creep.prototype.harvester = function() {
    if(this.carry.energy < this.carryCapacity){
        if(!this.memory.assigned){
            var list = this.room.find(FIND_SOURCES_ACTIVE);
            for(var source in list){
                var input = list[source].id;
                if(this.room.memory[input].length < 3){
                    this.room.memory[input].push(this.id);
                    this.memory.sourceID = input;
                    this.memory.assigned = true;
                    break;
                }
            }
        } else {
            if(this.pos.isNearTo(Game.getObjectById(this.memory.sourceID))){
                this.harvest(Game.getObjectById(this.memory.sourceID));
            } else {
                this.moveTo(Game.getObjectById(this.memory.sourceID));
            }
        }    
    } else {
        var target = this.pos.findClosestByRange(FIND_MY_SPAWNS);
        if(target) {
            if(this.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                this.moveTo(target);
            }
        } 
    }
},

Creep.prototype.upgrader = function() {
    if(this.carry.energy == 0){
        var target = this.pos.findClosestByRange(FIND_MY_SPAWNS);
        if(target) {
            if(this.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                this.moveTo(target);
            }
        }    
    } else {
        if(this.upgradeController(this.room.controller) == ERR_NOT_IN_RANGE) {
                this.moveTo(this.room.controller);
        }
    }
},

Creep.prototype.builder = function() {
    if(this.carry.energy == 0){
        var target = this.pos.findClosestByRange(FIND_MY_SPAWNS);
        if(target) {
            if(this.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                this.moveTo(target);
            }
        }    
    } else {
        if(!this.memory.building){
           var target = this.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
           if(target){
                this.memory.building = true;
                this.memory.buildingID = target.id;
                if(this.pos.isNearTo(Game.getObjectById(this.memory.buildingID))){
                    this.build(Game.getObjectById(this.memory.buildingID));
                } else {
                    this.moveTo(target);
                }
           } else {
                this.memory.building = false;
                if(this.upgradeController(this.room.controller) == ERR_NOT_IN_RANGE) {
                    this.moveTo(this.room.controller);
                }
            } 
        } else {
            if(this.build(Game.getObjectById(this.memory.buildingID)) == -7) {
                this.memory.building = false;
            } else {
                if(this.pos.isNearTo(Game.getObjectById(this.memory.buildingID))){
                    this.build(Game.getObjectById(this.memory.buildingID));
                } else {
                    this.moveTo(Game.getObjectById(this.memory.buildingID));
                }
            }
        }
        
    }
}

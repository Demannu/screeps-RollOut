<<<<<<< HEAD
=======
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

>>>>>>> origin/master
Spawn.prototype.buildCreep = function() {
    if (!this.spawning) {
        var energyPercentage = (this.energy / this.energyCapacity) * 100;
        if (energyPercentage > 75) {
            if (this.room.creepSorted().harvesters < (this.room.creepRatio().harvesters * this.room.controller.level)){
<<<<<<< HEAD
                var newCreep = this.createCreep([MOVE,WORK,CARRY,CARRY], undefined, {role: 'harvester'});
            } else if (this.room.creepSorted().upgraders < (this.room.creepRatio().upgraders * this.room.controller.level)){
                var newCreep = this.createCreep([MOVE,WORK,CARRY,CARRY], undefined, {role: 'upgrader'});
            } else if (this.room.creepSorted().builders < (this.room.creepRatio().builders * this.room.controller.level)){
                var newCreep = this.createCreep([MOVE,WORK,CARRY,CARRY], undefined, {role: 'builder'});
            } else if (this.room.creepSorted().upkeepers < (this.room.creepRatio().upkeepers * this.room.controller.level)){
                var newCreep = this.createCreep([MOVE,WORK,CARRY,CARRY], undefined, {role: 'upkeeper'});
=======
                var newCreep = this.createCreep([MOVE, MOVE, WORK, CARRY, CARRY], undefined, {role: 'harvester'});
            } else if (this.room.creepSorted().upgraders < (this.room.creepRatio().upgraders * this.room.controller.level)){
                var newCreep = this.createCreep([MOVE, MOVE, WORK, CARRY, CARRY], undefined, {role: 'upgrader'});
            } else if (this.room.creepSorted().builders < (this.room.creepRatio().builders * this.room.controller.level)){
                var newCreep = this.createCreep([MOVE, MOVE, WORK, CARRY, CARRY], undefined, {role: 'builder'});
>>>>>>> origin/master
            }
        }
    }
},

<<<<<<< HEAD
Creep.prototype.doWork = function() {
    
},
Creep.prototype.harvester = function() {
    if(this.ticksToLive < 2){
        var data = this.room.memory[this.memory.sourceID];
        var index = data.indexOf(this.id);
        if(index > -1) {
            data.splice(index, 1);
        }
    }
=======
Creep.prototype.harvester = function() {
>>>>>>> origin/master
    if(this.carry.energy < this.carryCapacity){
        if(!this.memory.assigned){
            var list = this.room.find(FIND_SOURCES_ACTIVE);
            for(var source in list){
                var input = list[source].id;
<<<<<<< HEAD
                if(this.room.memory[input].length < 6){
=======
                if(this.room.memory[input].length < 3){
>>>>>>> origin/master
                    this.room.memory[input].push(this.id);
                    this.memory.sourceID = input;
                    this.memory.assigned = true;
                    break;
                }
            }
        } else {
<<<<<<< HEAD
            var target = Game.getObjectById(this.memory.sourceID);
            if(this.pos.isNearTo(target)){
                this.harvest(target);
            } else {
                this.moveTo(target);
=======
            if(this.pos.isNearTo(Game.getObjectById(this.memory.sourceID))){
                this.harvest(Game.getObjectById(this.memory.sourceID));
            } else {
                this.moveTo(Game.getObjectById(this.memory.sourceID));
>>>>>>> origin/master
            }
        }    
    } else {
        var target = this.pos.findClosestByRange(FIND_MY_SPAWNS);
<<<<<<< HEAD
        if(target.energy < target.energyCapacity) {
            if(this.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                this.moveTo(target);
            }
        } else {
            var target = this.room.find(FIND_MY_STRUCTURES, {
                filter: { structureType: STRUCTURE_EXTENSION }
            });
            for(extension in target){
                var ext = target[extension];
                if(ext.energy < ext.energyCapacity) {
                    if(this.transfer(ext, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        this.moveTo(ext);
                    }    
                }
            }
        }
=======
        if(target) {
            if(this.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                this.moveTo(target);
            }
        } 
>>>>>>> origin/master
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
<<<<<<< HEAD
        var targetLook = this.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
        if(targetLook){
            var targets = this.room.find(FIND_MY_STRUCTURES, {
                filter: { structureType: STRUCTURE_EXTENSION }
            });
            for(var target in targets){
                var target = targets[target];
                if((target.energy / target.energyCapacity) > .75){
                    if(this.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        this.moveTo(target);
                    }    
                }
            }
        } else {
            this.moveTo(Game.flags.gatherPoint);
        }
=======
        var target = this.pos.findClosestByRange(FIND_MY_SPAWNS);
        if(target) {
            if(this.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                this.moveTo(target);
            }
        }    
>>>>>>> origin/master
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
<<<<<<< HEAD
                this.moveTo(Game.flags.gatherPoint);
=======
                if(this.upgradeController(this.room.controller) == ERR_NOT_IN_RANGE) {
                    this.moveTo(this.room.controller);
                }
>>>>>>> origin/master
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
<<<<<<< HEAD
},

Creep.prototype.upkeeper = function() {
    if(this.carry.energy < this.carry.energyCapacity){
        var targets = this.room.find(FIND_MY_STRUCTURES, {
            filter: { structureType: STRUCTURE_EXTENSION }
        });
        for(var target in targets){
            var target = targets[target];
            if((target.energy / target.energyCapacity) > .75){
                if(this.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    this.moveTo(target);
                }    
            }
        }
    } else {
        var targets = this.room.find(FIND_STRUCTURES, {
            filter: object => object.hits < object.hitsMax });
        targets.sort((a,b) => a.hits - b.hits);
        if(targets.length > 0){
            if(this.repair(targets[0]) == ERR_NOT_IN_RANGE) {
                this.moveTo(targets[0]);
            }   
        }
    }
}
=======
}
>>>>>>> origin/master

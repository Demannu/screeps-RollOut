Spawn.prototype.buildCreep = function() {
    if (!this.spawning) {
        var energyPercentage = (this.energy / this.energyCapacity) * 100;
        if (energyPercentage > 75) {
            if (this.room.creepSorted().harvesters < (this.room.creepRatio().harvesters * this.room.controller.level)){
                var newCreep = this.createCreep([MOVE,WORK,CARRY,CARRY], undefined, {role: 'harvester'});
            } else if (this.room.creepSorted().upgraders < (this.room.creepRatio().upgraders * this.room.controller.level)){
                var newCreep = this.createCreep([MOVE,WORK,CARRY,CARRY], undefined, {role: 'upgrader'});
            } else if (this.room.creepSorted().builders < (this.room.creepRatio().builders * this.room.controller.level)){
                var newCreep = this.createCreep([MOVE,WORK,CARRY,CARRY], undefined, {role: 'builder'});
            } else if (this.room.creepSorted().upkeepers < (this.room.creepRatio().upkeepers * this.room.controller.level)){
                var newCreep = this.createCreep([MOVE,WORK,CARRY,CARRY], undefined, {role: 'upkeeper'});
            }
        }
    }
},

Creep.prototype.run = function() {
    var job = this.memory.role;
    var targetID = (this.memory.assigned ? this.memory.targetID : false);
    var assigned = (this.memory.assigned ? this.memory.assigned : false);
    if (this.energy !== this.energyCapacity){
        this.fillEnergy();
    }
},

Creep.prototype.harvestEnergy = function() {
    var sourceList = this.room.find(FIND_SOURCES);
},

Creep.prototype.fillEnergy = function() {
    var energySources = this.room.find(FIND_MY_STRUCTURES, {
        filter: object => object.energy < object.energyCapacity 
    });
    energySources.sort((a,b) => a.energy - b.energy);
},

Creep.prototype.harvester = function() {
    if(this.ticksToLive < 2){
        var data = this.room.memory[this.memory.sourceID];
        var index = data.indexOf(this.id);
        if(index > -1) {
            data.splice(index, 1);
        }
    }
    if(this.carry.energy < this.carryCapacity){
        if(!this.memory.assigned){
            var list = this.room.find(FIND_SOURCES_ACTIVE);
            for(var source in list){
                var input = list[source].id;
                if(this.room.memory[input].length < 6){
                    this.room.memory[input].push(this.id);
                    this.memory.sourceID = input;
                    this.memory.assigned = true;
                    break;
                }
            }
        } else {
            var target = Game.getObjectById(this.memory.sourceID);
            if(this.pos.isNearTo(target)){
                this.harvest(target);
            } else {
                this.moveTo(target);
            }
        }    
    } else {
        var target = this.pos.findClosestByRange(FIND_MY_SPAWNS);
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
                this.moveTo(Game.flags.gatherPoint);
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
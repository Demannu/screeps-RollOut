Creep.prototype.run = function() {
    var job = this.memory.role;
    var targetID = (this.memory.assigned ? this.memory.targetID : false);
    var assigned = (this.memory.assigned ? this.memory.assigned : false);
    var deltaDeath = this.ticksToLive;
    var energySources = this.room.findEnergySources();
    
    
    // Exceptions for harvester
    if(job === 'harvester') {
        if(deltaDeath === 1){
            var data = this.room.memory[targetID];
            var dataIndex = data.indexOf(this.id);
            if( index > -1 ) {
                data.splice(index, 1);
            }
            console.log(this.name + ' has died.');
        }
    }
    // Add self to this.room.memory.sources[sourceID]
    
},

Creep.prototype.workHarvest = function() {
    var target = this.pos.findClosestByRange(this.room.findEnergySources().spawnOnly);
    if(this.harvest(target) == ERR_NOT_IN_RANGE) {
        this.moveTo(target);
    }
}
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
                filter: { structureType: STRUCTURE_EXTENSION || STRUCTURE_CONTAINER }
            });
            for(extension in target){
                var ext = target[extension];
                if(ext.structureType == STRUCTURE_EXTENSION){
                    if(ext.energy < ext.energyCapacity) {
                        if(this.transfer(ext, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            this.moveTo(ext);
                        }    
                    }
                } else {
                    console.log(ext.store);
                    console.log(notextension);
                    if(ext.store[RESOURCE_ENERGY] < ext.storeCapacity){
                        if(this.transfer(ext,RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            this.moveTo(ext);
                        }
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
        if(this.pos.findInRange(Game.flags.upgradePoint, 2)){
            if(this.upgradeController(this.room.controller) == ERR_NOT_IN_RANGE) {
                this.moveTo(this.room.controller);
            }
        } else {
            this.moveTo(Game.flags.upgradePoint);
        }
    }
},

Creep.prototype.builder = function() {
    if(this.carry.energy == 0){
        var targets = this.room.find(FIND_STRUCTURES, {
            filter: { structureType: STRUCTURE_CONTAINER }});
        for(var target in targets){
            var target = targets[target];
            if((target.store[RESOURCE_ENERGY] / target.storeCapacity) > .75){
                if(this.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    this.moveTo(target);
                }    
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
    if(this.carry.energy == 0){
        var targets = this.room.find(FIND_MY_STRUCTURES, {
            filter: { structureType: STRUCTURE_EXTENSION }
        });
        for(var target in targets){
            var target = targets[target];
            if((target.energy / target.energyCapacity) > .75){
                if(this.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    this.moveTo(target);
                }    
            } else {
                this.moveTo(Game.flags.gatherPoint);
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
        } else {
            this.moveTo(Game.flags.gatherPoint);
        }
    }
},

Creep.prototype.miner = function() {
    if(this.carry.energy < this.carryCapacity){
        if(!this.memory.assigned){
            var list = this.room.find(FIND_SOURCES_ACTIVE);
            for(var source in list){
                var input = list[source].id;
                if(this.room.memory[input].length < 1){
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
        if(!this.memory.paired){
            var target = this.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: { structureType: STRUCTURE_CONTAINER }
            });
            if(target){
                this.memory.targetID = target.id;
                this.memory.paired = true;
            }
        } else {
            var target = Game.getObjectById(this.memory.targetID);
            if(this.transfer(target,RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                this.moveTo(target);
            }
        }
    }
},

Creep.prototype.runner = function() {
    if(this.carry.energy == 0) {
        var targets = this.room.find(FIND_STRUCTURES, {
            filter: { structureType: STRUCTURE_CONTAINER }});
        targets.sort((a,b) => b.store[RESOURCE_ENERGY] - a.store[RESOURCE_ENERGY]);
        if(targets.length > 0){
            if(this.withdraw(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                this.moveTo(targets[0]);
            }   
        } else {
            this.moveTo(Game.flags.gatherPoint);
        }
    } else {
        var list = this.room.find(FIND_MY_STRUCTURES, {
            filter: (s) => s.structureType == STRUCTURE_SPAWN || s.structureType == STRUCTURE_EXTENSION 
        });
        list.sort((a,b) => a.energy - b.energy);
        if(list.length > 0){
            for(var i = 0; i < list.length; i++){
                var target = list[i];
                if(target.energy < target.energyCapacity){
                    if(this.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        this.moveTo(target);
                    }
                }
            }
        }
    }
}

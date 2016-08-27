Spawn.prototype.buildCreep = function() {
    if (!this.spawning) {
        var energyPercentage = (this.energy / this.energyCapacity) * 100;
        if (energyPercentage > 75) {
            if (this.room.creepSorted().miners < this.room.info().sourceCount){
                var newCreep = this.createCreep([MOVE,MOVE,WORK,WORK,WORK,WORK,CARRY,CARRY], undefined, {role: 'miner'});
            } else if (this.room.creepSorted().runners < (this.room.creepRatio().runners * this.room.controller.level)){
                var newCreep = this.createCreep([MOVE,MOVE,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY], undefined, {role: 'runner'});
            } else if (this.room.creepSorted().upgraders < (this.room.creepRatio().upgraders * this.room.controller.level)){
                var newCreep = this.createCreep([MOVE,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY], undefined, {role: 'upgrader'});
            } else if (this.room.creepSorted().builders < (this.room.creepRatio().builders * this.room.controller.level)){
                var newCreep = this.createCreep([MOVE,MOVE,MOVE,WORK,WORK,CARRY,CARRY], undefined, {role: 'builder'});
            } else if (this.room.creepSorted().upkeepers < (this.room.creepRatio().upkeepers * this.room.controller.level)){
                var newCreep = this.createCreep([MOVE,MOVE,WORK,WORK,WORK,CARRY,CARRY], undefined, {role: 'upkeeper'});
            } 
        }
    }
}


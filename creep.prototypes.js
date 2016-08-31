Creep.prototype.init = function() {
    var job = this.memory.role;
    var workID = Game.getObjectById(this.memory.workID);
    // If harvester, then workID = sourceID and targetID = spawn/extension/storage it's paired to
    if(job === 'basic') {
        this.memory.storeID = this.room.memory.needsEnergy;
    }
    if(this.tickstoLive < 100){
        var dest = this.pos.findClosestByRange(this.room.getSpawns());
        if(!this.pos.isNearTo(dest, 1)){
            this.moveTo(dest);    
        } else {
            this.room.memory.renew.push(this.id);
        }
    }
    
}
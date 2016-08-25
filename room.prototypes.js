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
        harvesters: 4,
        upgraders: 1,
        builders: 1,
        upkeepers: 1
    }
},

Room.prototype.creepSorted = function() {
    var foundCreeps = this.find(FIND_MY_CREEPS);
    return {
        harvesters: _.filter(foundCreeps, (creep) => creep.memory.role == 'harvester').length,
        upgraders: _.filter(foundCreeps, (creep) => creep.memory.role == 'upgrader').length,
        builders: _.filter(foundCreeps, (creep) => creep.memory.role == 'builder').length,
        upkeepers: _.filter(foundCreeps, (creep) => creep.memory.role == 'upkeeper').length
    }
},

Room.prototype.findEnergySources = function() {
    var energySources = this.find(FIND_MY_STRUCTURES);
    return {
        spawnOnly: _.filter(energySources, (structure) => structure.type == STRUCTURE_SPAWN),
        fullOnly: _.filter(energySources, (structure) => structure.energy == structure.energyCapacity),
        emptyOnly: _.filter(energySources, (structure) => structure.energy == 0),
        extensions: _.filter(energySources, (structure) => structure.type == STRUCTURE_EXTENSION),
        all: _.filter(energySources, (structure) => structure.type == STRUCTURE_EXTENSION || STRUCTURE_SPAWN)
    }
},

Room.prototype.manageSources = function(){
    var sourceList = this.find(FIND_SOURCES);
    this.memory.sources = [];
    for(var source in sourceList){
        var sauce = sourceList[source].id;
        this.memory[sauce];
        this.memory.mapped = true;
    }    
},

Room.prototype.taskManager = function() {
    console.log('running');
    // this will manage adding and removing tasks from the memory 
    // find buildings needing repair
    if(!this.memory.tasks){
        console.log('empty array');
        this.memory.tasks = [];
    }
    var constructionList = this.find(FIND_CONSTRUCTION_SITES);
    var structureList = this.find(FIND_MY_STRUCTURES);
    for(construct in constructionList){
        console.log('construct');
        if(this.memory.tasks == []){
            console.log('task less than 0');
            this.taskBuild(constructionList[construct]);
        } else {
            console.log('it passed');
            for(task in this.memory.tasks){
            console.log(this.memory.tasks[task][0] != constructionList[construct].id);
                if(this.memory.tasks[task][0] != constructionList[construct].id){
                    //this.taskBuild(constructionList[construct]);
                    console.log('Buiulding Something');
                }    
            }   
        }
    }
    for(structure in structureList){
        var structure = structureList[structure];
        for(task in this.memory.tasks){
            if(this.memory.tasks[task][0] != structure.id){
               if((structure.hits / structure.hitsMax) < .85){
                    this.taskRepair(structure);
                }
            }    
        }
    }
},

Room.prototype.taskAdd = function(buildingID, action) {
    // this will add a task (ran from taskManager)
    this.memory.tasks.push([buildingID, action]);
},

Room.prototype.taskRepair = function(object) {
    var priority;
    switch(object.structureType){
        case STRUCTURE_WALL:
        case STRUCTURE_TOWER:
            priority = 2;
            break;
        case STRUCTURE_SPAWN:
            priority = 3;
            break;
    }
    this.taskAdd(object.id, 'repair', priority);
},

Room.prototype.taskBuild = function(item) {
    if(item.structureType = STRUCTURE_WALL || STRUCTURE_EXTENSION){
        var priority = 1;
    }
    this.taskAdd(item.id, 'build', priority);
}


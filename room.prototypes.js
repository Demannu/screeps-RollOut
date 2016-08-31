Room.prototype.configure = function() {
    var sources = this.getSources();
    var mySpawns = this.getSpawns();
    var controller = this.controller;
    this.memory.renew = [];
    this.memory.tier = 0;
    for(let source in sources){
        source = sources[source];
        var spawn = mySpawns[0].pos;
        this.memory[source.id] = [];
        this.memory['path_' + source.id] = this.findPath(source.pos, spawn);
        this.memory['slots_' + source.id] = [];
        this.plotSource(source);
    }
    this.createRoads(this.findTerrain(this.controller, 1, 1));
    this.memory.initalized = true;
},
Room.prototype.computeTier = function() {
    var sources = this.getSources();
    var roomLevel = this.controller.level;
    var extensionLimit;
    switch(roomLevel){
        case 1:
            extensionLimit =  0;
            break;
        case 2:
            extensionLimit = 5;
            break;
        case 3:
            extensionLimit = 10;
            break;
        case 4:
            extensionLimit = 20;
            break;
        case 5:
            extensionLimit = 30;
            break;
        case 6:
            extensionLimit = 40;
            break;
        case 7:
            extensionLimit = 50;
            break;
    }
    var hasContainers = this.find(FIND_MY_STRUCTURES, {
        filter: (s) => s.structureType == STRUCTURE_CONTAINER
    });
    var hasStorage = this.find(FIND_MY_STRUCTURES, {
        filter: (s) => s.structureType == STRUCTURE_STORAGE
    });
    var hasExtensions = this.find(FIND_MY_STRUCTURES, {
        filter: (s) => s.structureType == STRUCTURE_EXTENSION
    });
    var fullHarvester = (this.selectCreeps('harvester').length = this.limitCreeps('harvester') ? true : false);
    var fullEnergy = (this.energyAvailable = this.energyCapacityAvailable ? true: false);
    var fullExtensions = (hasExtensions.length = extensionLimit ? true : false);
    // setup tier 1 (container setup)
    if(fullHarvester && fullExtensions && fullEnergy && (roomLevel = 2)){
        this.memory.tier = 1;
    } 
},
Room.prototype.getSources = function() {
    var sources = this.find(FIND_SOURCES);
    return sources;
},
Room.prototype.getOpenSource = function() {
    var sources = this.getSources();
    var openSources = [];
    for(let source in sources){
        source = sources[source];
        if(this.memory[source.id].length < this.memory['slots_' + source.id].length){
            return source.id;
        }
    }
},
Room.prototype.getSpawns = function() {
    var spawns = this.find(FIND_MY_SPAWNS);
    return spawns;
},
Room.prototype.selectCreeps = function(type) {
    var result = this.find(FIND_MY_CREEPS, {
        filter: (c) => c.memory.role == type
    });
    return result;
},
Room.prototype.limitCreeps = function(type) {
    var result;
    switch (type){
        case 'harvester':
            result = this.getSources().length * this.controller.level;
            break;
        case 'upgrader':
            if(this.controller.level > 4){
                result = 6;
            } else {
                result = Math.floor(this.controller.level * 1.5);                
            }
            break;
        case 'builder':
            result = Math.floor(this.selectCreeps('harvester').length * .25);
            break;
    }
    return result;
},
Room.prototype.setEnergyOrders = function() {
    var data = this.find(FIND_MY_STRUCTURES, {
        filter: (obj) => obj.structureType == STRUCTURE_SPAWN || obj.structureType == STRUCTURE_EXTENSION && obj.energy < obj.energyCapacity
    });
    data.sort((a,b) => a.energy - b.energy);
    for(let item in data){
        item = data[item];
        if(item.structureType == STRUCTURE_SPAWN){
            this.memory['needsEnergy'] = item.id;
            break;
        }
    }
    this.memory['needsEnergy'] = data[0].id;
},
Room.prototype.plotSource = function(source) {
    var data = this.findTerrain(source, 1, 1);
    var result = [];
    for(let obj in data){
        obj = data[obj];
        if(obj.terrain === 'plain'){
            this.memory['slots_' + source.id].push({x: obj.x, y: obj.y});
            result.push({x: obj.x, y: obj.y});
        }
    }
    this.createRoads(result);
    this.createRoads(this.memory['path_' + source.id]);
},
Room.prototype.createRoads = function(array) {
    for(let position in array){
        position = array[position];
        this.create(position['x'], position['y'], STRUCTURE_ROAD);
    }
},
Room.prototype.findTerrain = function(obj, h, w) {
    var data = this.lookForAtArea(LOOK_TERRAIN, (obj.pos.y - h), (obj.pos.x - w), (obj.pos.y + h), (obj.pos.x + w), true);
    return data;
},
Room.prototype.create = function(x, y, type){
    this.createConstructionSite(x,y, type);
}
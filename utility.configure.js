var utilityConfigure = {
    limiter: function(type) { 
        if(type == 'harvesters'){
            return 6;
        }
        if(type == 'builders'){
            return 4;
        }
        if(type == 'upgraders'){
            return 2;
        }
    },
    extPOS: function() { return [10,20,3,5]; },     // X,Y,Width,Height of extension field
    safeWall: function() { return [0,0,'down']; } // x,y of far left (or top) side. Direction to move (up, down, left, right)
};

module.exports = utilityConfigure;
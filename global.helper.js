module.exports = {
    sweepMemory: function(){
        var clean = ['creeps','flags'];
        for(var item in clean){
            var param = clean[item];
            for(var name in Memory[param]) {
                if(!Game[param][name]) {
                    delete Memory[param][name];
                    console.log('[SWEEPED] ' + param + '.' + name);
                }
            }
        }
    }
};
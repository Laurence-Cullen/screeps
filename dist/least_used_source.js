colonyConfig = require('colony_config')


var leastUsedSource = {

    /** @param {Room} room **/
    find: function(room) {
        var sources = room.find(FIND_SOURCES);

        var creeps_per_source = {};
        for (var source in sources){
            console.log(source)
            creeps_per_source[source] = 0
        }

        for (var creep_name in Game.creeps){
            creep = Game.creeps[creep_name]
            console.log(creep.name, 'with memory', creep.memory)

            if(creep.memory.target_source){
                creeps_per_source[creep.memory.target_source]++
            }
        }

        var source_with_fewest_creeps = null
        var fewest_creeps = colonyConfig.MAX_CREEPS

        for (var source in sources){
            if(creeps_per_source[source] < fewest_creeps){
                source_with_fewest_creeps = source
                fewest_creeps = creeps_per_source[source]
            }
        }
        return source_with_fewest_creeps
    }
};

module.exports = leastUsedSource;

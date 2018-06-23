var leastUsedSource = {
    find: function() {
        var sources = creep.room.find(FIND_SOURCES);

        var creeps_per_source = {};
        for (var source in sources){
            creeps_per_source[source] = 0
        }

        for (var creep in Game.creeps){
            if(creep.memory.source_target){
                creeps_per_source[creep.memory.source_target]++
            }
        }

        var source_with_fewest_creeps = null
        var fewest_creeps = MAX_CREEPS

        for (var source in sources){
            if(creeps_per_source[source] < fewest_creeps){
                source_with_fewest_creeps = source
                fewest_creeps = creeps_per_source[source]
            }
        }
        return source_with_fewest_creeps, fewest_creeps
    }
}

module.exports = leastUsedSource;

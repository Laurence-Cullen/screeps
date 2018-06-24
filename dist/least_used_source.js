colonyConfig = require('colony_config');

// must be a neater way to do this!
var leastUsedSource = {

    /** @param {Room} room **/
    find: function(room) {
        var sources = room.find(FIND_SOURCES);

        // building dict of {source: creeps_per_source}
        var creeps_per_source = {};
        for (var source_id in sources){
            console.log(sources[source_id]);
            creeps_per_source[sources[source_id]] = 0;
        }

        // populating number of creeps assigned to each source values from
        // creep memory
        for (var creep_name in Game.creeps){
            creep = Game.creeps[creep_name];

            creeps_per_source[
                Game.getObjectById(creep.memory.target_source.id)
            ]++;
        }

        var source_with_fewest_creeps = null;
        var fewest_creeps = colonyConfig.MAX_CREEPS;

        for (var source_id in sources){

            source = sources[source_id];

            if(creeps_per_source[source] < fewest_creeps){
                source_with_fewest_creeps = source;
                fewest_creeps = creeps_per_source[source];
            }
        }
        return source_with_fewest_creeps;
    }
};

module.exports = leastUsedSource;

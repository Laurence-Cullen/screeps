// TODO simplify logic, must be a neater way to do this!
module.exports = {

    /** @param {Room} room **/
    find: function (room) {
        let source_id;
        const sources = room.find(FIND_SOURCES);

        // building dict of {source: creeps_per_source}
        let creeps_per_source = {};
        for (source_id in sources) {
            creeps_per_source[sources[source_id]] = 0;
        }

        // populating number of creeps assigned to each source values from
        // creep memory
        let creep;
        for (let creep_name in Game.creeps) {
            creep = Game.creeps[creep_name];

            try {
                creeps_per_source[
                    Game.getObjectById(creep.memory.target_source.id)
                    ]++;
            } catch (e) {
                console.log('encountered', e, 'in least_used_source')
            }
        }

        let source_with_fewest_creeps = null;

        // TODO think about if this needs an elegant solution
        let fewest_creeps = 10000;

        let source;
        for (source_id in sources) {

            source = sources[source_id];

            if (creeps_per_source[source] < fewest_creeps) {
                source_with_fewest_creeps = source;
                fewest_creeps = creeps_per_source[source];
            }
        }
        return source_with_fewest_creeps;
    }
};
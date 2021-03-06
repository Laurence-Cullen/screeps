genericActions = require('src/actions/generic_behaviours');
leastUsedSource = require('src/utils/least_used_source');


module.exports = {

    /** @param {Creep} creep **/
    run: function (creep) {

        if (creep.memory.maintaining && creep.carry.energy === 0) {
            creep.memory.maintaining = false;
            creep.say('🔄 harvest');
        }

        if (!creep.memory.maintaining && creep.carry.energy === creep.carryCapacity) {
            creep.memory.maintaining = true;
            creep.say('🚧 repair');
        }

        if (creep.memory.maintaining) {

            const targets = creep.room.find(FIND_STRUCTURES, {
                filter: object => {
                    return (object.structureType === STRUCTURE_CONTAINER ||
                        object.structureType === STRUCTURE_ROAD ||
                        object.structureType === STRUCTURE_RAMPART ||
                        object.structureType === STRUCTURE_TOWER) &&
                        (object.hits < object.hitsMax &&
                            object.hits < 10e6);
                }
            });

            // targets.sort((a, b) => (a.hits / a.hitsMax) - (b.hits / b.hitsMax));
            const sorted_targets = _.sortBy(targets, target => creep.pos.getRangeTo(target));

            if (sorted_targets.length > 0) {
                if (creep.repair(sorted_targets[0]) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(sorted_targets[0]);
                }
            }
        } else {
            genericActions.harvest(creep);
        }
    },
    memory_generator: function (role, spawn) {
        return {
            role: role,
            target_source: leastUsedSource.find(spawn.room),
            maintaining: false
        }
    }
};
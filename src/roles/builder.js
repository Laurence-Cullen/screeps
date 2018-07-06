genericActions = require('src/actions/economic');
leastUsedSource = require('src/utils/least_used_source');


module.exports = {

    /** @param {Creep} creep **/
    run: function (creep) {

        if (creep.memory.building && creep.carry.energy === 0) {
            creep.memory.building = false;
            creep.say('🔄 harvest');
        }

        if (!creep.memory.building && creep.carry.energy === creep.carryCapacity) {
            creep.memory.building = true;
            creep.say('🚧 build');
        }

        if (creep.memory.building) {
            // TODO make construction site targeting smarter
            let construction_sites = creep.room.find(FIND_CONSTRUCTION_SITES);

            // ordering construction sites by proximity to creep
            construction_sites = _.sortBy(construction_sites, construct_site => creep.pos.getRangeTo(construct_site));

            if (construction_sites.length > 0) {
                if (creep.build(construction_sites[0]) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(construction_sites[0], {
                        visualizePathStyle: {
                            stroke: '#ffffff'
                        }
                    });
                }
            } else {
                const targets = creep.room.find(FIND_STRUCTURES, {
                    filter: object => (object.hits < object.hitsMax) && (object.hits < 10e6)
                });

                // targets.sort((a, b) => a.hits - b.hits);
                const sorted_targets = _.sortBy(targets, target => creep.pos.getRangeTo(target));

                if (sorted_targets.length > 0) {
                    if (creep.repair(sorted_targets[0]) === ERR_NOT_IN_RANGE) {
                        creep.moveTo(sorted_targets[0]);
                    }
                }
            }
        } else {
            genericActions.withdraw_energy_from_storage(creep);
        }
    },
    memory_generator: function (role, spawn) {
        return {
            role: role,
            building: false
        }
    }
};
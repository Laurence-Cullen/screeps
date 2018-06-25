genericBehaviours = require('generic_behaviours');


const roleHarvester = {

    /** @param {Creep} creep **/
    run: function (creep) {
        // update harvesting state
        if (creep.memory.harvesting && creep.carry.energy === creep.carryCapacity) {
            creep.memory.harvesting = false;
        } else if (!creep.memory.harvesting && creep.carry.energy === 0) {
            creep.memory.harvesting = true;
        }

        // either harvest, charge stuff or wait at rally point
        if (creep.memory.harvesting) {
            genericBehaviours.harvest(creep);
        } else {
            if (genericBehaviours.charge_spawn_and_extensions(creep) === ERR_NOT_FOUND) {
                if (genericBehaviours.charge_containers(creep) === ERR_NOT_FOUND) {
                    genericBehaviours.rally_at_flag(creep, 'harvester_rally');
                }
            }
        }
    },
    memory_generator: function (role, least_used_source) {
        return {
            role: role,
            target_source: least_used_source,
            harvesting: false
        }
    }
};

module.exports = roleHarvester;
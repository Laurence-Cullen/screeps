genericActions = require('src/actions/economic');


module.exports = {
    /** @param {Creep} creep **/
    run: function (creep) {
        // update collecting state state
        if (creep.memory.collecting && creep.carry.energy === creep.carryCapacity) {
            creep.memory.collecting = false;
        } else if (!creep.memory.collecting && creep.carry.energy === 0) {
            creep.memory.collecting = true;
        }

        if (creep.memory.collecting) {
            if(genericActions.withdraw_energy_from_containers(creep) === ERR_NOT_ENOUGH_ENERGY) {
                genericActions.collect_dropped_energy(creep)
            }
        }
        else {
        }
    },
    memory_generator: function (role, spawn) {
        return {
            role: role,
            collecting: false
        }
    }
};
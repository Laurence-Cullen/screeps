genericActions = require('src/actions/economic');
leastUsedSource = require('src/utils/least_used_source');


module.exports = {

    /** @param {Creep} creep **/
    run: function (creep) {
        if (creep.memory.upgrading && creep.carry.energy === 0) {
            creep.memory.upgrading = false;
            creep.say('🔄 harvest');
        }
        if (!creep.memory.upgrading && creep.carry.energy === creep.carryCapacity) {
            creep.memory.upgrading = true;
            creep.say('⚡ upgrade');
        }

        if (creep.memory.upgrading) {
            if (creep.upgradeController(creep.room.controller) === ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller, {
                    visualizePathStyle: {
                        stroke: '#ffffff'
                    }
                });
            }
        } else {
            genericActions.withdraw_energy_from_storage(creep);
        }
    },
    memory_generator: function (role, spawn) {
        return {
            role: role,
            upgrading: false
        };
    }
};
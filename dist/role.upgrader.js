genericBehaviours = require('generic_behaviours');


const roleUpgrader = {

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
            genericBehaviours.harvest(creep);
        }
    },
    memory_generator: function (role, least_used_source) {
        return {
            role: role,
            target_source: least_used_source,
            upgrading: false
        };
    }
};

module.exports = roleUpgrader;
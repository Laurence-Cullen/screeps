genericBehaviours = require('generic_behaviours');


var roleUpgrader = {

  /** @param {Creep} creep **/
  run: function(creep) {
    console.log('running upgrader', creep.name);
    if (creep.memory.upgrading && creep.carry.energy == 0) {
      creep.memory.upgrading = false;
      creep.say('🔄 harvest');
    }
    if (!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
      creep.memory.upgrading = true;
      creep.say('⚡ upgrade');
    }

    if (creep.memory.upgrading) {
      if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
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
  memory_generator: function(role, least_used_source) {
    memory = {
      role: role,
      target_source: least_used_source,
      upgrading: false
    }

    return memory
  }
};

module.exports = roleUpgrader;
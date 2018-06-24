genericBehaviours = require('generic_behaviours');


var roleBuilder = {

  /** @param {Creep} creep **/
  run: function(creep) {

    if (creep.memory.building && creep.carry.energy == 0) {
      creep.memory.building = false;
      creep.say('🔄 harvest');
    }

    if (!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
      creep.memory.building = true;
      creep.say('🚧 build');
    }

    if (creep.memory.building) {
      // TODO make construction site targetting smarter
      var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
      if (targets.length) {
        if (creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
          creep.moveTo(targets[0], {
            visualizePathStyle: {
              stroke: '#ffffff'
            }
          });
        }
      }
    } else {
      genericBehaviours.harvest(creep);
    }
  },
  memory_generator: function(role, least_used_source) {
    memory = {
      role: role,
      target_source: least_used_source,
      building: false
    }

    return memory
  }
};

module.exports = roleBuilder;
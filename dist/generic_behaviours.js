genericBehaviours = {
  harvest: function(creep) {
    var source = creep.memory.target_source
    harvest_response = creep.harvest(Game.getObjectById(source.id))

    if (harvest_response == ERR_NOT_IN_RANGE) {
      creep.moveTo(
        Game.getObjectById(source.id), {
          visualizePathStyle: {
            stroke: '#ffaa00'
          }
        }
      );
    }
  }
};

module.exports = genericBehaviours;
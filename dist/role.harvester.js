var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.carry.energy < creep.carryCapacity) {

            var source = creep.memory.target_source

            harvest_response = creep.harvest(Game.getObjectById(source.id))

            if(harvest_response == ERR_NOT_IN_RANGE) {
                creep.moveTo(
                    Game.getObjectById(source.id),
                    {visualizePathStyle: {stroke: '#ffaa00'}}
                );
            }
        }
        else {
            console.log(creep.name, 'looking for structures to charge')

            var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION ||
                                structure.structureType == STRUCTURE_SPAWN ||
                                structure.structureType == STRUCTURE_TOWER) &&
                                structure.energy < structure.energyCapacity;
                    }
            });
            if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
        }
    }
};

module.exports = roleHarvester;

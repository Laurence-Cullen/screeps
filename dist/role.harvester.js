var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.carry.energy < creep.carryCapacity) {
            var sources = creep.room.find(FIND_SOURCES);
            var source = sources[0]

            console.log(creep.name, 'moving to harvest source:', source)

            harvest_response = creep.harvest(source)
            console.log(harvest_response)

            if(harvest_response == ERR_NOT_IN_RANGE) {

                console.log(creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}}));
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

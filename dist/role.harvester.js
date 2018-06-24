genericBehaviours = require('generic_behaviours');


const roleHarvester = {

    /** @param {Creep} creep **/
    run: function (creep) {
        if (creep.carry.energy === 0) {
            genericBehaviours.harvest(creep);
        } else {
            console.log(creep.name, 'looking for structures to charge');

            const targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType === STRUCTURE_EXTENSION ||
                        structure.structureType === STRUCTURE_SPAWN ||
                        structure.structureType === STRUCTURE_TOWER) &&
                        structure.energy < structure.energyCapacity;
                }
            });
            if (targets.length > 0) {
                if (creep.transfer(targets[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {
                        visualizePathStyle: {
                            stroke: '#ffffff'
                        }
                    });
                }
            // if energy is full and nothing needs charging rally at harvester flag
            } else {
                genericBehaviours.rally_at_flag(creep, 'harvester_rally');
            }
        }
    },
    memory_generator: function (role, least_used_source) {
        return {
            role: role,
            target_source: least_used_source
        }
    }
};

module.exports = roleHarvester;
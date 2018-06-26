genericBehaviours = {
    harvest: function (creep) {
        let source = creep.memory.target_source;
        let harvest_response = creep.harvest(Game.getObjectById(source.id));

        let move_to_response;
        if (harvest_response === ERR_NOT_IN_RANGE) {
            move_to_response = creep.moveTo(
                Game.getObjectById(source.id), {
                    visualizePathStyle: {
                        stroke: '#ffaa00'
                    }
                }
            );
            if (move_to_response === ERR_NO_PATH) {
                console.log(creep.name, "can't find a path")
            }
        }
    },
    charge_spawn_and_extensions_and_turrets: function (creep) {
        console.log(creep.name, 'looking for structures to charge');

        const targets = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType === STRUCTURE_EXTENSION ||
                    structure.structureType === STRUCTURE_SPAWN ||
                    structure.structureType === STRUCTURE_TOWER ||
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
            return OK
            // if energy is full and nothing needs charging return ERR_NOT_FOUND
        }
        return ERR_NOT_FOUND;
    },
    charge_containers: function (creep) {
        console.log('creep', creep.name, 'attempting to charge containers');

        const containers = creep.room.find(FIND_STRUCTURES, {
            filter: (i) => i.structureType === STRUCTURE_CONTAINER &&
                i.store[RESOURCE_ENERGY] < i.storeCapacity
        });

        console.log('found', containers.length, 'unfilled containers');

        if (containers.length > 0) {
            if (creep.transfer(containers[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                creep.moveTo(containers[0], {
                    visualizePathStyle: {
                        stroke: '#ffffff'
                    }
                });
            }
            return OK
            // if energy is full and nothing needs charging return ERR_NOT_FOUND
        }
        return ERR_NOT_FOUND;
    },
    // TODO fix
    charge_structure: function (creep, structure_types) {
        console.log('attempting to charge structure');
        let structures = [];
        let structure_type_index;
        for (structure_type_index in structure_types) {
            let structure_type = structure_types[structure_type_index];

            if (structure_type.hasOwnProperty('storeCapacity')) {
                structures = structures.concat(creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType === structure_type) &&
                            (structure.store[RESOURCE_ENERGY] < structure.storeCapacity)
                    }
                }));
            } else if (structure_type.hasOwnProperty('energyCapacity')) {
                structures = structures.concat(creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType === structure_type) &&
                            (structure.energy < structure.energyCapacity);
                    }
                }));
            } else {
                throw 'can\'t determine capacity of structure'
            }
        }
        if (structures.length > 0) {
            if (creep.transfer(structures[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                creep.moveTo(structures[0], {
                    visualizePathStyle: {
                        stroke: '#ffffff'
                    }
                });
            }
            return OK
            // if energy is full and nothing needs charging return ERR_NOT_FOUND
        }
        console.log('no structure found');
        return ERR_NOT_FOUND;
    },

    rally_at_flag: function (creep, flag_name) {
        const flags = creep.room.find(FIND_FLAGS);
        for (let flag_index in flags) {
            // breaks on finding the first flag with a matching name
            if (flags[flag_index].name === flag_name) {
                var rally_flag = flags[flag_index];
                break;
            }
        }
        creep.moveTo(rally_flag, {
            visualizePathStyle: {
                stroke: '#ffaa00'
            }
        });
    }
};

module.exports = genericBehaviours;
genericactions = require('src/actions/generic_actions');
leastUsedSource = require('src/utils/least_used_source');


module.exports = {
    /** @param {Creep} creep **/
    run: function (creep) {
        // update harvesting state
        if (creep.memory.harvesting && creep.carry.energy === creep.carryCapacity) {
            creep.memory.harvesting = false;
        } else if (!creep.memory.harvesting && creep.carry.energy === 0) {
            creep.memory.harvesting = true;
        }

        // when extensions and spawns are fully charged mine from sources
        // if (creep.memory.harvesting && (creep.room.energyAvailable === creep.room.energyCapacityAvailable)) {
        if (creep.memory.harvesting) {
            genericactions.harvest(creep);

        // } else if (creep.memory.harvesting && (creep.room.energyAvailable < creep.room.energyCapacityAvailable)) {
        //     // when extensions and spawn are not fully charged withdraw energy from containers to expedite
        //     // refill process
        //     if (genericactions.withdraw_energy_from_containers(creep) === ERR_NOT_ENOUGH_ENERGY){
        //         genericactions.harvest(creep);
        //     }

        } else {
            if (genericactions.charge_spawn_and_extensions_and_turrets(creep) === ERR_NOT_FOUND) {
                if (genericactions.charge_containers(creep) === ERR_NOT_FOUND) {
                    genericactions.rally_at_flag(creep, 'harvester_rally');
                }
            }
        }
    },
    memory_generator: function (role, spawn) {
        return {
            role: role,
            target_source: leastUsedSource.find(spawn.room),
            harvesting: false
        }
    }
};
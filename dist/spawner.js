economicConfig = require('economic_config');
leastUsedSource = require('least_used_source');
creepBodies = require('creep_bodies');

// generic spawning function to create a creep of a given role at given spawn,
// automatically assigns the creep to the least used source available in the
// room
const spawner = {
    spawn_creep: function (role, spawn, config) {

        let creeps_in_role = _.filter(Game.creeps, (creep) => creep.memory.role === role);
        console.log(creeps_in_role.length, 'creeps in', role, 'role');

        if (creeps_in_role.length < economicConfig.roles[role].MAX) {
            let newName = role + Game.time;
            console.log(
                'Spawning creep in role:', role, 'with name: ', newName
            );

            // finding the source with the minimum number of assigned creeps
            // let least_used_source = leastUsedSource.find(spawn.room);
            const memory_generator = economicConfig.roles[role].memory_generator;

            const body = economicConfig[role].body_selector(spawn.room.energyAvailable);

            // if (spawn.room.energyAvailable >= creepBodies.body_cost(creepBodies.extra_large)) {
            //     body = creepBodies.extra_large;
            // } else if (spawn.room.energyAvailable >= creepBodies.body_cost(creepBodies.large)) {
            //     body = creepBodies.large;
            // } else {
            //     body = creepBodies.medium;
            // }
            // spawning creep
            let spawn_response = spawn.spawnCreep(
                body,
                newName,
                {memory: memory_generator(role, spawn)}
            );
            console.log('spawn response:', spawn_response);
        }
    }
};

module.exports = spawner;
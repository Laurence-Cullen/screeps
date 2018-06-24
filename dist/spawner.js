colonyConfig = require('colony_config');
leastUsedSource = require('least_used_source');
creepBodies = require('creep_bodies');

// generic spawning function to create a creep of a given role at given spawn,
// automatically assigns the creep to the least used source available in the
// room
const spawner = {
    spawn_creep: function (role, spawn, memory_generator) {

        // TODO figure out how this line works
        let creeps_in_role = _.filter(Game.creeps, (creep) => creep.memory.role === role);
        console.log(creeps_in_role.length, 'creeps in', role, 'role');

        if (creeps_in_role.length < colonyConfig.roles[role].MAX) {
            let newName = role + Game.time;
            console.log(
                'Spawning creep in role:', role, 'with name: ', newName
            );

            // finding the source with the minimum number of assigned creeps
            let least_used_source = leastUsedSource.find(spawn.room);
            memory_generator = colonyConfig.roles[role].memory_generator;

            // spawning creep
            let spawn_response = spawn.spawnCreep(
                creepBodies.medium,
                newName,
                {memory: memory_generator(role, least_used_source)}
            );
            console.log('spawn response:', spawn_response);
        }
    }
};

module.exports = spawner;
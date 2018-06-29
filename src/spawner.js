leastUsedSource = require('least_used_source');
creepBodies = require('creep_bodies');


// generic spawning function to create a creep of a given role at given spawn,
// automatically assigns the creep to the least used source available in the
// room
module.exports = {
    spawn_creep: function (role, spawn, sector_config) {

        let creeps_in_role = _.filter(Game.creeps, (creep) => creep.memory.role === role);
        console.log(creeps_in_role.length, 'creeps in', role, 'role');

        if (creeps_in_role.length < sector_config.roles[role].MAX) {
            let newName = role + Game.time;
            console.log(
                'Spawning creep in role:', role, 'with name: ', newName
            );

            // finding the source with the minimum number of assigned creeps
            // let least_used_source = leastUsedSource.find(spawn.room);
            const memory_generator = sector_config.roles[role].memory_generator;

            // importing body building function
            const body_selector = sector_config.roles[role].body_selector;

            // spawning creep
            let spawn_response = spawn.spawnCreep(
                body_selector(spawn.room.energyAvailable),
                newName,
                {memory: memory_generator(role, spawn)}
            );
            console.log('spawn response:', spawn_response);
        }
    }
};
colonyConfig = require('colony_config');
memoryCleaner = require('memory_cleaner');
spawner = require('spawner');

const spawnManager = {
    run: function () {
        // clean up memory of dead creeps
        memoryCleaner.clean();

        let spawn;
        for (let spawn_name in Game.spawns) {
            spawn = Game.spawns[spawn_name];

            if (!spawn.spawning) {

                const number_of_harvester = _.filter(Game.creeps, (creep) => creep.memory.role === 'harvester').length;
                const number_of_upgraders = _.filter(Game.creeps, (creep) => creep.memory.role === 'upgrader').length;

                // TODO remove harvester priority hack
                if (number_of_harvester < colonyConfig.roles['harvester'].MAX) {
                    spawner.spawn_creep('harvester', spawn, colonyConfig.roles['harvester'].memory_generator);

                } else if (number_of_upgraders < colonyConfig.roles['upgrader'].MAX){
                    spawner.spawn_creep('upgrader', spawn, colonyConfig.roles['upgrader'].memory_generator);

                } else {
                    for (const role in colonyConfig.roles) {

                        spawner.spawn_creep(
                            role,
                            spawn,
                            colonyConfig.roles[role].memory_generator
                        );
                    }
                }


            } else {
                // display pop up describing what the spawn is up to
                spawn_viz(spawn);
            }
        }

    }
};

function spawn_viz(spawn) {
    const spawningCreep = Game.creeps[spawn.spawning.name];
    spawn.room.visual.text(
        '🛠️' + spawningCreep.memory.role,
        spawn.pos.x + 1,
        spawn.pos.y, {
            align: 'left',
            opacity: 0.8
        });
}

module.exports = spawnManager;
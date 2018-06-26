economicConfig = require('economic_config');
// militaryConfig = require('military_config');
memoryCleaner = require('memory_cleaner');
spawner = require('spawner');

const spawnManager = {
    economic: function () {
        let spawn;
        for (let spawn_name in Game.spawns) {
            spawn = Game.spawns[spawn_name];

            if (!spawn.spawning) {

                const number_of_harvester = _.filter(Game.creeps, (creep) => creep.memory.role === 'harvester').length;
                const number_of_upgraders = _.filter(Game.creeps, (creep) => creep.memory.role === 'upgrader').length;

                // TODO remove harvester priority hack
                if (number_of_harvester < economicConfig.roles['harvester'].MAX) {
                    spawner.spawn_creep('harvester', spawn, economicConfig.roles['harvester'].memory_generator);

                } else if (number_of_upgraders < economicConfig.roles['upgrader'].MAX) {
                    spawner.spawn_creep('upgrader', spawn, economicConfig.roles['upgrader'].memory_generator);

                } else {
                    for (const role in economicConfig.roles) {

                        spawner.spawn_creep(
                            role,
                            spawn,
                            economicConfig.roles[role].memory_generator
                        );
                    }
                }


            } else {
                // display pop up describing what the spawn is up to
                spawn_viz(spawn);
            }
        }

    },
    // military: function () {
    //     let spawn;
    //     for (let spawn_name in Game.spawns) {
    //         spawn = Game.spawns[spawn_name];
    //
    //         if (!spawn.spawning) {
    //             for (const role in militaryConfig.roles) {
    //
    //                 spawner.spawn_creep(
    //                     role,
    //                     spawn,
    //                     militaryConfig.roles[role].memory_generator
    //                 );
    //             }
    //         }
    //     }
    // }
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
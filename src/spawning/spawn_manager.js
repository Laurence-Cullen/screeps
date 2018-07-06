economicConfig = require('src/config/economic');
militaryConfig = require('src/config/military');
memoryCleaner = require('src/utils/memory_cleaner');
spawner = require('src/spawning/spawner');

module.exports = {
    economic: function () {
        let spawn;
        for (let spawn_name in Game.spawns) {
            spawn = Game.spawns[spawn_name];

            if (!spawn.spawning) {

                // TODO create elegant spawning priority system
                const number_of_harvester = _.filter(Game.creeps, (creep) => creep.memory.role === 'harvester').length;
                const number_of_upgraders = _.filter(Game.creeps, (creep) => creep.memory.role === 'upgrader').length;

                // TODO remove harvester priority hack
                if (number_of_harvester < economicConfig.roles['harvester'].MAX) {
                    spawner.spawn_creep('harvester', spawn, economicConfig);

                } else if (number_of_upgraders < economicConfig.roles['upgrader'].MAX) {
                    console.log('hardcoded upgrader spawn');
                    spawner.spawn_creep('upgrader', spawn, economicConfig);

                } else {
                    for (const role in economicConfig.roles) {

                        console.log('maximum number of creeps in role', role, 'is', economicConfig.roles[role].MAX);

                        spawner.spawn_creep(
                            role,
                            spawn,
                            economicConfig
                        );
                    }
                }

            } else {
                // display pop up describing what the spawn is up to
                spawn_viz(spawn);
            }
        }

    },
    military: function () {
        let spawn;
        for (let spawn_name in Game.spawns) {
            spawn = Game.spawns[spawn_name];

            if (!spawn.spawning) {
                for (const role in militaryConfig.roles) {

                    spawner.spawn_creep(
                        role,
                        spawn,
                        militaryConfig
                    );
                }
            }
        }
    }
};

function spawn_viz(spawn) {
    const spawningCreep = Game.creeps[spawn.spawning.name];
    spawn.room.visual.text(
        '🛠️' + spawningCreep.memory.role,
        spawn.pos.x - 3,
        spawn.pos.y + 1, {
            align: 'left',
            opacity: 0.8
        });
}
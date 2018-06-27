militaryConfig = require('military_config');

module.exports = {
    run: function () {
        for (const creep_name in Game.creeps) {
            const creep = Game.creeps[creep_name];

            // updating creep rally position
            creep.memory.rally_position = militaryConfig.rally_position;

            // when attack on sight mode is false order creeps to rally at designated location
            creep.rally = !militaryConfig.attack_on_sight;

            // finding run_func from mapping in militaryConfig
            militaryConfig.roles[creep.memory.role].run_func(creep);
        }
    }
};
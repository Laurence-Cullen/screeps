economicConfig = require('economic_config');


const workDispatcher = {
    run: function () {
        for (const creep_name in Game.creeps) {
            const creep = Game.creeps[creep_name];

            // finding run_func from mapping in economicConfig
            economicConfig.roles[creep.memory.role].run_func(creep);
        }
    }
};

module.exports = workDispatcher;
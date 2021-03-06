economicConfig = require('config/economic');


module.exports = {
    run: function () {
        for (const creep_name in Game.creeps) {
            const creep = Game.creeps[creep_name];

            if (creep.memory.role in economicConfig.roles) {
                // finding run_func from mapping in economicConfig
                economicConfig.roles[creep.memory.role].run_func(creep);
            }
        }
    }
};
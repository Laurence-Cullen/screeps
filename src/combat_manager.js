militaryConfig = require('config/military');

module.exports = {
    run: function () {
        for (const creep_name in Game.creeps) {
            const creep = Game.creeps[creep_name];
            if (creep.memory.role in militaryConfig.roles) {

                // TODO add squad based military command for more complex attack and defense sequences

                // update squad designations, currently defined on a per role basis as defined in military config
                creep.memory.squad = militaryConfig.roles[creep.memory.role].squad;

                // updating creep rally position based on squad designation
                creep.memory.rally_position = militaryConfig.rally_positions[creep.memory.squad];

                // when rally is true creeps will proceed to rally location if no enemies are present
                creep.memory.rally = militaryConfig.rally;

                militaryConfig.roles[creep.memory.role].run_func(creep);
            }
        }

        // simple hard coded tower defense code, shoots nearest enemy constantly
        // TODO improve tower logic with regards to energy drain attacks, prioritizing high damage enemies etc
        const tower = Game.getObjectById('5b32224aa9caf83167ed9c60');
        const enemy_creep = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if (enemy_creep){
            tower.attack(enemy_creep);
        }

    }
};
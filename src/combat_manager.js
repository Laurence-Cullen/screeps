militaryConfig = require('military_config');

module.exports = {
    run: function () {
        for (const creep_name in Game.creeps) {
            const creep = Game.creeps[creep_name];

            // TODO add group based military command for more complex attack and defense sequences

            // updating creep rally position
            creep.memory.rally_position = militaryConfig.rally_position;

            // when attack on sight mode is false order creeps to rally at designated location
            creep.memory.rally = !militaryConfig.attack_on_sight;

            try {
                // finding run_func from mapping in militaryConfig
                militaryConfig.roles[creep.memory.role].run_func(creep);
            } catch (e) {
                // console.log('encountered exception', e, 'in combat_manager')
            }
        }
        const tower = Game.getObjectById('5b32224aa9caf83167ed9c60');

        const enemy_creep = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if (enemy_creep){
            tower.attack(enemy_creep);
        }

    }
};
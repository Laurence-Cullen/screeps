creepBodies = require('src/body/creep_bodies');
towerAttacker = require('src/roles/tower_attacker');
assasin = require('src/roles/assasin');


module.exports = {
    roles: {
        fast_melee: {
            'MAX': 0,
            'squad': 0,
            'run_func': assasin.run,
            'memory_generator': assasin.memory_generator,
            'body_selector': creepBodies.max_fast_melee
        },
        big_melee: {
            'MAX': 0,
            'squad': 1,
            'run_func': assasin.run,
            'memory_generator': assasin.memory_generator,
            'body_selector': creepBodies.big_melee
        },
        heavy_tank: {
            'MAX': 0,
            'squad': 0,
            'run_func': towerAttacker.run,
            'memory_generator': towerAttacker.memory_generator,
            'body_selector': creepBodies.heavy_tank
        },
        // fast_ranged: {
        //     'MAX': 0,
        //     'squad': 0,
        //     'run_func': soldier.run,
        //     'memory_generator': soldier.memory_generator,
        //     'body_selector': creepBodies.max_fast_ranged
        // }
    },
    // object mapping military squad numbers to rally position
    rally_positions: {
        0: new RoomPosition(24, 19, 'W7S42'),
        1: new RoomPosition(24, 19, 'W7S42')
    },
    rally: true,
    MAX: 30
};
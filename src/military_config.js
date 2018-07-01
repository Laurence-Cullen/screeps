creepBodies = require('creep_bodies');
soldier = require('generic_roles');


module.exports = {
    roles: {
        fast_melee: {
            'MAX': 2,
            'run_func': soldier.run,
            'memory_generator': soldier.memory_generator,
            'body_selector': creepBodies.max_fast_melee
        },
        slow_melee: {
            'MAX': 0,
            'run_func': soldier.run,
            'memory_generator': soldier.memory_generator,
            'body_selector': creepBodies.max_slow_melee
        },
        // TODO fill in tank functionality
        // heavy_tank: {
        //     'MAX': 0,
        //     'run_func':,
        //     'memory_generator':,
        //     'body_selector': creepBodies.heavy_tank
        // },
        fast_ranged: {
            'MAX': 0,
            'run_func': soldier.run,
            'memory_generator': soldier.memory_generator,
            'body_selector': creepBodies.max_fast_ranged
        }
    },
    // rally_position: new RoomPosition(4, 44, 'W8S42'),
    // rally_position: new RoomPosition(42, 40, 'W9S42'),
    rally_position: new RoomPosition(7, 46, 'W9S41'),
    attack_on_sight: true,
    MAX: 30
};
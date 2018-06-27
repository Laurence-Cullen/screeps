creepBodies = require('creep_bodies');
soldier = require('generic_roles');


module.exports = {
    roles: {
        fast_melee: {
            'MAX': 0,
            'run_func': soldier.run,
            'memory_generator': soldier.memory_generator,
            'body_selector': creepBodies.max_fast_melee
        },
        fast_ranged: {
            'MAX': 0,
            'run_func': soldier.run,
            'memory_generator': soldier.memory_generator,
            'body_selector': creepBodies.max_fast_ranged
        }
    },
    rally_position: new RoomPosition(24, 24, 'W7S42'),
    attack_on_sight: false,
    MAX: 30
};
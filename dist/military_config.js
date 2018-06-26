// roleFastMelee = require('role.fast_melee');
// roleFastRanged = require('role.fast_ranged');
genericRoles = require('generic_roles');


militaryConfig = {
    roles: {
        fast_melee: {
            'MAX': 0,
            'run_func': genericRoles.soldier.run,
            'memory_generator': genericRoles.soldier.memory_generator
        },
        fast_ranged: {
            'MAX': 0,
            'run_func': genericRoles.soldier.run,
            'memory_generator': genericRoles.soldier.memory_generator
        }
    },
    rally_position: new RoomPosition(24, 24, 'W7S42'),
    attack_on_sight: false
};


module.exports = militaryConfig;
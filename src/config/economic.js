roleHarvester = require('src/roles/harvester');
roleUpgrader = require('src/roles/upgrader');
roleBuilder = require('src/roles/builder');
roleMaintainer = require('src/roles/maintainer');
creepBodies = require('src/body/creep_bodies');


module.exports = {
    roles: {
        harvester: {
            'MAX': 4,
            'run_func': roleHarvester.run,
            'memory_generator': roleHarvester.memory_generator,
            'body_selector': creepBodies.max_labourer
        },
        upgrader: {
            'MAX': 1,
            'run_func': roleUpgrader.run,
            'memory_generator': roleUpgrader.memory_generator,
            'body_selector': creepBodies.max_labourer
        },
        builder: {
            'MAX': 3,
            'run_func': roleBuilder.run,
            'memory_generator': roleBuilder.memory_generator,
            'body_selector': creepBodies.max_labourer
        },
        maintainer: {
            'MAX': 3,
            'run_func': roleMaintainer.run,
            'memory_generator': roleMaintainer.memory_generator,
            'body_selector': creepBodies.max_labourer
        }
    },
    MAX_CREEPS: 50
};
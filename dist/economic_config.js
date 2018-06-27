roleHarvester = require('role.harvester');
roleUpgrader = require('role.upgrader');
roleBuilder = require('role.builder');
roleMaintainer = require('role.maintainer');
creepBodies = require('creep_bodies');


module.exports = {
    roles: {
        harvester: {
            'MAX': 3,
            'run_func': roleHarvester.run,
            'memory_generator': roleHarvester.memory_generator,
            'body_selector': creepBodies.max_labourer
        },
        upgrader: {
            'MAX': 4,
            'run_func': roleUpgrader.run,
            'memory_generator': roleUpgrader.memory_generator,
            'body_selector': creepBodies.max_labourer
        },
        builder: {
            'MAX': 2,
            'run_func': roleBuilder.run,
            'memory_generator': roleBuilder.memory_generator,
            'body_selector': creepBodies.max_labourer
        },
        maintainer: {
            'MAX': 2,
            'run_func': roleMaintainer.run,
            'memory_generator': roleMaintainer.memory_generator,
            'body_selector': creepBodies.max_labourer
        }
    },
    MAX_CREEPS: 50
};
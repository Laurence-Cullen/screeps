roleHarvester = require('role.harvester');
roleUpgrader = require('role.upgrader');
roleBuilder = require('role.builder');


const colonyConfig = {
    roles: {
        harvester: {
            'MAX': 3,
            'run_func': roleHarvester.run,
            'memory_generator': roleHarvester.memory_generator
        },
        upgrader: {
            'MAX': 1,
            'run_func': roleUpgrader.run,
            'memory_generator': roleUpgrader.memory_generator
        },
        builder: {
            'MAX': 4,
            'run_func': roleBuilder.run,
            'memory_generator': roleBuilder.memory_generator
        }
    },
    MAX_CREEPS: 20
};

module.exports = colonyConfig;
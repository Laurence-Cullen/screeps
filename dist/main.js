spawnManager = require('spawn_manager');
workDispatcher = require('work_dispatcher');
memoryCleaner = require('memory_cleaner');
combatManager = require('combat_manager');


module.exports.loop = function () {
    console.log('TICK');

    combatManager.run();

    // issue creep run commands
    workDispatcher.run();

    // clean up memory of dead creeps
    memoryCleaner.clean();

    // spawn more creeps if necessary
    spawnManager.military();
    spawnManager.economic();
};
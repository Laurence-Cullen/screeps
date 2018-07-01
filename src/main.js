spawnManager = require('dist/spawning/spawn_manager');
workDispatcher = require('src/work_dispatcher');
memoryCleaner = require('src/utils/memory_cleaner');
combatManager = require('src/combat_manager');


module.exports.loop = function () {
    console.log('TICK');

    // perform combat operations and issue instructions to soldier creeps
    combatManager.run();

    // issue creep run commands
    workDispatcher.run();

    // clean up memory of dead creeps
    memoryCleaner.clean();

    // spawn more creeps if necessary
    spawnManager.military();
    spawnManager.economic();
};
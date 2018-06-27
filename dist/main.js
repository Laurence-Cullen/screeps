const spawnManager = require('spawn_manager');
const workDispatcher = require('work_dispatcher');
const memoryCleaner = require('memory_cleaner');

module.exports.loop = function () {
    console.log('TICK');

    // clean up memory of dead creeps
    memoryCleaner.clean();

    // spawn more creeps if necessary
    // spawnManager.military();
    spawnManager.economic();

    // issue creep run commands
    workDispatcher.run();
};
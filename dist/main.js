const spawnManager = require('spawn_manager');
const workDispatcher = require('work_dispatcher');

module.exports.loop = function () {
    spawnManager.run();
    workDispatcher.run();
};
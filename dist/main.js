var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var spawnManager = require('spawn_manager');
var workDispatcher = require('work_dispatcher');

module.exports.loop = function () {
    spawnManager.run();
    workDispatcher.run();
}

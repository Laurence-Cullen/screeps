creepBodies = require('creep_bodies');
leastUsedSource = require('least_used_source');
colonyConfig = require('colony_config');

var spawnManager = {
    run: function() {
        for(var name in Memory.creeps) {
            if(!Game.creeps[name]) {
                delete Memory.creeps[name];
                console.log('Clearing non-existing creep memory:', name);
            }
        }

        var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
        console.log('Harvesters: ' + harvesters.length);

        if(harvesters.length < colonyConfig.MAX_HARVESTERS) {
            var newName = 'Harvester' + Game.time;
            console.log('Spawning new harvester: ' + newName);

            least_used_source = leastUsedSource.find(Game.spawns['Spawn1'].room)

            Game.spawns['Spawn1'].spawnCreep(creepBodies.light, newName, {
              memory: {
                role: 'harvester',
                target_source: least_used_source
              }});
        }

        if(Game.spawns['Spawn1'].spawning) {
            var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
            Game.spawns['Spawn1'].room.visual.text(
                '🛠️' + spawningCreep.memory.role,
                Game.spawns['Spawn1'].pos.x + 1,
                Game.spawns['Spawn1'].pos.y,
                {align: 'left', opacity: 0.8});
        }
    }
}

module.exports = spawnManager;

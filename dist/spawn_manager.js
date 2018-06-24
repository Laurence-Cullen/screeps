creepBodies = require('creep_bodies');
leastUsedSource = require('least_used_source');
colonyConfig = require('colony_config');
memoryCleaner = require('memory_cleaner');
spawner = require('spawner');

var spawnManager = {
    run: function() {
        memoryCleaner.clean();

        for(spawn_name in Game.spawns){
            spawn = Game.spawns[spawn_name];

            if (!spawn.spawning){
                for (var role in colonyConfig.roles){
                    spawner.spawn_creep(role, spawn)
                }
            }
            else{
                spawn_viz(spawn);
            }
        }
        // var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
        // console.log('Harvesters: ' + harvesters.length);
        //
        // if(harvesters.length < colonyConfig.MAX_HARVESTERS) {
        //     var newName = 'Harvester' + Game.time;
        //     console.log('Spawning new harvester: ' + newName);
        //
        //     least_used_source = leastUsedSource.find(Game.spawns['Spawn1'].room)
        //
        //     Game.spawns['Spawn1'].spawnCreep(creepBodies.light, newName, {
        //       memory: {role: 'harvester', target_source: least_used_source}
        //     });
        // }
    }
}

function spawn_viz(spawn){
    var spawningCreep = Game.creeps[spawn.spawning.name];
    spawn.room.visual.text(
        '🛠️' + spawningCreep.memory.role,
        spawn.pos.x + 1,
        spawn.pos.y,
        {align: 'left', opacity: 0.8});
};

module.exports = spawnManager;

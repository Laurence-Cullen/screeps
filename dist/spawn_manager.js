colonyConfig = require('colony_config');
memoryCleaner = require('memory_cleaner');
spawner = require('spawner');

var spawnManager = {
  run: function() {
    // clean up memory of dead creeps
    memoryCleaner.clean();

    for (spawn_name in Game.spawns) {
      spawn = Game.spawns[spawn_name];

      if (!spawn.spawning) {
        for (var role in colonyConfig.roles) {

          spawner.spawn_creep(
            role,
            spawn,
            colonyConfig.roles[role].memory_generator
          );
        }
      } else {
        // display pop up describing what the spawn is up to
        spawn_viz(spawn);
      }
    }

  }
}

function spawn_viz(spawn) {
  var spawningCreep = Game.creeps[spawn.spawning.name];
  spawn.room.visual.text(
    '🛠️' + spawningCreep.memory.role,
    spawn.pos.x + 1,
    spawn.pos.y, {
      align: 'left',
      opacity: 0.8
    });
};

module.exports = spawnManager;
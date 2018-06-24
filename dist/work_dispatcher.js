colonyConfig = require('colony_config');


var workDispatcher = {
  run: function() {
    for (var creep_name in Game.creeps) {
      var creep = Game.creeps[creep_name];

      // finding run_func from mapping in colonyConfig
      colonyConfig.roles[creep.memory.role].run_func(creep);
    }
  }
};

module.exports = workDispatcher;
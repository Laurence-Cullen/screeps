soldier = {
    // TODO adjust attack priorities
    run: function (creep) {
        if (creep.memory.rally) {
            creep.moveTo(creep.memory.rally_position)
        } else {
            const enemy_creep = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);

            if (enemy_creep) {
                if (creep.attack(enemy_creep) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(enemy_creep);
                }
            } else {
                const targets = [
                    FIND_HOSTILE_STRUCTURES,
                    FIND_HOSTILE_CONSTRUCTION_SITES,
                    FIND_HOSTILE_SPAWNS
                ];
                const enemy_structure = creep.pos.findClosestByRange(targets);

                if (enemy_structure) {
                    if (creep.attack(enemy_structure) === ERR_NOT_IN_RANGE) {
                        creep.moveTo(enemy_structure)
                    }
                }
            }
        }

    },
    memory_generator: function (role, spawn) {
        return {
            role: role,
            rally: true,
            rally_position: null,
            target: null
        }
    }
};

module.export = soldier;
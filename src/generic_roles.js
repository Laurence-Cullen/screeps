module.exports = {
    // TODO adjust attack priorities
    run: function (creep) {
        if (creep.memory.rally) {
            console.log(creep.name, 'rallying');
            creep.moveTo(creep.memory.rally_position)
        } else {
            console.log(creep.name, 'looking for attack targets');

            // find targets
            const enemy_creep = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);

            console.log('found enemy creep:', enemy_creep);

            const enemy_towers = creep.room.find(FIND_HOSTILE_STRUCTURES, {
                filter: {structureType: STRUCTURE_TOWER}
            });
            const sorted_enemy_towers = _.sortBy(enemy_towers, enemy_tower => creep.pos.getRangeTo(enemy_tower));

            const enemy_structures = creep.room.find(FIND_HOSTILE_STRUCTURES);
            const sorted_enemy_structures = _.sortBy(
                enemy_structures,
                enemy_structure => creep.pos.getRangeTo(enemy_structure)
            );

            // pick single target from targets
            let target;
            if (sorted_enemy_towers.length > 0) {
                console.log('found enemy towers');
                target = enemy_towers[0]
            } else if (enemy_creep) {
                console.log('found enemy creep');
                target = enemy_creep;
            } else if (sorted_enemy_structures.length > 0) {
                console.log('found enemy structures');
                target = sorted_enemy_structures[0];
            }

            console.log('found target:', target);

            // move to and attack target
            if (target) {
                if (creep.attack(target) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
            } else {
                console.log(creep.name, 'found no enemies, moving to rally point');
                creep.moveTo(creep.memory.rally_position);
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
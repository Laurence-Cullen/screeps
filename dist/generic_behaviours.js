genericBehaviours = {
    harvest: function (creep) {
        let source = creep.memory.target_source;
        let harvest_response = creep.harvest(Game.getObjectById(source.id));

        let move_to_response;
        if (harvest_response === ERR_NOT_IN_RANGE) {
            move_to_response = creep.moveTo(
                Game.getObjectById(source.id), {
                    visualizePathStyle: {
                        stroke: '#ffaa00'
                    }
                }
            );
            if (move_to_response === ERR_NO_PATH) {
                console.log(creep.name, "can't find a path")
            }
        }
    },
    rally_at_flag: function (creep, flag_name) {
        const flags = creep.room.find(FIND_FLAGS);
        for (let flag_index in flags) {
            // breaks on finding the first flag with a matching name
            if (flags[flag_index].name === flag_name) {
                var rally_flag = flags[flag_index];
                break;
            }
        }
        creep.moveTo(rally_flag, {
            visualizePathStyle: {
                stroke: '#ffaa00'
            }
        });
    }
};

module.exports = genericBehaviours;
bodyUtils = require('body_utils');


const creepBodies = {
    light: bodyUtils.construct_body({
        'work': 1,
        'carry': 1,
        'move': 1
    }),
    medium: bodyUtils.construct_body({
        'work': 2,
        'carry': 2,
        'move': 1
    }),
    body_cost: function (body) {
        let total_cost = 0;
        for (let part_index in body) {
            total_cost = total_cost + bodyUtils.part_costs[body[part_index]];
        }
        return total_cost;
    }
};

module.exports = creepBodies;
part_costs = require('part_costs');
bodyUtils = require('body_utils');


module.exports = {
    // light: bodyUtils.construct_body({
    //     'work': 1,
    //     'carry': 1,
    //     'move': 1
    // }),
    // medium: bodyUtils.construct_body({
    //     'work': 2,
    //     'carry': 1,
    //     'move': 1
    // }),
    // large: bodyUtils.construct_body({
    //     'work': 2,
    //     'carry': 2,
    //     'move': 2
    // }),
    // extra_large: bodyUtils.construct_body({
    //     'work': 4,
    //     'carry': 4,
    //     'move': 4
    // }),
    // fast_melee: bodyUtils.construct_body({
    //     'attack': 6,
    //     'move': 6
    // }),
    // fast_ranged: bodyUtils.construct_body({
    //     'ranged_attack': 4,
    //     'move': 4
    // })
    max_labourer: function (energy_budget) {
        // calculate how many multiples of 1 move, 1 work and 1 carry can fit within energy budget
        const body_parts = _.floor(energy_budget / (part_costs.move + part_costs.work + part_costs.carry));
        return bodyUtils.construct_body({'move': body_parts, 'work': body_parts, 'carry': body_parts});
    },
    max_fast_melee: function (energy_budget) {
        // calculate how many multiples of 1 move and 1 attack can fit within energy budget
        const body_parts = _.floor(energy_budget / (part_costs.move + part_costs.attack));
        return bodyUtils.construct_body({'move': body_parts, 'attack': body_parts});
    },
    max_fast_ranged: function (energy_budget) {
        // calculate how many multiples of 1 move and 1 ranged_attack can fit within energy budget
        const body_parts = _.floor(energy_budget / (part_costs.move + part_costs.ranged_attack));
        return bodyUtils.construct_body({'move': body_parts, 'ranged_attack': body_parts});
    }
};
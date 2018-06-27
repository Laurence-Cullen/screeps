part_costs = require('part_costs');
bodyUtils = require('body_utils');


module.exports = {
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
    max_slow_melee: function (energy_budget) {
        // calculate how many multiples of 1 move, 1 tough and 1 attack can fit within energy budget
        const body_parts = _.floor(energy_budget / (part_costs.move + part_costs.attack + part_costs.tough));
        return bodyUtils.construct_body({'move': body_parts, 'attack': body_parts, 'tough': body_parts});
    },
    max_fast_ranged: function (energy_budget) {
        // calculate how many multiples of 1 move and 1 ranged_attack can fit within energy budget
        const body_parts = _.floor(energy_budget / (part_costs.move + part_costs.ranged_attack));
        return bodyUtils.construct_body({'move': body_parts, 'ranged_attack': body_parts});
    }
};
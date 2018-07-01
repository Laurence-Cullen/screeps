part_costs = require('src/body/part_costs');
bodyUtils = require('src/body/body_utils');


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
    },
    // hardcoded unit for level 4 extension energy limitations: cost = 1260 energy, designed to suck up 8 point blank
    // turret hits before death
    heavy_tank: function(energy_budget) {
        return bodyUtils.construct_body({'attack': 2, 'move': 16, 'tough': 30})
    },
    big_melee: function(energy_budget) {
        return bodyUtils.construct_body({'attack': 10, 'move': 10})
    },
};
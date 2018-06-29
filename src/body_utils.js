part_costs = require('part_costs');

module.exports = {
    construct_body: function (part_quantities) {
        let body = [];
        for (let part in part_quantities) {
            for (let i in _.range(part_quantities[part])) {
                body.push(part);
            }
        }
        return body;
    },
    body_cost: function (body) {
        let total_cost = 0;
        for (let part_index in body) {
            total_cost = total_cost + part_costs[body[part_index]];
        }
        return total_cost;
    }
};
const bodyUtils = {
    construct_body: function (part_quantities) {
        let body = [];
        for (let part in part_quantities) {
            for (let i in _.range(part_quantities[part])) {
                body.push(part);
            }
        }
        return body;
    },
    part_costs: {
        'move': 50,
        'work': 100,
        'carry': 50,
        'attack': 80,
        'ranged_attack': 150,
        'heal': 250,
        'claim': 600,
        'tough': 10
    }
};

module.exports = bodyUtils;
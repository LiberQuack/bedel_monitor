'use strict';

let utils = require('os-utils');

exports.getInfo = function() {
    return new Promise(function(resolve, reject) {
        resolve({
            total: Math.round(utils.totalmem()),
            used: Math.round(utils.totalmem() - utils.freemem()),
            free: Math.round(utils.freemem()),
            usage_percentage: Math.round(utils.freememPercentage() * -100) + 100
        });
    })
};

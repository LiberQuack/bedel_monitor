'use strict';

let os = require('os-utils');

exports.getInfo = function () {
    return new Promise(function (resolve, reject) {
        os.cpuUsage(function (total) {
            resolve({
                usage_percentage: Math.round(total * 100)
            });
        });
    });
};

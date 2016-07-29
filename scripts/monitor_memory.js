'use strict';

let utils = require('os-utils'),
    shell = require('shelljs');

exports.getInfo = function() {
    return new Promise(function(resolve, reject) {
        let usedMem = shell.exec("free -m | sed '3q;d' | awk '{print $3}'", {silent: true}).stdout;
        let totalMem = utils.totalmem();

        resolve({
            total: Math.round(totalMem),
            used: Math.round(usedMem),
            free: Math.round(totalMem - usedMem),
            usage_percentage: Math.round(usedMem / totalMem * 100)
        });
    })
};

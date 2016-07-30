'use strict';

let utils = require('os-utils'),
    os = require('os'),
    shell = require('shelljs');

exports.logInfo = function() {
        let usedMem = shell.exec("free -m | sed '3q;d' | awk '{print $3}'", {silent: true}).stdout;
        let totalMem = utils.totalmem();

        let metrics = {
            hostname: os.hostname(),
            metrics_type: "memory",
            total: Math.round(totalMem),
            used: Math.round(usedMem),
            free: Math.round(totalMem - usedMem),
            usage_percentage: Math.round(usedMem / totalMem * 100)
        };
        console.log(JSON.stringify(metrics));
};

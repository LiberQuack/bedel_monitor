'use strict';

let osUtils = require('os-utils'),
    os = require('os');

exports.logInfo = function () {
    osUtils.cpuUsage(function (total) {
        let metrics = {
            hostname: os.hostname(),
            metrics_type: "cpu",
            usage_percentage: Math.round(total * 100)
        };
        console.log(JSON.stringify(metrics));
    });
};
'use strict';

let _disk = require('diskusage'),
    os = require('os'),
    converter = require('./converter');

exports.logInfo = function () {
    _disk.check('/', function (err, info) {
        if (err) {
            return console.error(err);
        }

        let metrics = {
            hostname: os.hostname(),
            metrics_type: "disk",
            total: converter.bytesToGB(info.total),
            used: converter.bytesToGB(info.total - info.free),
            free: converter.bytesToGB(info.free),
            usage_percentage: Math.round(((info.total - info.free) / info.total) * 100)
        };
        console.log(JSON.stringify(metrics));
    });
};
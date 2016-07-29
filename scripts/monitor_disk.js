'use strict';

let _disk = require('diskusage'),
    converter = require('./converter');

exports.getInfo = function () {
    return new Promise(function (resolve, reject) {
        _disk.check('/', function (err, info) {
            if (err) {
                return reject(err);
            }
            resolve({
                total: converter.bytesToGB(info.total),
                used: converter.bytesToGB(info.total - info.free),
                free: converter.bytesToGB(info.free),
                usage_percentage: Math.round(((info.total - info.free) / info.total) * 100)
            });
        });

    });
};
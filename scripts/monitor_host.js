'use strict';

let os = require('os');

exports.getInfo = function() {
    return new Promise(function(resolve, reject) {
        resolve({
            hostname: os.hostname()
        });
    })
};
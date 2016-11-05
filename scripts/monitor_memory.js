'use strict';

let normalize = require('./utils').normalizeElasticText,
    utils = require('os-utils'),
    os = require('os'),
    shell = require('shelljs');

function logMemory() {
    if (shell.exec("free -m | sed '3q;d' | awk '{print $1}'", {silent: true}).stdout.indexOf("-/+\n") > -1) {

        let totalMem = utils.totalmem();
        let usedMem = shell.exec("free -m | sed '3q;d' | awk '{print $3}'", {silent: true}).stdout;

        let memory_metrics = {
            hostname: normalize(os.hostname()),
            metrics_type: "memory",
            total: Math.round(totalMem),
            used: Math.round(usedMem),
            free: Math.round(totalMem - usedMem),
            usage_percentage: Math.round(usedMem / totalMem * 100)
        };

        console.log(JSON.stringify(memory_metrics));
    }
}

function logSwap() {
    if (shell.exec("free -m | sed '4q;d' | awk '{print $1}'", {silent: true}).stdout.indexOf("Swap:\n") > -1) {
        let totalSwap = shell.exec("free -m | sed '4q;d' | awk '{print $2}'", {silent: true}).stdout;
        let usedSwap = shell.exec("free -m | sed '4q;d' | awk '{print $3}'", {silent: true}).stdout;

        let swap_metrics = {
            hostname: normalize(os.hostname()),
            metrics_type: "swap",
            total: Math.round(totalSwap),
            used: Math.round(usedSwap),
            free: Math.round(totalSwap - usedSwap),
            usage_percentage: Math.round(usedSwap / totalSwap * 100)
        };

        console.log(JSON.stringify(swap_metrics));
    }

}

exports.logInfo = function () {
    logSwap();
    logMemory();
};
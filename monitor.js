'use strict';

let os = require('os'),
    cpuMonitor = require('./scripts/monitor_cpu'),
    diskMonitor = require('./scripts/monitor_disk'),
    dockerMonitor = require('./scripts/monitor_docker'),
    memoryMonitor = require('./scripts/monitor_memory');

let period = (+process.argv[2] || 60) * 1000;

if (period < 30000) {
    console.log({msg: `WARNING: bedel monitor is auto overriding time argument from ${period / 1000}s to 30s`});
    period = 30000;
}

setInterval(_ => {
    cpuMonitor.logInfo();
    setTimeout(_ => {
        diskMonitor.logInfo();
        memoryMonitor.logInfo();
        dockerMonitor.logInfo();
    }, 7500)
}, period);
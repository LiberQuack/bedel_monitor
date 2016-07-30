'use strict';

let os = require('os'),
    cpuMonitor = require('./scripts/monitor_cpu'),
    diskMonitor = require('./scripts/monitor_disk'),
    dockerMonitor = require('./scripts/monitor_docker'),
    memoryMonitor = require('./scripts/monitor_memory');

cpuMonitor.logInfo();
diskMonitor.logInfo();
memoryMonitor.logInfo();
dockerMonitor.logInfo();
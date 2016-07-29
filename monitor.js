'use strict';

let cpuMonitor = require('./scripts/monitor_cpu'),
    diskMonitor = require('./scripts/monitor_disk'),
    hostMonitor = require('./scripts/monitor_host'),
    dockerMonitor = require('./scripts/monitor_docker'),
    memoryMonitor = require('./scripts/monitor_memory');

let jobs = [],
    metrics = {};

jobs.push(hostMonitor.getInfo().then(info => metrics.host = info));

jobs.push(cpuMonitor.getInfo().then(info => metrics.cpu = info));

jobs.push(diskMonitor.getInfo().then(info => metrics.disk = info));

jobs.push(memoryMonitor.getInfo().then(info => metrics.memory = info));

jobs.push(dockerMonitor.getInfo().then(info => metrics.docker = info));

Promise.all(jobs).then(_ => console.log(JSON.stringify(metrics)));
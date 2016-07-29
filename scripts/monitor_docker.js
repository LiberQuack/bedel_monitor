'use strict';

let docker = require('docker-remote-api'),
    converter = require('./converter');

let api = docker({
    host: '/var/run/docker.sock'
});

function errorHandler(err, reject) {
    if (err && err.code == "EACCESS") {
        console.warn("monitor");
        return reject(err);
    }

    if (err && err.code == "ENOENT") {
        console.warn(`monitor_docker: could not connect to ${api.host}`);
        return reject(err);
    }

    if (err) {
        return reject(err);
    }
}

function getDockerVersion() {
    return new Promise(function (resolve, reject) {
        api.get("/version", {json: true}, function (err, info) {
            errorHandler(err, reject);
            resolve(info.Version);
        });
    });
}

function getDockerContainers() {
    return new Promise(function (resolve, reject) {
        api.get("/containers/json", {json: true}, function (err, info) {
            errorHandler(err, reject);

            let containers = [];
            for (let container of info) {
                containers.push({
                    id: container.Id,
                    names: container.Names,
                    image: container.Image,
                    status: container.Status
                });
            }

            resolve(containers);
        });
    })
}

function fillContainerInfo(cont) {
    return new Promise(function(resolve, reject) {

        api.get(`/containers/${cont.id}/stats?stream=false`, {json: true}, function (err, containerState) {
            errorHandler(err, reject);

            let memoryLimit = containerState.memory_stats.limit;
            let memoryUsage = containerState.memory_stats.usage;
            cont.stats = {
                memory: {
                    limit: converter.bytesToMB(memoryLimit),
                    used: converter.bytesToMB(memoryUsage),
                    swap: converter.bytesToMB(containerState.memory_stats.stats.swap),
                    usage_percentage: Math.round(memoryUsage / memoryLimit * 100) || 0
                }
            };

            resolve(cont);
        });
    })
}


exports.getInfo = function () {
    let dockerInfo = {},
        jobs = [];

    jobs.push(getDockerVersion().then(vrsn => dockerInfo.version = vrsn));

    return getDockerContainers()
        .then(containers => dockerInfo.containers = containers)
        .then(_ => {
            for (let cntnr of dockerInfo.containers) {
                jobs.push(fillContainerInfo(cntnr));
            }
            return Promise.all(jobs).then(_ => dockerInfo);
        });
};
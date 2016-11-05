'use strict';

let os = require('os'),
    shell = require('shelljs'),
    utils = require('./utils');

exports.logInfo = function () {
    let hostname = utils.normalizeElasticText(os.hostname());

    let cmd = `df -TBG -x aufs -x tmpfs -x devtmpfs | sed '1d' | awk '{print $1" "$4" "$5" "$6}'`;
    let raw = shell.exec(cmd, {silent: true}).stdout.split("\n");
    raw.pop(); //remove last item

    let disks = raw.map(resultLine => {
        let result = resultLine.split(" ");
        return {
            metrics_type: "disk",
            hostname: hostname,
            disk: result[0],
            total: +result[2].replace(/\D/,""),
            used: +result[1].replace(/\D/,""),
            usage_percentage: +(result[3]).replace(/\D/,""),
            disk_full_name: utils.normalizeElasticText(`${hostname}${result[0]}`)
        }
    });

    disks.forEach(i => console.log(JSON.stringify(i)));
};
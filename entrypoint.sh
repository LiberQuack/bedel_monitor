#!/bin/bash

export INTERVAL_SECONDS=${INTERVAL_SECONDS:-60}
export INTERVAL_ARGUMENT=$1
export PERIOD=${INTERVAL_ARGUMENT:-$INTERVAL_SECONDS}

while true; do
    node ./monitor.js
    sleep $PERIOD
done
# BEDEL-MONITOR

Everyone needs a monitor
 

This project is intended to be used with fluentd, so you can retrieve
metrics from host/docker. Then you can do whatever you want, I suggest 
storing the metrics on ElasticSearch because you will be able to visualize
them with kibana

## Usage

Simply run this command on your docker host

```
    docker run \
     --name log_bedel \
     -v /var/run/docker.sock:/var/run/docker.sock \
     -e INTERVAL_SECONDS=60 \
     martinsthiago/bedel_monitor
```

If you run `docker logs log_bedel` you should be able to see the following output:

```json
    {
      "disk": {
        "total": 290,
        "used": 74,
        "free": 216,
        "usage_percentage": 25
      },
      "memory": {
        "total": 5443,
        "used": 4831,
        "free": 612,
        "usage_percentage": 89
      },
      "cpu": {
        "usage_percentage": 18
      },
      "docker": {
        "version": "1.11.2",
        "containers": [
          {
            "id": "57cf1949854a4b68919a75210fdf343087c6e8a5f9042f52bcc83be9e69d5d73",
            "names": [
              "/rangsapi_mongo_1"
            ],
            "image": "mongo:3",
            "status": "Up About an hour",
            "stats": {
              "memory": {
                "limit": 5443,
                "used": 102,
                "swap": 0,
                "usage_percentage": 2
              }
            }
          }
        ]
      }
    }
```

Why JSON? If you have a log collector server, it will be easy to parse metrics

## ROADMAP

- [ ] Retrieve container cpu usage %
- [ ] Improve errors handling

## RELEASES

- v0.2.1 Added auto override for time argument (short times cn harm host cpu metric)
- v0.2.0 Added swap usage and improved disk metrics
- v0.1.0 Added cpu usage into container metrics
- v0.0.5 Changed fullname separator from "/" to "_"
- v0.0.4 Fixed container fullname
- v0.0.3 Logging metrics by type
- v0.0.2 Improved memory monitor to retrieve data similar to htop
- v0.0.1 Logging infos of host/disk/cpu/memory/docker 

## LICENSE

MIT 
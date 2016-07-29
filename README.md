# BEDEL-MONITOR

Everyone needs a monitor, even docker
 
## Usage

This image is intended to be used with fluentd, so you can retrieve
metrics from host/docker. Then you can do whatever you want, I suggest 
storing the metrics on ElasticSearch

Simply run this command on your docker host

```
    docker run \
     --name log_bedel \
     -v /var/run/docker.sock:/var/run/docker.sock \
     -e INTERVAL_SECONDS=1 \
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

Why JSON? If you have a log collector server it will be
easy to parse metrics, it's JSON ;) 

## ROADMAP

- [ ] Retrieve container cpu usage %
- [ ] Improve errors handling

## RELEASES

v0.0.1 Logging infos of host/disk/cpu/memory/docker 

## LICENSE

MIT 
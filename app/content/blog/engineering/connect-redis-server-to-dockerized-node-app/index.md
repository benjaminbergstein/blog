---
title: Let's Dockerize! Connect a Redis server to your node.js app
date: "2020-04-17T22:12:03.284Z"
description: "In this tutorial, we'll learn how to store data in a docker-based Redis-server using docker"
category: engineering
status: draft
---

<p style="border-top: 1px solid #ccc; border-bottom: 1px solid #ccc; padding:
10px 0;">
  <em>
    This is the second in a series of tutorials about using Docker to develop
    Javascript apps. Check out the original post <a href="/engineering/docker-development-with-make/">here</a>.
  </em>
</p>

[Redis](https://redis.io/) is a in-memory data store, used most commonly for
caching and message queuing. In this tutorial, let's set up a dockerized redis
server and access data from a node.js application.

We'll use the project produced by the <a href="/engineering/docker-development-with-make/">previous post</a>
as a jumping-off point. You may want to set that up before following along.

## Steps

To connect node.js and redis, we'll need to do the following:

:one: Add a redis service to docker-compose configuration.  
:two: Add node packages for connecting to redis.  
:three: Write code to set / get data from redis.  

## Add redis to docker-compose configuration

First, we need to extend our `docker-compose-yml` file to add a redis service. We
can use 

```diff
diff --git a/docker/docker-compose.yml b/docker/docker-compose.yml
index 68ffa98..7da39fe 100644
--- a/docker/docker-compose.yml
+++ b/docker/docker-compose.yml
@@ -12,3 +12,17 @@ services:
     # Mount our codebase as a volume, so we can edit code in realtime.
     volumes:
       - ./app:/app
+    # Start redis when app is started.
+    depends_on:
+      - redis
+    # Use docker network for redis host.
+    environment:
+      - REDIS_HOST=redis
+
+  redis:
+    image: redis:latest
+    # Start redis with persistent enabled.
+    command: ["redis-server", "--appendonly", "yes"]
+    # Where to keep persisted data.
+    volumes:
+      - ./data/redis:/data
```

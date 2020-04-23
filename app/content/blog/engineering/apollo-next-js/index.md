---
title: Let's Dockerize! Connect Next.js app to Apollo GraphQL
date: "2020-04-17T22:12:03.284Z"
description: "In this tutorial, we'll learn how to connect a Next.js application to apollo"
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

[Apollo](https://www.apollographql.com/) is a GraphQL ecosystem that offers
an array of libraries for GraphQL client and server use cases.  In this tutorial,
let's set up a GraphQL connection between a Next.js application and a GraphQL
server.

We'll use the project produced by the <a href="/engineering/docker-development-with-make/">previous post</a>
as a jumping-off point. However, instead of the basic template, use the `with-apollo` template instead.

## Steps

To connect node.js and redis, we'll need to do the following:

:one: Add a redis service to docker-compose configuration.  
:two: Connect node.js application to redis.

## Add redis to docker-compose configuration

First, we need to extend our `docker-compose-yml` file to add a redis service. We
can use the official redis Docker image to create this service. Since we want to
be able to stop & start our services without losing data, we need to start redis 
in persistence mode and mount a volume to hold the data.

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

## Connect node.js application to redis

We now have a redis server for storing key-value data. To connect to it from our
node.js application, we need to add the `redis` node package:

### Add redis node package

```bash
$ docker run -w /app -v "$(pwd)/app:/app" --rm node:latest yarn add redis
```

#### Breakdown!

`docker run`: run a one-off command in a container  
`-v "$(pwd)/app:/app"`: mount volume ./app at /app  
`-w /app`: set current working directory to /app  
`--rm`: remove the container after the command completes  
`node:latest`: the image to use  
`yarn add redis`: the command to run  

### Connect to redis from node



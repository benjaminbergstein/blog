---
title: Let's Dockerize! Connect an express server to Docker-based node app
date: "2020-04-17T22:12:03.284Z"
description: "In this tutorial, we'll learn how to connect a Next.js app to an express backend"
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

Previously, we set up a Next.js application for a React client application
with Server Side Rendering (SSR). These applications commonly pull data from
one or more backend service.

In this tutorial, add an [Express](https://expressjs.com) web server, and 
populate our web client with data from it.

We'll use the project produced by the <a href="/engineering/docker-development-with-make/">previous post</a>
as a jumping-off point. You may want to set that up before following along.

## Steps

To connect to our Express backend, we'll need to complete the following steps:

:one: Add a server service to docker-compose configuration.  
:two: Set up the express server.  
:three: Connect the Next.js application to the server service.  

## Add a server service to docker-compose configuration.  

```bash
$ docker run -it -w /app -v "$(pwd)/server:/app" node:latest yarn add express nodemon`
> yarn add v1.21.1
> info No lockfile found.
> [1/4] Resolving packages...
> [2/4] Fetching packages...
> [3/4] Linking dependencies...
> [4/4] Building fresh packages...
> ...
> info Direct dependencies
> ├─ express@4.17.1
> └─ nodemon@2.0.3
> ...
> Done in 1.13s.
```

```Dockerfile
# server/Dockerfile
FROM node:latest

WORKDIR /app

ADD package.json /app
RUN yarn

ADD . /app

ENTRYPOINT ["yarn"]
CMD ["start"]
```

```diff
diff --git a/docker/Makefile b/docker/Makefile
index dd37921..045aa80 100644
--- a/docker/Makefile
+++ b/docker/Makefile
@@ -1,7 +1,10 @@
 export PROJECT=next-project
-export DOCKER_IMAGE=${PROJECT}:latest
-export SERVICE=app
-export PORT ?= 3000
+export SERVICE ?= app
+export BASE_IMAGE=${PROJECT}
+export DOCKER_TAG ?= latest
+export DOCKER_IMAGE=${PROJECT}-${SERVICE}:${DOCKER_TAG}
+export CLIENT_PORT ?= 3000
+export SERVER_PORT ?= 3001

 define COMPOSE_CMD
 docker-compose -p ${PROJECT} \
@@ -9,6 +12,10 @@ docker-compose -p ${PROJECT} \
   -f ./docker-compose.yml
 endef

+all:
+       SERVICE=app ${MAKE} build
+       SERVICE=server ${MAKE} build
+
 build:
        docker build ../${SERVICE} -t ${DOCKER_IMAGE}
```

```diff
diff --git a/docker/docker-compose.yml b/docker/docker-compose.yml
index 64de2df..72070be 100644
--- a/docker/docker-compose.yml
+++ b/docker/docker-compose.yml
@@ -3,13 +3,26 @@ version: '3.7'
 services:
   # `app` is the name of our service
   app:
-    # $DOCKER_IMAGE comes from our Makefile.
-    image: ${DOCKER_IMAGE}
+    # $BASE_IMAGE comes from our Makefile.
+    image: ${BASE_IMAGE}-app:${DOCKER_TAG}
     # Make the port configurable. Important as many libraries default to 3000.
     ports:
-      - ${PORT}:3000
+      - ${CLIENT_PORT}:3000
     # We'll run the dev command here. For production deployment we'll change this.
     command: ["dev"]
     # Mount our codebase as a volume, so we can edit code in realtime.
     volumes:
       - ./app:/app
+    depends_on:
+      - server
+
+  server:
+    image: ${PROJECT}-server:${DOCKER_TAG}
+    # Make the port configurable. Important as many libraries default to 3000.
+    ports:
+      - ${SERVER_PORT}:3000
+    # We'll run the dev command here. For production deployment we'll change this.
+    command: ["dev"]
+    # Mount our codebase as a volume, so we can edit code in realtime.
+    volumes:
+      - ./server:/app
```

```bash
$ make -C docker all stop start
> SERVICE=app make build
> ...
> docker build ../app -t next-project-app:latest
> ...
> Step 1/8 : FROM node:latest
> ...
> Successfully built d26f5302c911
> Successfully tagged next-project-app:latest
> ...
> SERVICE=server make build
> ...
> docker build ../server -t next-project-server:latest
> ...
> Step 1/7 : FROM node:latest
> ...
> Successfully built 497a74b0a97a
> Successfully tagged next-project-server:latest
> ...
> docker-compose -p next-project --project-directory=.. -f ./docker-compose.yml down --remove-orphans
> docker-compose -p next-project --project-directory=.. -f ./docker-compose.yml up -d app
```

```bash
$ SERVICE=server make -C docker logs
> ...
> server_1  | yarn run v1.21.1
> server_1  | warning package.json: No license field
> server_1  | error Command "dev" not found.
> server_1  | info Visit https://yarnpkg.com/en/docs/cli/run for documentation about this command.
> next-project_server_1 exited with code 1
```

## Set up the express server.

## Connect the Next.js application to the server service.

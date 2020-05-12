export PROJECT=blog
export ENVIRONMENT ?= development
export NODE_ENV ?= ${ENVIRONMENT}
export SERVICE ?= app
export PORT ?= 14000

export POSTGRES_USER=blog
export POSTGRES_PASSWORD=l@s3r
export POSTGRES_DB=blog_${ENVIRONMENT}

export DOCKER_REPO=registry.digitalocean.com
export DOCKER_BASE=${DOCKER_REPO}/benbergstein/${PROJECT}
SERVICE_IMAGE=${DOCKER_BASE}-${SERVICE}
DOCKER_TAG ?= latest

define DOCKER_COMPOSE
docker-compose -f docker-compose.${ENVIRONMENT}.yml --project-directory ../${SERVICE} -p blog_${ENVIRONMENT}
endef

define DOCKER_RUN
${DOCKER_COMPOSE} run --rm
endef

include ${SERVICE}.mk

authenticate:
	doctl registry login

build:
	docker build ../${SERVICE} \
		--target ${ENVIRONMENT} \
		-f ./Dockerfile.${SERVICE} \
		-t ${SERVICE_IMAGE}:${DOCKER_TAG}

push:
	docker push ${SERVICE_IMAGE}:${DOCKER_TAG}

start:
	${DOCKER_COMPOSE} up -d

logs:
	${DOCKER_COMPOSE} logs -f ${SERVICE}

stop:
	${DOCKER_COMPOSE} down --remove-orphans

console:
	${DOCKER_RUN} --entrypoint /bin/bash ${SERVICE}

attach:
	${DOCKER_COMPOSE} exec ${SERVICE} /bin/bash

release: ENVIRONMENT=production
release: build push

deploy: ENVIRONMENT=production
deploy: update-repo pull stop start

update-repo:
	git pull --rebase origin master

pull:
	docker pull ${SERVICE_IMAGE}:${DOCKER_TAG}

psql:
	psql -h localhost -U ${POSTGRES_USER} ${POSTGRES_DB}

package.json:
	${DOCKER_RUN} --entrypoint cat ${SERVICE} package.json > ../${SERVICE}/package.json

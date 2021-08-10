include ./secrets.mk

.PHONY: wrangler.toml

wrangler.toml:
	envsubst < ./$@.template > $@

deploy: wrangler.toml
	wrangler publish --env production

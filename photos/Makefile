BUCKET ?= benbergstein-blog
PREFIX ?=
ASSETS_DIR=../app/content/assets/photos

pull:
	s3cmd sync s3://${BUCKET}${PREFIX} ${ASSETS_DIR}

push:
	s3cmd sync -r ${ASSETS_DIR} s3://${BUCKET}${PREFIX}

ls:
	s3cmd ls --recursive s3://${BUCKET}${PREFIX}

clean:
	rm -rf ${ASSETS_DIR}/*

pull-portfolio: ASSETS_DIR=../app/content/assets/portfolio/
pull-portfolio: PREFIX=/portfolio/
pull-portfolio: pull

push-portfolio: ASSETS_DIR=../app/content/assets/portfolio/
push-portfolio: PREFIX=/portfolio/
push-portfolio: push

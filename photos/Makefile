BUCKET ?= benbergstein-blog
PREFIX ?=
ASSETS_DIR=../app/content/assets/photos

pull:
	s3cmd sync s3://${BUCKET}${PREFIX} ${ASSETS_DIR}

ls:
	s3cmd ls --recursive s3://${BUCKET}${PREFIX}

clean:
	rm -rf ${ASSETS_DIR}/*

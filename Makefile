#!/usr/bin/make

test:
	make test-e2e-4
	make test-e2e-5

test-e2e-4:
	docker run -it --rm --ipc=host -v .:/srv/app -w /srv/app/e2e/svelte-4 mcr.microsoft.com/playwright:v1.52.0-jammy /bin/bash -c "npm i && npm run test"

test-e2e-5:
	docker run -it --rm --ipc=host -v .:/srv/app -w /srv/app/e2e/svelte-5 mcr.microsoft.com/playwright:v1.52.0-jammy /bin/bash -c "npm i && npm run test"

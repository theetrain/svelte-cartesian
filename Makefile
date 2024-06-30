#!/usr/bin/make

test-e2e:
	docker run -it --rm --ipc=host -v .:/srv/app -w /srv/app/e2e/svelte-4 mcr.microsoft.com/playwright:v1.45.0-jammy /bin/bash -c "npm i && npm run test"

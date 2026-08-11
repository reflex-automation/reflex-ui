# Reflex UI

Web UI for Reflex, a community-maintained continuation of Event-Driven
Ansible (EDA) that targets open-source AWX-compatible controllers, mainly
[CIQ Ascender](https://ciq.com/products/ascender).

Red Hat stopped developing EDA as a supported open-source product and now
uses the code as the internal upstream of Ansible Automation Platform.
Reflex tracks the ansible/* repos as friendly forks: the patch set stays
small, upstream merges happen regularly, CVEs get patched, and releases
are smoke-tested end to end against Ascender.

This is a fork of
[ansible/ansible-ui](https://github.com/ansible/ansible-ui), the AAP UI
monorepo. Reflex ships the standalone EDA workspace (`frontend/eda`) as
its web UI, published at `ghcr.io/reflex-automation/reflex-ui` and
deployed by
[reflex-operator](https://github.com/reflex-automation/reflex-operator).
The other workspaces (platform, AWX, hub) are left intact so merges stay
clean, but they are not built or shipped.

## What Reflex changes

- A standalone UI image (`Dockerfile.eda`): unprivileged nginx serving the
  built `frontend/eda` bundle. Upstream ships no standalone EDA UI image.
- Reflex branding: product name, logos, titles. The vite build now defines
  `PRODUCT` and `VERSION`, which upstream only set in the webpack build.
- Everything else (components, API helpers, tests) stays upstream-shaped.

## Build the UI image

```bash
npm ci
(cd frontend/eda && npx vite build)
docker build -f Dockerfile.eda --platform linux/amd64 \
  -t ghcr.io/reflex-automation/reflex-ui:main .
```

## Development

```bash
npm ci
EDA_SERVER=http://localhost:8000 npm run eda   # EDA UI dev server on :4103
npm test                                       # eslint + tsc + prettier + vitest
npm run fix                                    # eslint:fix + prettier:fix
```

See [docs/DEVELOPMENT.md](./docs/DEVELOPMENT.md) and the
[framework README](./framework/README.md) for the wider monorepo.

## License and attribution

Apache-2.0, unchanged from upstream; see [LICENSE](LICENSE).
Based on [ansible/ansible-ui](https://github.com/ansible/ansible-ui),
© Red Hat, Inc. and contributors. Reflex is a community project and is not
affiliated with or endorsed by Red Hat. "Ansible" is a trademark of
Red Hat, Inc.

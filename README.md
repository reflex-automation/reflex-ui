# Reflex UI

Web UI for **Reflex** — a community-maintained continuation of Event-Driven
Ansible (EDA), targeting open-source AWX-compatible controllers, primarily
[CIQ Ascender](https://ciq.com/products/ascender).

This is a friendly fork of
[ansible/ansible-ui](https://github.com/ansible/ansible-ui) (the AAP UI
monorepo). Reflex ships the standalone **EDA workspace** (`frontend/eda`) as
its web UI, published at `ghcr.io/reflex-automation/reflex-ui` and deployed by
[reflex-operator](https://github.com/reflex-automation/reflex-operator).
The other workspaces (platform, AWX, hub) are kept intact for mergeability
but are not built or shipped.

## What Reflex changes

- **Standalone UI image** (`Dockerfile.eda`): unprivileged nginx serving the
  built `frontend/eda` bundle — upstream ships no standalone EDA UI image.
- **Reflex branding**: product name, logos, titles; the vite build now
  defines `PRODUCT`/`VERSION` (upstream only set them in the webpack build).
- Everything else — components, API helpers (`/api/eda/v1`), tests — stays
  upstream-shaped for clean merges.

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

Apache-2.0, unchanged from upstream — see [LICENSE](LICENSE).
Based on [ansible/ansible-ui](https://github.com/ansible/ansible-ui),
© Red Hat, Inc. and contributors. Reflex is a community project and is not
affiliated with or endorsed by Red Hat. "Ansible" is a trademark of
Red Hat, Inc.

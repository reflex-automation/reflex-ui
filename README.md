# Reflex UI

Web UI for Reflex, a community-maintained fork of Event-Driven
Ansible (EDA) that targets open-source AWX-compatible controllers, mainly
[CIQ Ascender](https://ciq.com/products/ascender).

ansible/ansible-ui and ansible/eda-server are actively developed by Red
Hat. Reflex tracks them as close friendly forks: the patch set stays small
and upstream merges happen regularly. It exists for standalone and Ascender
compatibility fixes upstream doesn't carry by default, features useful to
AWX and Ascender users, CVE patching, and releases smoke-tested end to end
against Ascender.

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
- A "Suggest only" checkbox in the rulebook activation options, shown on
  the activation details page. Rules still evaluate and land in the rule
  audit, but job template, workflow template, playbook and module actions
  are replaced by a debug message. Needs the matching reflex-server change.
- A "Webhook credential" select on the project form (clearable on edit)
  and a copyable "Webhook URL" on project details, for syncing a project
  on git push. Needs the matching reflex-server change.
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

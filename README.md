# TD-archiweb

![Languages](https://img.shields.io/github/languages/top/AlexandreCGithub/archiweb-TD)
![Contributors](https://img.shields.io/github/contributors/AlexandreCGithub/archiweb-TD)
![Install with Bun](https://img.shields.io/badge/Install%20with-Bun-ff6347)

![Vitest](https://img.shields.io/badge/Test%20with-Vitest-00b4d8)
![Tests](https://github.com/AlexandreCGithub/archiweb-TD/actions/workflows/docker-image.yml/badge.svg)
![Prettier](https://img.shields.io/badge/Prettier-Enabled-brightgreen)
![ESLint](https://img.shields.io/badge/ESLint-Enabled-brightgreen)

## 1. Description

Project built for the archiweb class, which is a recipes website.

We are the Chi team.

This project uses Svelte/Sveltekit

This project uses bun as a package manager

Our site is in french, but our documentation and comments will be in english

## 2. Deployment

### Local deployment

1. Download and unzip, or clone the repository

2. Install bun if needed

```bash
curl -fsSL https://bun.sh/install | bash
```

3. Open a terminal on the repository

4. Install dependencies:

```bash
bun run install
```

5. Run (dev mode)

```bash
bun dev
```

Add `--open` to automatically open web browser

### Online deployment

The app is supposed to be deployed [there](https://chi.cours.quimerch.com/)

Based on the docker image published [online](https://hub.docker.com/repository/docker/magnoir/archiweb-td/general) automatically by our pipeline

## 3. Contents

### Pages

`/` : list of the recipes

`/recipes/{id}` : description of a specific message

`/favorites` : list of favorites of the connected user

### Features

- User can log in and log out
- User can add and remove favorites when connected
- User can see its own favorites if connected
- User can see the number of favorites a recipe has in all cases
- Any one should be able to connect and the website should work
- Note : we will only display the recipes that have `"published":true`, and will not display those with `false`

## 4. Tests, CI/CD Pipeline & Good practices

This project is developped using branches & pull requests and uses a pipeline.

CI jobs run each time there is an update on a branch with a pull request. If a pull request is created on an already existing branch with several commits, the last one is tested. They check :

- project configuration
- the linter
- perform tests on the app

CD jobs run when a branch is merged with the `main` branch, and if the CI succeeds. A branch should be merged only if CI of last commit succeeded.
It deploys a Docker image
[online](https://hub.docker.com/repository/docker/magnoir/archiweb-td/general)

To format code:

```bash
bun format
```

To run tests locally:

```bash
bun run test
```

## 5. Performance optimisations

The sites tries to have the best performance possible.
Performance [here](https://performance.quimerch.com/?token=cs)
Can also be tested using Lighthouse

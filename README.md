# TD-archiweb

## 1. Description

Project built for the archiweb class, which is a recipes website.

This project uses Svelte/Sveltekit

This project uses bun as a package manager

## 2. Deployment

### Local deployment

Download repository

Install bun if needed

Install dependencies:

```bash
bun run install
```

Run (dev mode)

```bash
bun dev
```

Add `--open` to automatically open web browser

### Online deployment

The app is supposed to be deployed [there](https://chi.cours.quimerch.com/)

Based on the docker image published [online](https://hub.docker.com/repository/docker/magnoir/archiweb-td/general)

## 3. Contents

### Pages

`/` : list of the recipes

`/recipes/{id}` : description of a specific message

`/favorites` : list of favorites of the connected user

### Features

- User can log in and log out
- User can add and remove favorites when connected
- User can see its own favorites if connected
- User can see the number of favorites a recipe has
- Any one should be able to connected and the website should work

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

## 6. CO2 emissions and Green IT

Link here

# TD-archiweb

## Description

Project built for the archiweb class, which is a recipes website

This project uses bun

## Local deployment

Install dependencies:

```bash
bun run install
```

Run (dev mode)

```bash
bun dev
```

Add `--open` to automatically open web browser

## Online deployment

The app is supposed to be deployed [there](https://chi.cours.quimerch.com/)

## CI/CD

CI jobs run each time there is an update on a branch with a pull request. If a pull request is created on an already existing branch with several commits, the last one is tested

They perform several tests on the app

CD jobs run when a branch is merged with the `main` branch.
It deploys a Docker image
[online](https://hub.docker.com/repository/docker/magnoir/archiweb-td/general)

To run tests locally:

```bash
bun run test
```

## Pages

`/` : list of the recipes

`/recipes/{id}` : description of a specific message

`/favorites` : list of favorites of the connected user

_... add more here if needed..._

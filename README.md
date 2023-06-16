# MY-T3-APP-WITH-MS-SQL

This repository demonstrates using the [T3 Stack](https://create.t3.gg/) with MS SQL and in a development container as well.

If you clone this repository go in to ./.devcontainer, and make a copy of .env-example and name it simply .env

Update the variables accordingly and remove the appropriate comments where the values are.

After you have updated the environment variables for your dev container select the option to Rebuild and Reopen in Dev Container.

If your computer is not setup for Dev Containers yet see [Dev Containers Tutorial](https://code.visualstudio.com/docs/devcontainers/tutorial) on the VS Code home page.

This application also demonstrates "docker in docker" functionality, where you can spin up a new instance, and database of the application without it affecting your development database.

Copy /my-t3-app/.env-example to /my-t3-app/.env. Fill in the appropriate variables. When you feel that you have the variables correct execute the following commands while in /workspaces/my-t3-app-with-ms-sql/my-t3-app:

```bash
docker compose build
docker compose up
```

Press CTRL+C to quit. I recommend composing down often I.E.:

```bash
docker compose down
```

If you want to you can also run in daemon mode with

```bash
docker compose up -d
```

Then later

```bash
docker compose stop
docker copose down
```

This is handy to ensure that a production build runs on your computer.

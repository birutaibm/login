# Login base system

This repository is intended to be used as a base code for all systems that need a user-password login. It can use username or e-mail as the `user`. It has a password reset functionality using e-mail to send link. It uses a JWT save in a dedicated table at database, that can be revoked. It allow to give different access role to different users. It was created as a monorepo, where server uses adonis and web uses create-react-app.

## Lembrete de alguns comandos utilizados no terminal
*criação do servidor:* `yarn create adonis-ts-app server` dentro da pasta packages.
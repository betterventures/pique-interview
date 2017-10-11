# README

[![CircleCI](https://circleci.com/gh/getpique/pique-web/tree/master.svg?style=svg&circle-token=52dc88cce50f809d38402f54dffe054528bebb34)](https://circleci.com/gh/getpique/pique-web/tree/master)

## Setup

We have a few tricky dependencies in this project. Thus, please follow the following steps:

1. Make sure you have Postgres installed: `brew install postgresql`
1. Make sure you have Bundler installed: `gem install bundler`
1. Install gems: `bundle`
1. Create DB and run migrations: `bundle exec rake db:create db:migrate`
1. Make sure [Yarn is installed](https://yarnpkg.com/lang/en/docs/install/): `brew install yarn`
1. Install Node dependencies: `yarn` (in root dir)
1. Start server: `foreman start -f Procfile.hot.dev`

## Deployments

[Production](https://pique-web.herokuapp.com) - deploys `master`
[Staging](https://pique-web-staging.herokuapp.com) - deploys `staging`

Deployments are automated using Heroku Github integration.

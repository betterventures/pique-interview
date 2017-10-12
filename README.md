# README

[![CircleCI](https://circleci.com/gh/getpique/pique-web/tree/master.svg?style=svg&circle-token=52dc88cce50f809d38402f54dffe054528bebb34)](https://circleci.com/gh/getpique/pique-web/tree/master)

Welcome to the Pique web app! We're happy you're here :)

## Setup

We have a few tricky dependencies in this project. Thus, please follow the following steps:

1. Checkout a new branch for the interview: `git checkout -b interview-<yourname>`
1. Make sure you have Postgres installed: `brew install postgresql`
1. Make sure you have Bundler installed: `gem install bundler`
1. Install gems: `bundle`
1. Create DB and run migrations: `bundle exec rake db:create db:migrate`
1. Make sure [Yarn is installed](https://yarnpkg.com/lang/en/docs/install/): `brew install yarn`
1. Install Node dependencies: `yarn` (in root dir)
1. Add Mandrill API key: `export MANDRILL_API_KEY="152FyVQrRMI5c7O4oEmduQ"`
1. Add Filepicker API key: `export FILEPICKER_API_KEY="Aw4WfTTq8QxmplkGIzrYgz"`
1. Generate vendor-bundle: `yarn run build:production`
1. Start server: `foreman start -f Procfile.hot.dev`


## Workflow

We follow the following agile workflow:

1. Standup (M-F @ 11am IST)
  - in Google Hangout
  - did yesterday, did today, blockers, questions, interestings
1. EOD (M-F @ 8pm IST (or whenever you finish for day))
  - in Slack
  - got this far on X, blocked on Y, need resource/design Z
  - Frank will code review any PRs and either merge or ask for modifications
1. IPM (M @ 11am IST)
  - in Google Hangout and Pivotal Tracker
  - go over tickets for week's sprint, estimate as a team, raise any questions
  - do any stories need to be specified further?
1. Retro (F @ 8pm IST)
  - in Google Hangout + Google Sheets
  - happy/meh/sad format
  - what is going well and what could be better with: communication, tech, hours, workflow, testing

Please just take the next ticket off of Tracker and start working on it. You can expect Tracker to always be in priority order.



## Styleguide

Our app is still being developed so there are many ways it could be better :).

We are trying to move towards the following:

1. Architecture: Multiple Rails controllers talking to React app, instead of one monolithic controller (ScholarshipsController)
1. CSS: use Flexbox over Bootstrap classes (no new rows/cols please. Refactoring old ones to use Flexbox is welcome but not necessary)
1. React: writing wrapper components for common UI pieces
1. Redux: further developing our middleware and reducers

Thanks! :)


## Deployments

[Production](https://pique-web.herokuapp.com) - deploys `master`
[Staging](https://pique-web-staging.herokuapp.com) - deploys `staging`

Deployments are automated using Heroku Github integration.


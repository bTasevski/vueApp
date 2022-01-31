# NBA stats

## Installation and Setup

Make sure `node` and `npm` are installed globally.
- Clone down this repository.
- Installation:
  `npm install`
- To start server:
  `npm start`
- In your browser visit `http://localhost:8080`

## Introduction

- Simple dashboard app showing stats for players in NBA.

- Data is sourced from www.balldontlie.io/

## Tech-stack:
- Vue3
- SCSS
- REST API
- ESLINT
- PRETTIER
- vuestic-ui


## Actual state of project

What you can:
- Search for players by name or surname
- Search for players through browsing long but paginated list
- Show basic personal information about player (like team, height etc.)
- Choose seasons range and generate charts with specific averages statistics (max 5 seasons, because API is limited to 60 calls per minute)

What's next?
App is working but there are few important things to do which will be done:
- Adding RWD - now it is only ok with desktop
- Correcting project files structure and files names
- Big refactor of scss (considering total refactor with switching to css modules)
- Separation of components
- Better typing
- Separation of fetch method to make it universal and reusable (like in my react project: https://github.com/bTasevski/frontend-restaurant-app/blob/main/src/hooks/useFetch.ts)



## Author

Bojan Tasevski - https://github.com/bTasevski







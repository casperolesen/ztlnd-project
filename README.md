# zetland-project

A demo-project build with vue.js using data from the open hacker news API provided by Ycombinator https://github.com/HackerNews/API

## Description
- The project displays info about the stories with highest score under 'Top Stories'
- Subscribing to an author will display the most recent story from each subscribed authors in the 'Subscribed Feed'

The subscribe feature is just a prototype for demonstrating an alternative way for displaying articles. No backend is set up for saving subscriptions.

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

## Architecture
The project is build using the following folder setup

### assets
Folder containing static files

### components
Folder containing vue components

### constants
Folder containing custom data objects

### services
Folder containing all communication to the Hacker News API

### util
Folder containing functions used in project




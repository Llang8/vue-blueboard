# Vue BlueBoard

> A Vue.js project for remotely conducting JavaScript whiteboard interviews. Allows interviewers to join a room with a potential JavaScript developer and give them prompts to workthrough. The app also includes a video chat function when in a room with another user.


## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

For detailed explanation on how things work, consult the [docs for vue-loader](http://vuejs.github.io/vue-loader).

## TODO:
- [X] Set up Python Backend for allowing users to login and register
- [X] Set up database in Postgresql
- [X] Connect socket.io to a NodeJS backend to allow users to code and text chat in realtime in separate rooms
- [X] Allow authenticated users to create rooms
- [ ] Add more prompts to Practice Room
- [X] Add difficulty dropdown/selection to practice room.

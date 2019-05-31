# Website patrol

## This app patrols websites day and night.

## If you want to fork and use

This patroller is just prototype.

Patroller can find site making errors by himself, but sending push message does not. It uses private push sender. So if you want to use thia app, you must customize `service/db.sendPush`.

By setting up `config/patrolConfig.json`, patroller can check anything you want.

## Project setup
```
npm install
```

### Run
```
npm run start
```

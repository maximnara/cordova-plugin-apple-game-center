# Apple Game Center for Ionic and Cordova apps.
You can login and hame achievements.

--------

## Table of Contents

- [State of Development](#state-of-development)
- [Install](#install)
- [Usage](#usage)


## State of Development
- [x] <img src="https://img.shields.io/badge/-Complete-brightgreen.svg?label=Sign%20In%20Support&style=flat-square">
- [x] <img src="https://img.shields.io/badge/-Complete-brightgreen.svg?label=Achievements%20Support&style=flat-square">
- [ ] <img src="https://img.shields.io/badge/-In%20Development-yellow.svg?label=Leaderboards%20Support&style=flat-square">
- [ ] <img src="https://img.shields.io/badge/-In%20Development-yellow.svg?label=Game%20Savings%20Support&style=flat-square">
- [ ] <img src="https://img.shields.io/badge/-In%20Development-yellow.svg?label=Friends%20Support&style=flat-square">
- [ ] <img src="https://img.shields.io/badge/-In%20Development-yellow.svg?label=Player%20Stats%20Support&style=flat-square">
- [ ] <img src="https://img.shields.io/badge/-In%20Development-yellow.svg?label=Anti-Piracy%20Support&style=flat-square">

-------- 

## Install

```bash
npm i cordova-plugin-apple-game-center --save
```

-------- 
## Usage

- [Sign In](#sign-in)
- [Achievements](#achievements)
  - [Unlock achievement](#unlock-achievement)
  - [Show achievements](#show-achievements)
  
  
This library is Promise style, you can use .then or await to fetch results

### Sign In

```javascript
import * as GameCenter from 'cordova-plugin-apple-game-center';
await GameCenter.login();
```
***
### Achievements

#### Unlock achievement

```javascript
await GameCenter.unlockAchievement({ id: 'your-id' });
```

#### Show achievements
This method is show native Google Games UI 
```javascript
await GameCenter.showAchievements();
```


### Feel free to make your PRs for code structure or new functions

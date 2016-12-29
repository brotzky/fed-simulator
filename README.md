#Universe SIM Manager

[![CircleCI](https://circleci.com/gh/azz0r/wwe-draft-generator.svg?style=svg)](https://circleci.com/gh/azz0r/wwe-draft-generator)

### [View a demo here](https://www.wwesim.com)

## 📕 Index
* [Installing](#installing)
* [Features](#features)
* [Launching](#launching)
* [Testing](#testing)

### 💪 <a name="installing"> Installing</a>
```
npm cache clean;
npm install
npm run start;
```
or
```
yarn
```


### Features
* PPV, moves, wrestlers, brands, shows, championships collections
* Create a show
* Drag and drop wrestlers onto relevant targets (championships, matches, brands)
* Select who wins a match

### 🚀 <a name="launching">Launching</a>
* Development ```npm run start```
* Build  ```npm run build```
* Test  ```npm run test```
* Test with Coverage report ```npm run test:coverage```

###  📚 <a name="testing">Testing</a>
Powered by Mocha, Chai, Enzyme, Sinon.

* Run unit tests ```npm run test```

Tests are written by creating .spec files under a __tests__ directory.

## ✨ <a name="features">Features</a>
* Hot reloading (v3)
* Static compile
* Bundle per route
* SASS compiling with hot reload
* Per component SASS
* Webpack dev & production configs inherit from a common config
* Mocha, Chai & Enzyme testing
* Redux
* React Router 3.0
* Stage 0, ES6

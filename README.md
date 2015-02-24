# angular-http-plus v0.0.1
[![Build Status](https://travis-ci.org/ceoaliongroo/angular-http-plus.svg?branch=master)](https://travis-ci.org/ceoaliongroo/angular-http-plus)
 
Simple library to request data from restful services.

The angular-http-plus is a service based in ['$http'](https://docs.angularjs.org/api/ng/service/$http) angular service with extra characteristics, data and promise caching.. 

# Installation

Install via [bower](http://bower.io/search/)
```bash
bower install angular-http-plus --save
```

Add to you project
```html
 <script src="bower_components/angular-http-plus/angular-http-plus.min.js"></script>
```

Inject the module into your application
```javascript
angular.module('myApp', ['cm.angularHttpPlus']);
```

# Usage

## Service
```javascript
angular.module('myApp'. ['cm.angularHttpPlus'])
  .service('newservice', function(Restful) {
    angular.extend(this, Restful);
  });
```

# Developers

- Create issue explain the feature, bug or question.
- Fork and clone the repo.
- Install grunt dependencies:

```bash
npm install 
```

- Create branch name as the issue created.
- Modify the code and add test features.
- Run all the tests:

```bash
grunt test
```

- Push your fork and submit a pull request. 

# Testing 

```bash
npm install
grunt test
```

# Build

```bash
grunt build
```

# License

MIT

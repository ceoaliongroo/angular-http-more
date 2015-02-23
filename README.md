# angular-http-plus
 
Simple library to request data from restful services.

The angular-http-plus is a service based in ['$http'](https://docs.angularjs.org/api/ng/service/$http) angular service with extra characteristics, data and promise caching.. 

# Example

## Service
```javascript
angular.module('app'. ['elementModule'])
  .service('newservice', function(Restful) {
    angular.extend(this, Restful);
  });
```

# License

MIT

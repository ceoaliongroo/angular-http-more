'use strict';

/**
 * @ngdoc service
 * @name cm.angularHttpPlus.restful
 * @description
 * # Restful
 * Service in to perform restful via $http request with extra powers.
 */
angular.module('cm.angularHttpPlus', [])
  .service('Restful', ["$q", "$http", "$timeout", "$rootScope", function RestfulService($q, $http, $timeout, $rootScope) {
    var self = this;

    // A private cache key.
    var cache = {};
    var clearCache;

    // Promise cache.
    var getData;

    // Property used to save the configuration Restful service.
    var config = {};

    /**
     * Permits configure the service
     *
     * @param options
     *  An object with the configuration of the restful service that wants
     *  to get.
     *
     *  url: string - Full end point of the resource to get the data. Ex. http://server.com/tasks
     *  transformResponse: function - Function of a transformation of response of the response.
     */
    this.setConfig = function(options) {
      if (angular.isUndefined(options)) {
        return;
      }
      // Configure the promise server request, only if not cache defined.
      angular.extend(config, options);
    };

    /**
     * Return the promise with the events list, from cache or the server.
     *
     * @returns {*}
     *  The promise resolve/reject
     */
    this.get = function () {
      // Reject the promise if the service it's not configured.
      if (!Object.keys(config).length) {
        return $q.reject(new Error('Configuration not defined.'));
      }

      // Get the Data.
      getData = $q.when(getData || getCache() || getDataFromBackend());

      // Clean promise cache after promise was resolved or rejected.
      getData.finally(function getDataFinalize() {
        getData = undefined;
      });

      return getData;
    };

    /**
     * Return data from the server as a array of objects, wrapped in a promise.,
     * Set cache data.
     *
     * @returns {$q.promise}
     */
    function getDataFromBackend() {
      var deferred = $q.defer();

      $http({
        method: 'GET',
        url: config.url,
        transformResponse: config.transformResponse
      }).success(function (response) {
        setCache(response);
        deferred.resolve(response);
      });

      return deferred.promise;
    }

    /**
     * Save meters in cache, and broadcast en event to inform that the meters data changed.
     *
     * @param data
     *   The array of object that return.
     */
    function setCache(data) {
      // Cache data.
      cache = {
        data: data
      };

      // Clear cache in 60 seconds.
      clearCache = $timeout(function () {
        cache = {};
      }, 60000);

      // Broadcast a change event.
      $rootScope.$broadcast('restfulChanged');
    }

    /**
     * Return a copy of the data cache, this keep the original data cached.
     *
     * @returns {*}
     */
    function getCache() {
      return angular.copy(cache.data);
    }

    /**
     * Prepare response; Convert ID to int.
     *
     * As we explicetly require ui-router to match an int, we must case the
     * entity ID to integer.
     *
     * @param data
     *
     * @returns {*}
     */
    function prepareResponse(data) {
      // Convert response serialized to an object.
      data = angular.fromJson(data).data;

      if (!data) {
        // A 401 response was sent.
        return;
      }


      return data;
    }

    // Register listner to clear cache
    $rootScope.$on('clearCache', function () {
      // Reject the promise for clearing cache.
      if (angular.isDefined(cache.data)) {
        clearCache.cancel();
      }

      // Clear promise and data cache.
      cache = {};
      getData = undefiend;
    });

  }])
;

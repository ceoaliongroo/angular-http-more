'use strict';

describe('Component: Restful', function () {

  // load the service's module
  beforeEach(module('elementModule'));

  // instantiate service
  var $rootScope;
  var $httpBackend;
  var $q;
  var restfulService;
  var resourceService = {};
  var getDataFromBackend;


  beforeEach(inject(function (_Restful_, _$httpBackend_, _$q_, _$rootScope_) {
    restfulService = _Restful_;
    $rootScope = _$rootScope_;
    $httpBackend = _$httpBackend_;
    $q = _$q_;

    // Extend the service.
    angular.extend(resourceService, restfulService);
  }));

  afterEach(function () {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  describe('service', function() {
    it('should be defined', function () {
      expect(!!restfulService).toBe(true);
    });

    it('should be extendable to other services', function () {
      expect(!!resourceService.setConfig).toBeDefined(true);
    });
  });

  describe('get() without configuration', function() {

    it('should return a promise rejected.', function () {
      var error = jasmine.createSpy();
      resourceService.get().catch(error);
      $rootScope.$apply();
      expect(error).toHaveBeenCalled();
    });
  });

  describe('get() data from the server', function() {
    var success = jasmine.createSpy();
    var options = {};
    var getData;

    beforeEach(function() {
      // Set service configuration.
      options = {
        url: 'http://server.com/api',
        transformResponse: angular.noop
      }

      // Configure the service.
      resourceService.setConfig(options);
    });

    it('should return promise success.', function () {
      // Get Data from the server.
      resourceService.get().then(success);

      // Mock API Response.
      $httpBackend.whenGET(options.url).respond(200);
      $httpBackend.flush();
      expect(success).toHaveBeenCalled();
    });

    it('should get from server data equals "some-data"', function () {

      // Mock response data from the server.
      spyOn(resourceService, 'get').and.callFake(function() {
        var deferred = $q.defer();
        deferred.resolve({data: 'some-data'});
        return deferred.promise;
      });

      // Get Data from the server.
      getData = resourceService.get();

      // Mock API Response.
      $httpBackend.whenGET(options.url).respond('{data: "some-data"}');

      // Check implementation from the server
      getData.then(function(response) {
        expect(response.data).toEqual('some-data');
      });

    });

  });



});

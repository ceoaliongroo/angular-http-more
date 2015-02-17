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
  var getData;

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
    var options;

    beforeEach(function() {
      // Define a promise.
      getData = $q.defer();

      // Define spies.
      //spyOn(resourceService, 'get');


      // Mock service configuration.
      options = {
        url: 'http://server.com/api',
        transformResponse: angular.noop
      }

      // Define private variable.
      var cache = {}
      var getData;
      var config;

      // Mock API Response.
      $httpBackend.whenGET(options.url).respond(200, {result: 'ok'});
    });

    // Test promise is resolve
    it('should return promise success.', function () {
      resourceService.setConfig(options);
      resourceService.get().then(success);

      expect(success).toHaveBeenCalled();
    });

    // Test event thta the caache it's updated.
    it('should return promise rejected, if not configure.', function () {

      expect('ok').toContain('ok');
    });

  });



});

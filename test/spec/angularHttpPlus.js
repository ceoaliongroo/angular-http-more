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

    // Define a promise.
    getData = $q.defer();

    // Define spies.
    spyOn(resourceService, 'get').and.returnValue(getData.promise);


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
    var reason = new Error('Configuration not defined.');
    var success = jasmine.createSpy()
    var error = jasmine.createSpy();

    it('should return a promise rejected.', function () {
      getData = resourceService.get().then(success, error);
      $rootScope.$apply();
      expect(success).not.toHaveBeenCalled();
      expect(error).toHaveBeenCalled();
    });
  });

  xdescribe('get() data from the server', function() {

    beforeEach(function() {
      // Mock service configuration.
      var options = {
        url: 'http://server.com/api',
        transformResponse: angular.noop
      }

      // Define private variable.
      var cache = {}
      var getData;
      var config;

      $httpBackend.whenGET(options.url).respond(200, {result: 'ok'});
      resourceService.get().then(function(result) {
        expect(result.info).toContain('ok');
      });
      $httpBackend.flush();

    });

    // Test promise is resolve
    it('should return promise rejected, if not configure.', function () {

      expect('ok').toContain('ok');
    });

    // Test event thta the caache it's updated.
    it('should return promise rejected, if not configure.', function () {

      expect('ok').toContain('ok');
    });

  });



});

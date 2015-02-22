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

  xdescribe('service', function() {
    it('should be defined', function () {
      expect(!!restfulService).toBe(true);
    });

    it('should be extendable to other services', function () {
      expect(!!resourceService.setConfig).toBeDefined(true);
    });
  });

  xdescribe('get() without configuration', function() {

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

      // Mock response data from the server.
      spyOn(get, 'getDataFromBackend').andCallFake(function() {
        var deferred = $q.defer();
        deferred.resolve({data: '1'});
        return deferred.promise;
      });

      // Configure the service.
      resourceService.setConfig(options);

      // Get Data from the server.
      getData = resourceService.get().then(success);
    });

    xit('should return promise success.', function () {
      // Mock API Response.
      $httpBackend.whenGET(options.url).respond(200);
      $httpBackend.flush();
      expect(success).toHaveBeenCalled();
    });

    it('should get from server data = 1', function () {
      // Mock API Response.
      $httpBackend.whenGET(options.url).respond('{data: "1"}');
      $httpBackend.flush();

      getData.then(function(response) {
        console.log(response);
      });

    });

  });



});

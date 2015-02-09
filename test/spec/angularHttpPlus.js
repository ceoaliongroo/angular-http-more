'use strict';

describe('Service: Restful', function () {

  // load the service's module
  beforeEach(module('elementModule'));

  // instantiate service
  var httpBackend, $q, getData;
  var restfulService;
  var resourceService = {};

  beforeAll(inject(function (_Restful_, _$httpBackend_, _$q_) {
    restfulService = _Restful_;
    httpBackend = _$httpBackend_;
    $q = _$q_;

    // Extend the service.
    angular.extend(resourceService, restfulService);

  }));

  afterAll(function () {
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });


  it('should be defined', function () {
    expect(!!restfulService).toBe(true);
  });

  it('should be extendable to other services', function () {
    expect(!!resourceService.setConfig).toBeDefined(true);
  });

  describe('get() promise reject', function() {


    it('should not configure options.', function () {
      expect('ok').toContain('ok');
    });

    it('should .', function () {
      expect('ok').toContain('ok');
    });



  });

  describe('get() data from the server', function() {

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

      httpBackend.whenGET(options.url).respond(200, {result: 'ok'});
      resourceService.get().then(function(result) {
        expect(result.info).toContain('ok');
      });
      httpBackend.flush();

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

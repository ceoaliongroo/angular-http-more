'use strict';

describe('Service: Restful', function () {

  // load the service's module
  beforeEach(module('elementModule'));

  // instantiate service
  var httpBackend, $q, getData;
  var restfulService;
  var resourceService = {};
  // mock options, configuration fo server request.
  var options;

  beforeEach(inject(function (_Restful_, _$httpBackend_, _$q_) {
    httpBackend = _$httpBackend_;
    restfulService = _Restful_;
    $q = _$q_;
    // Extend the service.
    angular.extend(resourceService, restfulService);

    options = {
      url: 'http://server.com/api',
      transformResponse: angular.noop
    }

    //
    getData = $q.defer().promise;

  }));

  afterEach(function () {
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });

  it('should be defined', function () {
    expect(!!restfulService).toBe(true);
  });

  it('should be extendable to other services', function () {
    expect(!!resourceService.setConfig).toBeDefined(true);
  });

  // Configuration of the service.
  it('should to set options', function () {
    // Set configuration.
    resourceService.setConfig(options);

    // Set spy.
    //spyOn(getData, 'finalize').andReturn(undefined);

    httpBackend.whenGET(options.url).respond(200, {result: 'ok'});
    resourceService.get().then(function(result) {
      expect(result.info).toContain('ok');
    });
    httpBackend.flush();
  });

});

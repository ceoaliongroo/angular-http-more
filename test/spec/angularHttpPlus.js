'use strict';

describe('Service: Restful', function () {

  // load the service's module
  beforeEach(module('elementModule'));

  // instantiate service
  var httpBackend;
  var restfulService;
  var resourceService = {};
  // mock options, configuration fo server request.
  var options;

  beforeEach(inject(function (_Restful_, _$httpBackend_) {
    httpBackend = _$httpBackend_;
    restfulService = _Restful_;
    // Extend the service.
    angular.extend(resourceService, restfulService);

    options = {
      url: 'http://server.com/api',
      transformResponse: angular.noop
    }

    httpBackend.whenGET(options.url).respond(200, {result: 'ok'});

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
    resourceService.setConfig(options);

    httpBackend.expectGET(options.url);
    resourceService.get();

    expect(result.info).toContain('ok');
  });

});

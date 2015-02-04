'use strict';

describe('Service: Restful', function () {

  // load the service's module
  beforeEach(module('elementModule'));

  // instantiate service
  var restfulService;
  var resourceService = {};
  // mock options, configuration fo server request.
  var options;

  beforeEach(inject(function (_Restful_) {
    restfulService = _Restful_;
    // Extend the service.
    extend(resourceService, restfulService);

    options = {
      url: 'http://server.com/api',
      transformResponse: angular.noop
    }

  }));

  it('should be defined', function () {
    expect(!!restfulService).toBe(true);
  });

  it('should be extendable to other services', function () {
    expect(!!resourceService.setConfig).toBeDefined(true);
  });

  // Configuration of the service.
  it('should to set options', function (resourceService) {
    resourceService.setOptions(options);
    expect(resourceService.get()).toContain('http://server.com/api');
  });

});

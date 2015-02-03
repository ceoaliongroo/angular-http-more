'use strict';

describe('Service: angularHttpPlus', function () {

  // load the service's module
  beforeEach(module('elementModule'));

  // instantiate service
  var testService;
  // mock options, configuration fo server request.
  var options;

  beforeEach(inject(function (_Restful_) {
    testService = _Restful_;

    options = {
      url: 'http://server.com/api',
      transformResponse: angular.noop
    }


  }));

  it('should to be define Restful', function () {
    expect(!!testService).toBe(true);
  });

  // Configuration of the service.
  it('should to configured the service to return data from the server.', function () {
    testService.get(options);
    expect(testService.options.url).toContain('http://server.com/api');
  });

});

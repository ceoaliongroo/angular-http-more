'use strict';

describe('Service: angularHttpPlus', function () {

  // load the service's module
  beforeEach(module('elementModule'));

  // instantiate service
  var testService;
  beforeEach(inject(function (_Restful_) {
    testService = _Restful_;
  }));

  it('should do something', function () {
    expect(!!testService).toBe(true);
  });

});

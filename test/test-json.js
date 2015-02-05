var jsonBourne = require('../json');
var sinon = require('sinon');

describe('JSON', function () {
  describe('parse', function () {
    var returned;
    beforeEach(function () {
      sinon.spy(JSON, 'parse');
      returned = jsonBourne.parse('{ "x": 1, "y":2 }', 'arg2');
    });
    afterEach(function () {
      JSON.parse.restore();
    });
    it('should call the native parse method', function () {
      expect(JSON.parse.callCount).to.be(1);
    });
    it('should proxy the native parse method arguments', function () {
      expect(JSON.parse.firstCall.args).to.eql(['{ "x": 1, "y":2 }', 'arg2']);
    });
    it('should parse stringified JSON', function () {
      expect(returned).to.eql({ x: 1, y :2 });
    });
    it('should parse stringified date in standard format', function () {
      expect(jsonBourne.parse('{"d":\"1989-01-17T00:00:00.00Z\"}').d).to.be('1989-01-17T00:00:00.00Z');
    });
  });
  describe('stringify', function () {
    var input, output;
    beforeEach(function () {
      sinon.spy(JSON, 'stringify');
      input = { bourne: 'supremacy', n: 1 };
      output = jsonBourne.stringify(input, null, 2);
    });
    afterEach(function () {
      JSON.stringify.restore();
    });
    it('should call the native stringify method', function () {
      expect(JSON.stringify.callCount).to.be(1);
    });
    it('should proxy the native stringify method arguments', function () {
      expect(JSON.stringify.firstCall.args).to.eql([input, null, 2]);
    });
    it('should stringify the input', function () {
      expect(output).to.be('{\n  "bourne": "supremacy",\n  "n": 1\n}');
    });
    it('should not use custom Array.prototype.toJSON', function () {
      Array.prototype.toJSON = sinon.stub().returns('an array');
      expect(jsonBourne.stringify([1, 2, 3])).to.eql('[1,2,3]');
      delete Array.prototype.toJSON;
    });
    it('should use the standard ISO date format', function () {
      expect(jsonBourne.stringify(new Date('Jan 17 1989 GMT+0000'))).to.be('\"1989-01-17T00:00:00.00Z\"');
    });
    it('should not remove custom Array.prototype.toJSON', function () {
      var toJSON = sinon.stub();
      Array.prototype.toJSON = toJSON;
      jsonBourne.stringify({ x: 2 });
      expect(toJSON.callCount).to.be(0);
      expect(Array.prototype.toJSON).to.be(toJSON);
      delete Array.prototype.toJSON;
    });
    it('should not remove custom Date.prototype.toJSON', function () {
      var toJSON = sinon.stub();
      Date.prototype.toJSON = toJSON;
      expect(jsonBourne.stringify({ d: new Date('Jan 17 1989 GMT+0000') }))
        .to.be('{"d":\"1989-01-17T00:00:00.00Z\"}');
      expect(toJSON.callCount).to.be(0);
      expect(Date.prototype.toJSON).to.be(toJSON);
      delete Date.prototype.toJSON;
    });
    it('should not replace native Date.prototype.toJSON', function () {
      jsonBourne.stringify({ x: 2 });
      expect(Date.prototype.toJSON).to.be(undefined);
    });
  });
});
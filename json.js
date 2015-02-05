var jsonBourne = {
  stringify: function stringify() {
    var prototypes = normalizePrototypes();
    var result = JSON.stringify.apply(JSON, arguments);
    prototypes.restore();
    return result;
  },
  parse: function parse() {
    return JSON.parse.apply(JSON, arguments);
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = jsonBourne;
} else if (typeof define === 'function' && define.amd) {
  define(function () {
    return jsonBourne;
  });
} else {
  window.jsonBourne = jsonBourne;
}


function normalizePrototypes() {
  var arrayToJSON = Array.prototype.toJSON;
  var dateToJSON = Date.prototype.toJSON;
  delete Array.prototype.toJSON;
  Date.prototype.toJSON = function () {
    return toIsoDate(this);
  };
  return {
    restore: function restore() {
      if (arrayToJSON !== undefined) {
        Array.prototype.toJSON = arrayToJSON;
      }
      if (dateToJSON !== undefined) {
        Date.prototype.toJSON = dateToJSON;
      } else {
        delete Date.prototype.toJSON;
      }
    }
  };
}

function toIsoDate(date) {
  return isFinite(date.valueOf()) ?
    date.getUTCFullYear()             + '-' +
    pad(date.getUTCMonth() + 1, 2)    + '-' +
    pad(date.getUTCDate(), 2)         + 'T' +
    pad(date.getUTCHours(), 2)        + ':' +
    pad(date.getUTCMinutes(), 2)      + ':' +
    pad(date.getUTCSeconds(), 2)      + '.' +
    pad(date.getUTCMilliseconds(), 3) + 'Z' : null;
}

function pad(number) {
  var r = String(number);
  if (r.length === 1) {
    r = '0' + r;
  }
  return r;
}
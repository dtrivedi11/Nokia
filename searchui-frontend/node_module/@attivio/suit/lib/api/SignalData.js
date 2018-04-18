'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Signal data needed for doing click tracking, etc., with a document.
 */
var SignalData = function () {
  function SignalData() {
    _classCallCheck(this, SignalData);
  }

  SignalData.fromJson = function fromJson(json) {
    var result = new SignalData();

    result.docId = json.docId;
    result.docOrdinal = json.docOrdinal;
    result.featureVector = json.featureVector;
    result.locale = json.locale;
    result.principal = json.principal;
    result.query = json.query;
    result.queryTimestamp = json.queryTimestamp;
    result.relevancyModelName = json.relevancyModelName;
    result.relevancyModelNames = json.relevancyModelNames;
    result.relevancyModelVersion = json.relevancyModelVersion;
    result.signalTimestamp = json.signalTimestamp;
    result.ttl = json.ttl;
    result.type = json.type;
    result.weight = json.weight;

    return result;
  };

  SignalData.prototype.updateForTracking = function updateForTracking() {
    var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'click';
    var weight = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

    this.type = type;
    this.weight = weight;
  };

  return SignalData;
}();

exports.default = SignalData;
module.exports = exports['default'];
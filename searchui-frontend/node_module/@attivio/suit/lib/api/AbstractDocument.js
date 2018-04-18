'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * The basis for ingest and search doocuments.
 */
var AbstractDocument = function () {
  function AbstractDocument(fields) {
    _classCallCheck(this, AbstractDocument);

    this.fields = fields;
  }

  /**
   * A map of the document's field names to a list of their values
   * (the values are in an arry even if there is only one).
   */


  AbstractDocument.prototype.getFirstValue = function getFirstValue(fieldName) {
    var result = '';
    if (this.fields) {
      var values = this.fields.get(fieldName);
      if (values && values.length > 0) {
        result = values[0].toString();
      }
    }
    return result;
  };

  AbstractDocument.prototype.getAllValues = function getAllValues(fieldName) {
    var result = [];
    if (this.fields) {
      var values = this.fields.get(fieldName);
      if (values && values.length > 0) {
        result = values;
      }
    }
    return result;
  };

  return AbstractDocument;
}();

exports.default = AbstractDocument;
module.exports = exports['default'];
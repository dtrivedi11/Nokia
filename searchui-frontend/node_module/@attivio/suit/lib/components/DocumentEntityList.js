'use strict';

exports.__esModule = true;
exports.default = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _SearchDocument = require('../api/SearchDocument');

var _SearchDocument2 = _interopRequireDefault(_SearchDocument);

var _FieldNames = require('../api/FieldNames');

var _FieldNames2 = _interopRequireDefault(_FieldNames);

var _DataPairs = require('./DataPairs');

var _DataPairs2 = _interopRequireDefault(_DataPairs);

var _DateUtils = require('../util/DateUtils');

var _DateUtils2 = _interopRequireDefault(_DateUtils);

var _DateFormat = require('../util/DateFormat');

var _DateFormat2 = _interopRequireDefault(_DateFormat);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // @Flow


var DocumentEntityList = function (_React$Component) {
  _inherits(DocumentEntityList, _React$Component);

  function DocumentEntityList() {
    _classCallCheck(this, DocumentEntityList);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  DocumentEntityList.prototype.getEntityValues = function getEntityValues(doc) {
    var result = [];
    this.props.entityFields.forEach(function (fieldLabel, fieldName) {
      var values = doc.getAllValues(fieldName);
      if (values && values.length > 0) {
        var valueString = values.join(', ');
        var dataPair = new _DataPairs.DataPairInfo(fieldLabel, valueString, fieldName);
        result.push(dataPair);
      }
    });
    return result;
  };

  DocumentEntityList.prototype.render = function render() {
    var dataPairs = this.getEntityValues(this.props.doc);
    var date = this.props.doc.getFirstValue(_FieldNames2.default.DATE);
    if (date) {
      // If date is already there, then remove it before adding it on our own.
      dataPairs = dataPairs.filter(function (dataPair) {
        return dataPair.type !== _FieldNames2.default.DATE;
      });
      var dateString = _DateUtils2.default.formatDateString(date, _DateFormat2.default.LONG_DATE);
      // We always want the date to come first
      dataPairs.unshift(new _DataPairs.DataPairInfo('Date', dateString));
    }
    return _react2.default.createElement(_DataPairs2.default, { pairs: dataPairs });
  };

  return DocumentEntityList;
}(_react2.default.Component);

exports.default = DocumentEntityList;
module.exports = exports['default'];
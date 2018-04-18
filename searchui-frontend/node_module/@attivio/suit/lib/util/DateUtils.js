'use strict';

exports.__esModule = true;
exports.default = undefined;

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _DateFormat = require('./DateFormat');

var _DateFormat2 = _interopRequireDefault(_DateFormat);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DateUtils = function () {
  function DateUtils() {
    _classCallCheck(this, DateUtils);
  }

  /**
   * Given a JavaScript Date object, return a formatted date in the specified
   * locale using the format specified.
   */
  DateUtils.formatDate = function formatDate(date, format) {
    var locale = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'en';

    var m = (0, _moment2.default)(date).locale(locale);
    switch (format) {
      case _DateFormat2.default.ATTIVIO:
        return m.format();
      case _DateFormat2.default.SHORT_DATE:
        return m.format('L');
      case _DateFormat2.default.MEDIUM_DATE:
        return m.format('ll');
      case _DateFormat2.default.LONG_DATE:
        return m.format('dddd, LL');
      case _DateFormat2.default.SHORT_TIME:
        return m.format('LT');
      case _DateFormat2.default.LONG_TIME:
        return m.format('LTS');
      case _DateFormat2.default.SHORT_MONTH:
        return m.format('MMM. YYYY');
      case _DateFormat2.default.LONG_MONTH:
        return m.format('MMMM YYYY');
      case _DateFormat2.default.SHORT_YEAR:
        return m.format('\u2019YY');
      case _DateFormat2.default.LONG_YEAR:
        return m.format('YYYY');
      case _DateFormat2.default.SHORT:
        return m.format('L LT');
      case _DateFormat2.default.MEDIUM:
        return m.format('lll');
      case _DateFormat2.default.LONG:
        return m.format('LLLL');
      case _DateFormat2.default.AGO:
        return m.fromNow();
      case _DateFormat2.default.IN:
        return m.toNow();
      case _DateFormat2.default.ISO_8601:
      default:
        return m.format();
    }
  };

  /**
   * Given a string, return a Date object created by parsing it.
   */


  DateUtils.stringToDate = function stringToDate(dateString) {
    return (0, _moment2.default)(dateString).toDate();
  };

  /**
   * Given a string, return a formatted date in the specified locale using
   * the format specified.
   */


  DateUtils.formatDateString = function formatDateString(dateString, format) {
    var locale = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'en';

    if (dateString) {
      var date = DateUtils.stringToDate(dateString);
      return DateUtils.formatDate(date, format, locale);
    }
    return '';
  };

  return DateUtils;
}();

exports.default = DateUtils;
module.exports = exports['default'];
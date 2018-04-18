function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

import moment from 'moment';

import DateFormat from './DateFormat';

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

    var m = moment(date).locale(locale);
    switch (format) {
      case DateFormat.ATTIVIO:
        return m.format();
      case DateFormat.SHORT_DATE:
        return m.format('L');
      case DateFormat.MEDIUM_DATE:
        return m.format('ll');
      case DateFormat.LONG_DATE:
        return m.format('dddd, LL');
      case DateFormat.SHORT_TIME:
        return m.format('LT');
      case DateFormat.LONG_TIME:
        return m.format('LTS');
      case DateFormat.SHORT_MONTH:
        return m.format('MMM. YYYY');
      case DateFormat.LONG_MONTH:
        return m.format('MMMM YYYY');
      case DateFormat.SHORT_YEAR:
        return m.format('\u2019YY');
      case DateFormat.LONG_YEAR:
        return m.format('YYYY');
      case DateFormat.SHORT:
        return m.format('L LT');
      case DateFormat.MEDIUM:
        return m.format('lll');
      case DateFormat.LONG:
        return m.format('LLLL');
      case DateFormat.AGO:
        return m.fromNow();
      case DateFormat.IN:
        return m.toNow();
      case DateFormat.ISO_8601:
      default:
        return m.format();
    }
  };

  /**
   * Given a string, return a Date object created by parsing it.
   */


  DateUtils.stringToDate = function stringToDate(dateString) {
    return moment(dateString).toDate();
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

export { DateUtils as default };
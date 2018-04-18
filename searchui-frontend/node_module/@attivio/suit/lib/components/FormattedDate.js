'use strict';

exports.__esModule = true;
exports.default = undefined;

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _DateUtils = require('../util/DateUtils');

var _DateUtils2 = _interopRequireDefault(_DateUtils);

var _DateFormat = require('../util/DateFormat');

var _DateFormat2 = _interopRequireDefault(_DateFormat);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Display a formatted Date object.
 */
var FormattedDate = (_temp = _class = function (_React$Component) {
  _inherits(FormattedDate, _React$Component);

  function FormattedDate() {
    _classCallCheck(this, FormattedDate);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  FormattedDate.prototype.render = function render() {
    return _react2.default.createElement(
      'span',
      null,
      _DateUtils2.default.formatDate(this.props.date, this.props.format, this.props.locale)
    );
  };

  return FormattedDate;
}(_react2.default.Component), _class.defaultProps = {
  format: _DateFormat2.default.SHORT_DATE,
  locale: 'en'
}, _temp);
exports.default = FormattedDate;


FormattedDate.DateFormat = _DateFormat2.default;
module.exports = exports['default'];
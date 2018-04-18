'use strict';

exports.__esModule = true;
exports.default = undefined;

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Component to let the user choose either a single
 * date or a starting/ending range.
 */
var DatePicker = (_temp = _class = function (_React$Component) {
  _inherits(DatePicker, _React$Component);

  function DatePicker(props) {
    _classCallCheck(this, DatePicker);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.pickDate = _this.pickDate.bind(_this);
    return _this;
  }

  DatePicker.prototype.pickDate = function pickDate() {
    this.props.updateDate(new Date(), new Date());
  };

  DatePicker.prototype.render = function render() {
    var label = this.props.range ? 'Range date picker' : 'Single date picker';
    var startingDate = this.props.startingDate ? this.props.startingDate.toDateString() : 'none';
    var endingDate = this.props.endingDate ? this.props.endingDate.toDateString() : 'none';

    if (this.props.startingDate && this.props.endingDate) {
      label = label + ' from ' + startingDate + ' to ' + endingDate;
    } else if (this.props.startingDate) {
      label = label + ' from ' + startingDate;
    } else if (this.props.endingDate) {
      label = label + ' from ' + endingDate;
    }
    return _react2.default.createElement(
      'div',
      null,
      label
    );
  };

  return DatePicker;
}(_react2.default.Component), _class.defaultProps = {
  startingDate: null,
  endingDate: null,
  range: false
}, _temp);
exports.default = DatePicker;
module.exports = exports['default'];
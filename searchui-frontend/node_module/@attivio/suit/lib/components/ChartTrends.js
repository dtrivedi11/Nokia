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
 * Show a change in a value. If the neither the up or down
 * properties are set, then it is displayed as an average
 * value, with no up/down arrows.
 */
var ChartTrends = (_temp = _class = function (_React$Component) {
  _inherits(ChartTrends, _React$Component);

  function ChartTrends() {
    _classCallCheck(this, ChartTrends);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  ChartTrends.prototype.render = function render() {
    var classNames = 'attivio-trend';
    var label = this.props.unchangedLabel;
    var icon = '';

    if (this.props.up) {
      classNames = 'attivio-trend attivio-trend-up';
      icon = _react2.default.createElement('span', { className: 'attivio-icon-trend-up' });
      label = this.props.changedLabel;
    } else if (this.props.down) {
      classNames = 'attivio-trend attivio-trend-down';
      icon = _react2.default.createElement('span', { className: 'attivio-icon-trend-down' });
      label = this.props.changedLabel;
    }

    return _react2.default.createElement(
      'h3',
      { className: classNames },
      icon,
      this.props.change,
      ' ',
      _react2.default.createElement(
        'span',
        { className: 'attivio-trend-label' },
        label
      )
    );
  };

  return ChartTrends;
}(_react2.default.Component), _class.defaultProps = {
  up: false,
  down: false,
  changedLabel: 'Change',
  unchangedLabel: 'Average'
}, _temp);
exports.default = ChartTrends;
module.exports = exports['default'];
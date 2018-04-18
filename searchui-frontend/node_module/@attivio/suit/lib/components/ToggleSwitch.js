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
 * This is a simple “sliding” toggle switch with customizable labels.
 */
var ToggleSwitch = (_temp = _class = function (_React$Component) {
  _inherits(ToggleSwitch, _React$Component);

  function ToggleSwitch() {
    _classCallCheck(this, ToggleSwitch);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  ToggleSwitch.prototype.render = function render() {
    var _this2 = this;

    var disabledClass = this.props.disabled ? 'disabled' : '';
    var containerClass = 'toggle-switch-container ' + disabledClass;
    var onClass = 'toggle-switch toggle-switch-on ' + (this.props.on ? 'selected' : '') + ' ' + disabledClass;
    var offClass = 'toggle-switch toggle-switch-off ' + (this.props.on ? '' : 'selected') + ' ' + disabledClass;

    if (!this.props.disabled) {
      return _react2.default.createElement(
        'div',
        { className: containerClass },
        _react2.default.createElement(
          'div',
          {
            className: offClass,
            onClick: function onClick() {
              if (_this2.props.on && !_this2.props.disabled) {
                // On now, turn it off
                _this2.props.onChange(false);
              }
              if (_this2.offButton) {
                _this2.offButton.blur();
              }
            },
            role: 'button',
            tabIndex: 0,
            ref: function ref(c) {
              _this2.offButton = c;
            }
          },
          this.props.offLabel
        ),
        _react2.default.createElement(
          'div',
          {
            className: onClass,
            onClick: function onClick() {
              if (!_this2.props.on && !_this2.props.disabled) {
                // Off now, turn it on
                _this2.props.onChange(true);
              }
              if (_this2.onButton) {
                _this2.onButton.blur();
              }
            },
            role: 'button',
            tabIndex: 0,
            ref: function ref(c) {
              _this2.onButton = c;
            }
          },
          this.props.onLabel
        )
      );
    }
    return _react2.default.createElement(
      'div',
      { className: containerClass },
      _react2.default.createElement(
        'div',
        {
          className: offClass
        },
        this.props.offLabel
      ),
      _react2.default.createElement(
        'div',
        {
          className: onClass
        },
        this.props.onLabel
      )
    );
  };

  return ToggleSwitch;
}(_react2.default.Component), _class.defaultProps = {
  onLabel: 'On',
  offLabel: 'Off',
  disabled: false
}, _temp);
exports.default = ToggleSwitch;
module.exports = exports['default'];
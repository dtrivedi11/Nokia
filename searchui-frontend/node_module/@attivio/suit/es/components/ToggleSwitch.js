var _class, _temp;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';

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
      return React.createElement(
        'div',
        { className: containerClass },
        React.createElement(
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
        React.createElement(
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
    return React.createElement(
      'div',
      { className: containerClass },
      React.createElement(
        'div',
        {
          className: offClass
        },
        this.props.offLabel
      ),
      React.createElement(
        'div',
        {
          className: onClass
        },
        this.props.onLabel
      )
    );
  };

  return ToggleSwitch;
}(React.Component), _class.defaultProps = {
  onLabel: 'On',
  offLabel: 'Off',
  disabled: false
}, _temp);
export { ToggleSwitch as default };
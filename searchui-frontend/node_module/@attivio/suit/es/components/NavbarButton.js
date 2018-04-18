var _class, _temp;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';

import Button from 'react-bootstrap/lib/Button';

/**
 * A button to live in the navbar. Can have either an icon or a text label or both.
 * (It needs to at least have one or the other, though.) Clicking the butotn calls
 * the onClick handler.
 */
var NavbarButton = (_temp = _class = function (_React$Component) {
  _inherits(NavbarButton, _React$Component);

  function NavbarButton(props) {
    _classCallCheck(this, NavbarButton);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.onClick = _this.onClick.bind(_this);
    return _this;
  }

  NavbarButton.prototype.onClick = function onClick() {
    this.props.onClick();
  };

  NavbarButton.prototype.render = function render() {
    return React.createElement(
      Button,
      null,
      this.props.label,
      ' ',
      this.props.icon
    );
  };

  return NavbarButton;
}(React.Component), _class.defaultProps = {
  label: '',
  icon: ''
}, _temp);
export { NavbarButton as default };
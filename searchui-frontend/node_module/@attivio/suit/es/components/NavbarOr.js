var _class, _temp;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';

/**
 * A component to use in a navbar to interject a choice between two others.
 */
var NavbarOr = (_temp = _class = function (_React$Component) {
  _inherits(NavbarOr, _React$Component);

  function NavbarOr() {
    _classCallCheck(this, NavbarOr);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  NavbarOr.prototype.render = function render() {
    return React.createElement(
      'li',
      null,
      React.createElement(
        'span',
        { className: 'attivio-or' },
        this.props.message
      )
    );
  };

  return NavbarOr;
}(React.Component), _class.defaultProps = {
  message: 'OR'
}, _temp);
export { NavbarOr as default };
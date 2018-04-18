function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Children } from 'react';

/**
 * A row of subordinate navigation and/or controls under the masthead.
 */
var SecondaryNavBar = function (_React$Component) {
  _inherits(SecondaryNavBar, _React$Component);

  function SecondaryNavBar() {
    _classCallCheck(this, SecondaryNavBar);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  SecondaryNavBar.prototype.render = function render() {
    return React.createElement(
      "div",
      { className: "attivio-globalmastnavbar attivio-minwidth" },
      this.props.children
    );
  };

  return SecondaryNavBar;
}(React.Component);

export { SecondaryNavBar as default };
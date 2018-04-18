function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';

/**
 * Show the supplied label in a format for use as the header on a 360° page.
 */
var Header360 = function (_React$Component) {
  _inherits(Header360, _React$Component);

  function Header360() {
    _classCallCheck(this, Header360);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  Header360.prototype.render = function render() {
    return React.createElement(
      "h1",
      { className: "attivio-360-hed" },
      this.props.label
    );
  };

  return Header360;
}(React.Component);

export { Header360 as default };
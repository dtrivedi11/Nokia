function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Children } from 'react';

/**
 * Component to show source code in a traditional, monospaced font etc.
 */
var Code = function (_React$Component) {
  _inherits(Code, _React$Component);

  function Code() {
    _classCallCheck(this, Code);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  Code.prototype.render = function render() {
    return React.createElement(
      "code",
      { className: "attivio-code", style: { paddingTop: 0, paddingBottom: 0 } },
      React.createElement(
        "pre",
        null,
        this.props.children
      )
    );
  };

  return Code;
}(React.Component);

export { Code as default };
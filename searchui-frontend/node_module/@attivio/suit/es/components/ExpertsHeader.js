function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';

/**
 * Header for the Experts page.
 */

var ExpertsHeader = function (_React$Component) {
  _inherits(ExpertsHeader, _React$Component);

  function ExpertsHeader() {
    _classCallCheck(this, ExpertsHeader);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  ExpertsHeader.prototype.render = function render() {
    return React.createElement(
      "div",
      { className: "attivio-expert-hed" },
      React.createElement(
        "h2",
        { className: "attivio-expert-hed-title pull-left" },
        "Top Experts:"
      ),
      React.createElement(
        "a",
        { className: "attivio-expert-hed-link pull-right" },
        React.createElement(
          "strong",
          null,
          "All Experts\u2026"
        )
      )
    );
  };

  return ExpertsHeader;
}(React.Component);

export { ExpertsHeader as default };
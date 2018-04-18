"use strict";

exports.__esModule = true;
exports.default = undefined;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Displays a message about the results of your search.
 * It could be an error, a count of the documents found, etc.
 */
var NavbarResults = function (_React$Component) {
  _inherits(NavbarResults, _React$Component);

  function NavbarResults() {
    _classCallCheck(this, NavbarResults);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  NavbarResults.prototype.render = function render() {
    return _react2.default.createElement(
      "div",
      { className: "attivio-globalmastnavbar-results" },
      this.props.message
    );
  };

  return NavbarResults;
}(_react2.default.Component);

exports.default = NavbarResults;
module.exports = exports["default"];
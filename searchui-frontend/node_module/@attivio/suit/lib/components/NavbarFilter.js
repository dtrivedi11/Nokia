"use strict";

exports.__esModule = true;
exports.default = undefined;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/** Displays a currently applied facet filter. */
var NavbarFilter = function (_React$Component) {
  _inherits(NavbarFilter, _React$Component);

  function NavbarFilter(props) {
    _classCallCheck(this, NavbarFilter);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.remove = _this.remove.bind(_this);
    return _this;
  }

  NavbarFilter.prototype.remove = function remove(event) {
    this.props.removeCallback();
    event.target.blur();
  };

  NavbarFilter.prototype.render = function render() {
    return _react2.default.createElement(
      "div",
      { className: "attivio-globalmastnavbar-filter" },
      this.props.facetName,
      ": \xA0",
      _react2.default.createElement(
        "a",
        {
          className: "attivio-globalmastnavbar-filter-link attivio-icon-remove",
          onClick: this.remove,
          role: "button",
          tabIndex: 0
        },
        this.props.bucketLabel
      )
    );
  };

  return NavbarFilter;
}(_react2.default.Component);

exports.default = NavbarFilter;
module.exports = exports["default"];
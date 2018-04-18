'use strict';

exports.__esModule = true;

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = require('react-router-dom');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Button = require('react-bootstrap/lib/Button');

var _Button2 = _interopRequireDefault(_Button);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Wrapper for a React-Boostrap Button that will navigate to a route
 * using the react router. You can pass a className, bsStyle, and arbitrary
 * style object to change the look of your button, similarly to the standard
 * one. Use the route property to specify where the router should take the
 * user when clicked.
 */
var NavigationButton = (_temp = _class = function (_React$Component) {
  _inherits(NavigationButton, _React$Component);

  function NavigationButton(props) {
    _classCallCheck(this, NavigationButton);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.doClick = _this.doClick.bind(_this);
    return _this;
  }

  NavigationButton.prototype.doClick = function doClick() {
    if (this.props.route) {
      this.props.history.push({ pathname: this.props.route, search: this.props.location.search });
    }
  };

  NavigationButton.prototype.render = function render() {
    return _react2.default.createElement(
      _Button2.default,
      { onClick: this.doClick, className: this.props.className, style: this.props.style, bsStyle: this.props.bsStyle },
      this.props.children
    );
  };

  return NavigationButton;
}(_react2.default.Component), _class.defaultProps = {
  className: '',
  bsStyle: 'default',
  style: {},
  children: null
}, _temp);
exports.default = (0, _reactRouterDom.withRouter)(NavigationButton);
module.exports = exports['default'];
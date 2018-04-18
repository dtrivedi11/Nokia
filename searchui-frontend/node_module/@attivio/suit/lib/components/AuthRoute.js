'use strict';

exports.__esModule = true;

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRouterDom = require('react-router-dom');

var _Configurable = require('./Configurable');

var _Configurable2 = _interopRequireDefault(_Configurable);

var _AuthUtils = require('../util/AuthUtils');

var _AuthUtils2 = _interopRequireDefault(_AuthUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// LJV TODO Create a no-permissions page to use for unauthorized users
var AuthRoute = (_temp = _class = function (_React$Component) {
  _inherits(AuthRoute, _React$Component);

  function AuthRoute(props) {
    _classCallCheck(this, AuthRoute);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.state = {
      user: null
    };
    return _this;
  }

  AuthRoute.prototype.componentDidMount = function componentDidMount() {
    var _this2 = this;

    _AuthUtils2.default.getLoggedInUserInfo(function (userInfo) {
      _this2.setState({
        user: userInfo
      });
    });
  };

  AuthRoute.prototype.render = function render() {
    // If the user is logged in and has permission for this
    // route, then just render the route.
    if (_AuthUtils2.default.isLoggedIn(this.props.required)) {
      return _react2.default.createElement(_reactRouterDom.Route, this.props);
    }

    // For local authentication, then just redirect to the login page.
    if (this.props.authType === 'XML') {
      return _react2.default.createElement(_reactRouterDom.Redirect, {
        to: {
          pathname: '/login',
          state: {
            referrer: this.props.location
          }
        }
      });
    }
    return null;
  };

  return AuthRoute;
}(_react2.default.Component), _class.defaultProps = {
  required: null,
  location: null, // This should be filled in by the router
  authType: 'NONE'
}, _temp);
exports.default = (0, _Configurable2.default)(AuthRoute);
module.exports = exports['default'];
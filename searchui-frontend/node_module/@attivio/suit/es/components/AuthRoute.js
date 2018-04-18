var _class, _temp;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

import Configurable from './Configurable';
import AuthUtils from '../util/AuthUtils';

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

    AuthUtils.getLoggedInUserInfo(function (userInfo) {
      _this2.setState({
        user: userInfo
      });
    });
  };

  AuthRoute.prototype.render = function render() {
    // If the user is logged in and has permission for this
    // route, then just render the route.
    if (AuthUtils.isLoggedIn(this.props.required)) {
      return React.createElement(Route, this.props);
    }

    // For local authentication, then just redirect to the login page.
    if (this.props.authType === 'XML') {
      return React.createElement(Redirect, {
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
}(React.Component), _class.defaultProps = {
  required: null,
  location: null, // This should be filled in by the router
  authType: 'NONE'
}, _temp);


export default Configurable(AuthRoute);
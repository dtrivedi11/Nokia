var _class, _temp;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';


import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import Configurable from './Configurable';
import MastheadUser from './MastheadUser';
import AuthUtils from '../util/AuthUtils';

/**
 * Display a masthead header at the top of your page. It displays a logo,
 * the name of the application, and the currently logged-in user. It can
 * contain arbitray components, but components particularly suited for
 * being in masthead have names that start with "Masthead," such as
 * MastheadNavBar and MastheadNavTabs.
 */
var Masthead = (_temp = _class = function (_React$Component) {
  _inherits(Masthead, _React$Component);

  function Masthead(props) {
    _classCallCheck(this, Masthead);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.state = {
      userInfo: null
    };
    _this.navigateHome = _this.navigateHome.bind(_this);
    _this.handleLogout = _this.handleLogout.bind(_this);
    _this.updateUser = _this.updateUser.bind(_this);
    return _this;
  }

  Masthead.prototype.componentWillMount = function componentWillMount() {
    this.updateUser();
  };

  Masthead.prototype.componentWillReceiveProps = function componentWillReceiveProps() {
    this.updateUser();
  };

  Masthead.prototype.updateUser = function updateUser() {
    var _this2 = this;

    var currentUser = AuthUtils.getLocalStorageUser();
    if (currentUser) {
      this.setState({
        userInfo: currentUser
      });
    } else {
      // If we need to, ask the server...
      AuthUtils.getLoggedInUserInfo(function (loggedInUserInfo) {
        _this2.setState({
          userInfo: loggedInUserInfo
        });
      });
    }
  };

  Masthead.prototype.handleLogout = function handleLogout() {
    var _this3 = this;

    AuthUtils.logout(function () {
      _this3.setState({
        userInfo: null
      }, function () {
        _this3.props.history.push('/loggedout');
      });
    });
  };

  Masthead.prototype.navigateHome = function navigateHome() {
    if (this.homeLink) {
      this.homeLink.blur();
    }
    this.context.searcher.reset();
    this.props.history.push({ pathname: this.props.homeRoute, search: this.props.location.search });
  };

  Masthead.prototype.render = function render() {
    var _this4 = this;

    var engineInfo = null;
    if (this.props.searchEngineType === 'solr') {
      engineInfo = React.createElement(
        'span',
        {
          style: {
            display: 'inline-block',
            float: 'right',
            fontSize: '0.6875em',
            fontWeight: 100,
            color: '#fff',
            width: '100%',
            textAlign: 'right',
            padding: 0
          }
        },
        'for Apache Solr'
      );
    } else if (this.props.searchEngineType === 'elastic') {
      engineInfo = React.createElement(
        'span',
        {
          style: {
            display: 'inline-block',
            float: 'right',
            fontSize: '0.6875em',
            fontWeight: 100,
            color: '#fff',
            width: '100%',
            textAlign: 'right',
            padding: 0
          }
        },
        'for Elasticsearch'
      );
    }
    var Search_type= 'Enterprise Search';
    return React.createElement(
      'header',
      { className: 'attivio-globalmast attivio-minwidth' },
      React.createElement(
        'div',
        { className: 'attivio-container' },
        React.createElement(
          'button',
          {
            style: { backgroundColor: 'transparent', borderWidth: 0 },
            onClick: this.navigateHome,
            className: 'attivio-globalmast-logo attivio-globalmast-separator after',
            title: 'Go to Nokia Home',

            ref: function ref(c) {
              _this4.homeLink = c;
            }
          },
          React.createElement('img', { src: this.props.logoUri, alt: this.props.logoAlt, className: 'attivio-globalmast-logo-img' }),
          engineInfo
        ),
        React.createElement(
          'div',
          { className: 'attivio-globalmast-appname attivio-globalmast-separator after ' + (this.props.multiline ? '' : 'nowrap') },
          Search_type
        ),
        this.props.children,
        React.createElement('div', { className: 'attivio-globalmast-spacer' }),
        React.createElement(MastheadUser, { username: AuthUtils.getUserName(this.state.userInfo), logoutFunction: this.handleLogout })
      )
    );
  };

  return Masthead;
}(React.Component), _class.contextTypes = {
  searcher: PropTypes.any
}, _class.defaultProps = {
  logoUri: 'img/attivio-logo-reverse.png',
  logoAlt: 'Nokia Home',
  homeRoute: '/',
  logoutFunction: function logoutFunction() {},
  applicationName: 'Enterprise Search',
  multiline: false,
  searchEngineType: 'attivio'
}, _temp);


export default withRouter(Configurable(Masthead));
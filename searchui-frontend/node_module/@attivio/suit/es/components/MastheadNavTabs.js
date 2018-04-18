var _class, _temp;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import NavTabInfo from './NavTabInfo';

/**
 * A set of buttons to use within the Masthead component for
 * navigation within the application. Clicking one will update
 * the application’s router with the button’s route.
 */
var MastheadNavTabs = (_temp = _class = function (_React$Component) {
  _inherits(MastheadNavTabs, _React$Component);

  function MastheadNavTabs(props) {
    _classCallCheck(this, MastheadNavTabs);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.routeTo = _this.routeTo.bind(_this);
    return _this;
  }

  MastheadNavTabs.prototype.routeTo = function routeTo(route) {
    this.props.history.push({ pathname: route, search: this.props.location.search });
  };

  MastheadNavTabs.prototype.render = function render() {
    var _this2 = this;

    var tabs = [];
    this.props.tabInfo.forEach(function (tabInfo) {
      var liClass = tabInfo.route === _this2.props.currentTab ? 'active' : '';
      var clickHandler = tabInfo.route === _this2.props.currentTab ? null : function () {
        _this2.routeTo(tabInfo.route);
      };

      tabs.push(React.createElement(
        'li',
        { key: tabInfo.route, className: liClass },
        React.createElement(
          'a',
          { onClick: clickHandler, role: 'button', tabIndex: 0 },
          tabInfo.label
        )
      ));
    });

    return React.createElement(
      'div',
      { className: 'attivio-tabpanel-radio attivio-tabpanel-radio-navbar attivio-globalmast-tabpanel' },
      React.createElement(
        'ul',
        { className: 'nav nav-tabs' },
        tabs
      )
    );
  };

  return MastheadNavTabs;
}(React.Component), _class.defaultProps = {
  currentTab: null
}, _temp);


MastheadNavTabs.NavTabInfo = NavTabInfo;

export default withRouter(MastheadNavTabs);
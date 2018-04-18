var _class2, _temp;

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import MenuItem from 'react-bootstrap/lib/MenuItem';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';
import Dropdown from 'react-bootstrap/lib/Dropdown';
import Tooltip from 'react-bootstrap/lib/Tooltip';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';

var NavMenuItem = function NavMenuItem(label, route) {
  _classCallCheck(this, NavMenuItem);

  this.label = label;
  this.route = route;
};

/**
 * A menu to allow the user to navigate between the various routes in
 * the application. It appears as an icon (the default has three horizontal
 * lines, like the bun and burger of a hamburger, hence the name) which the
 * user clicks to reveal a menu of options. Clicking one takes the user to
 * that route.
 */
var NavigationHamburgerMenu = (_temp = _class2 = function (_React$Component) {
  _inherits(NavigationHamburgerMenu, _React$Component);

  // eslint-disable-line max-len
  function NavigationHamburgerMenu(props) {
    _classCallCheck(this, NavigationHamburgerMenu);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.menuItemChosen = _this.menuItemChosen.bind(_this);
    return _this;
  }

  NavigationHamburgerMenu.prototype.menuItemChosen = function menuItemChosen(route) {
    this.props.history.push({ pathname: route, search: this.props.location.search });
  };

  NavigationHamburgerMenu.prototype.render = function render() {
    var _this2 = this;

    var menuItems = this.props.items.map(function (item) {
      var labelComp = item.route === _this2.props.currentItem ? React.createElement(
        'b',
        null,
        item.label
      ) : item.label;
      return React.createElement(
        MenuItem,
        { eventKey: item.route, key: item.label + '-' + item.route },
        labelComp
      );
    });

    var title = React.createElement(Glyphicon, { glyph: this.props.icon });
    if (this.props.tooltip && this.props.tooltip.length > 0) {
      var hamburgerMenuTooltip = React.createElement(
        Tooltip,
        { id: 'hamburgerMenuTooltip' },
        this.props.tooltip
      );
      title = React.createElement(
        OverlayTrigger,
        { placement: this.props.tooltipPlacement, overlay: hamburgerMenuTooltip },
        title
      );
    }

    var style = {
      minWidth: '35px',
      color: this.props.color,
      backgroundColor: this.props.backgroundColor,
      paddingLeft: 0,
      paddingRight: 0,
      paddingBottom: '2px',
      fontSize: 'large',
      border: 'none'
      // borderRadius: 0,
    };
    if (this.props.style) {
      Object.assign(style, this.props.style);
    }

    return React.createElement(
      ButtonToolbar,
      null,
      React.createElement(
        Dropdown,
        { onSelect: this.menuItemChosen, id: this.props.id },
        React.createElement(
          Dropdown.Toggle,
          { noCaret: true, style: style },
          title
        ),
        React.createElement(
          Dropdown.Menu,
          null,
          menuItems
        )
      )
    );
  };

  return NavigationHamburgerMenu;
}(React.Component), _class2.defaultProps = {
  icon: 'menu-hamburger',
  tooltip: '',
  tooltipPlacement: 'bottom',
  currentItem: null,
  color: '#000',
  backgroundColor: 'transparent',
  style: null
}, _temp);


NavigationHamburgerMenu.NavMenuItem = NavMenuItem;

export default withRouter(NavigationHamburgerMenu);
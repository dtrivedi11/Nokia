'use strict';

exports.__esModule = true;

var _class2, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRouterDom = require('react-router-dom');

var _MenuItem = require('react-bootstrap/lib/MenuItem');

var _MenuItem2 = _interopRequireDefault(_MenuItem);

var _ButtonToolbar = require('react-bootstrap/lib/ButtonToolbar');

var _ButtonToolbar2 = _interopRequireDefault(_ButtonToolbar);

var _Dropdown = require('react-bootstrap/lib/Dropdown');

var _Dropdown2 = _interopRequireDefault(_Dropdown);

var _Tooltip = require('react-bootstrap/lib/Tooltip');

var _Tooltip2 = _interopRequireDefault(_Tooltip);

var _OverlayTrigger = require('react-bootstrap/lib/OverlayTrigger');

var _OverlayTrigger2 = _interopRequireDefault(_OverlayTrigger);

var _Glyphicon = require('react-bootstrap/lib/Glyphicon');

var _Glyphicon2 = _interopRequireDefault(_Glyphicon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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
      var labelComp = item.route === _this2.props.currentItem ? _react2.default.createElement(
        'b',
        null,
        item.label
      ) : item.label;
      return _react2.default.createElement(
        _MenuItem2.default,
        { eventKey: item.route, key: item.label + '-' + item.route },
        labelComp
      );
    });

    var title = _react2.default.createElement(_Glyphicon2.default, { glyph: this.props.icon });
    if (this.props.tooltip && this.props.tooltip.length > 0) {
      var hamburgerMenuTooltip = _react2.default.createElement(
        _Tooltip2.default,
        { id: 'hamburgerMenuTooltip' },
        this.props.tooltip
      );
      title = _react2.default.createElement(
        _OverlayTrigger2.default,
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

    return _react2.default.createElement(
      _ButtonToolbar2.default,
      null,
      _react2.default.createElement(
        _Dropdown2.default,
        { onSelect: this.menuItemChosen, id: this.props.id },
        _react2.default.createElement(
          _Dropdown2.default.Toggle,
          { noCaret: true, style: style },
          title
        ),
        _react2.default.createElement(
          _Dropdown2.default.Menu,
          null,
          menuItems
        )
      )
    );
  };

  return NavigationHamburgerMenu;
}(_react2.default.Component), _class2.defaultProps = {
  icon: 'menu-hamburger',
  tooltip: '',
  tooltipPlacement: 'bottom',
  currentItem: null,
  color: '#000',
  backgroundColor: 'transparent',
  style: null
}, _temp);


NavigationHamburgerMenu.NavMenuItem = NavMenuItem;

exports.default = (0, _reactRouterDom.withRouter)(NavigationHamburgerMenu);
module.exports = exports['default'];
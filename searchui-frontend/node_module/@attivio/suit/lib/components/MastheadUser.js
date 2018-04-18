'use strict';

exports.__esModule = true;
exports.default = undefined;

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Dropdown = require('react-bootstrap/lib/Dropdown');

var _Dropdown2 = _interopRequireDefault(_Dropdown);

var _MenuItem = require('react-bootstrap/lib/MenuItem');

var _MenuItem2 = _interopRequireDefault(_MenuItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Displays the currently logged-in user inside the masthead.
 * The user can click on the name to pop-up a menu with a log-out command.
 */
var MastheadUser = (_temp = _class = function (_React$Component) {
  _inherits(MastheadUser, _React$Component);

  function MastheadUser(props) {
    _classCallCheck(this, MastheadUser);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.handleSelect = _this.handleSelect.bind(_this);
    return _this;
  }

  MastheadUser.prototype.handleSelect = function handleSelect() {
    this.props.logoutFunction();
  };

  MastheadUser.prototype.render = function render() {
    var dropdown = _react2.default.createElement(
      'span',
      null,
      ' ',
      _react2.default.createElement(
        _Dropdown2.default,
        { id: 'attivio-globalmast-user-dropdown', pullRight: true },
        _react2.default.createElement(
          _Dropdown2.default.Toggle,
          {
            noCaret: true,
            useAnchor: true,
            style: {
              background: 'transparent',
              color: '#fff'
            }
          },
          _react2.default.createElement('span', { className: 'attivio-globalmast-icon attivio-icon-arrow-down-blue' })
        ),
        _react2.default.createElement(
          _Dropdown2.default.Menu,
          { onSelect: this.handleSelect },
          _react2.default.createElement(
            _MenuItem2.default,
            null,
            'Log Out'
          )
        )
      )
    );
    if (this.props.username && this.props.username.length > 0) {
      return _react2.default.createElement(
        'div',
        { className: 'attivio-globalmast-user attivio-globalmast-separator before' },
        this.props.username,
        dropdown
      );
    }
    return null;
  };

  return MastheadUser;
}(_react2.default.Component), _class.defaultProps = {
  username: null,
  logoutFunction: function logoutFunction() {}
}, _temp);
exports.default = MastheadUser;
module.exports = exports['default'];
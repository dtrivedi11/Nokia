var _class, _temp;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import Dropdown from 'react-bootstrap/lib/Dropdown';
import MenuItem from 'react-bootstrap/lib/MenuItem';

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
    var dropdown = React.createElement(
      'span',
      null,
      ' ',
      React.createElement(
        Dropdown,
        { id: 'attivio-globalmast-user-dropdown', pullRight: true },
        React.createElement(
          Dropdown.Toggle,
          {
            noCaret: true,
            useAnchor: true,
            style: {
              background: 'transparent',
              color: '#fff'
            }
          },
          React.createElement('span', { className: 'attivio-globalmast-icon attivio-icon-arrow-down-blue' })
        ),
        React.createElement(
          Dropdown.Menu,
          { onSelect: this.handleSelect },
          React.createElement(
            MenuItem,
            null,
            'Log Out'
          )
        )
      )
    );
    if (this.props.username && this.props.username.length > 0) {
      return React.createElement(
        'div',
        { className: 'attivio-globalmast-user attivio-globalmast-separator before' },
        this.props.username,
        dropdown
      );
    }
    return null;
  };

  return MastheadUser;
}(React.Component), _class.defaultProps = {
  username: null,
  logoutFunction: function logoutFunction() {}
}, _temp);
export { MastheadUser as default };
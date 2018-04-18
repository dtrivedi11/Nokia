function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Children } from 'react';

import Dropdown from 'react-bootstrap/lib/Dropdown';
import Toggle from './Toggle';

/**
 * A button that displays a menu below it when clicked.
 */
var DropdownButton = function (_React$Component) {
  _inherits(DropdownButton, _React$Component);

  function DropdownButton() {
    _classCallCheck(this, DropdownButton);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  DropdownButton.prototype.render = function render() {
    return React.createElement(
      Dropdown,
      { id: this.props.id, className: 'attivio-dropdown', style: { verticalAlign: 'unset' } },
      React.createElement(
        Toggle,
        { bsRole: 'toggle', onClick: this.props.onOpen },
        this.props.title
      ),
      React.createElement(
        Dropdown.Menu,
        { bsRole: 'menu', onSelect: this.props.onSelect },
        this.props.children
      )
    );
  };

  return DropdownButton;
}(React.Component);

export { DropdownButton as default };
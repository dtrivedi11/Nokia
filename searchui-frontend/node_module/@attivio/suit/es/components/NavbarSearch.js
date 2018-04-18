var _class, _temp;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';

/**
 * A search bar to include inside a Navbar component. This isn't connected to
 * a Searcher component but is instead to be used for operations such as filtering.
 */
var NavbarSearch = (_temp = _class = function (_React$Component) {
  _inherits(NavbarSearch, _React$Component);

  function NavbarSearch(props) {
    _classCallCheck(this, NavbarSearch);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.onChange = _this.onChange.bind(_this);
    _this.onSearch = _this.onSearch.bind(_this);
    return _this;
  }

  NavbarSearch.prototype.onChange = function onChange(e) {
    if (e.target instanceof HTMLInputElement) {
      this.props.updateSearchString(e.target.value);
    }
  };

  NavbarSearch.prototype.onSearch = function onSearch() {
    this.props.onSearch();
  };

  NavbarSearch.prototype.render = function render() {
    return React.createElement(
      'form',
      { className: 'navbar-form navbar-left attivio-search', role: 'search', onSubmit: this.onSearch },
      React.createElement(
        'div',
        { className: 'form-group' },
        React.createElement('input', {
          type: 'text',
          className: 'form-control',
          placeholder: this.props.placeholder,
          value: this.props.value,
          onChange: this.onChange
        }),
        React.createElement(
          'button',
          { type: 'submit', className: 'btn btn-link attivio-icon-search' },
          React.createElement(
            'span',
            { className: 'sr-only' },
            'Search'
          )
        )
      )
    );
  };

  return NavbarSearch;
}(React.Component), _class.defaultProps = {
  placeholder: 'Search\u2026'
}, _temp);
export { NavbarSearch as default };
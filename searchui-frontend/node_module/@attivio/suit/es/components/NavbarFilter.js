function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';

/** Displays a currently applied facet filter. */
var NavbarFilter = function (_React$Component) {
  _inherits(NavbarFilter, _React$Component);

  function NavbarFilter(props) {
    _classCallCheck(this, NavbarFilter);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.remove = _this.remove.bind(_this);
    return _this;
  }

  NavbarFilter.prototype.remove = function remove(event) {
    this.props.removeCallback();
    event.target.blur();
  };

  NavbarFilter.prototype.render = function render() {
    return React.createElement(
      "div",
      { className: "attivio-globalmastnavbar-filter" },
      this.props.facetName,
      ": \xA0",
      React.createElement(
        "a",
        {
          className: "attivio-globalmastnavbar-filter-link attivio-icon-remove",
          onClick: this.remove,
          role: "button",
          tabIndex: 0
        },
        this.props.bucketLabel
      )
    );
  };

  return NavbarFilter;
}(React.Component);

export { NavbarFilter as default };
var _class, _temp;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';

/**
 * A set of buttons for choosing among a series of mutually exclusive options.
 */
var SmallTabs = (_temp = _class = function (_React$Component) {
  _inherits(SmallTabs, _React$Component);

  function SmallTabs(props) {
    _classCallCheck(this, SmallTabs);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.onClick = _this.onClick.bind(_this);
    return _this;
  }

  SmallTabs.prototype.onClick = function onClick(event) {
    var tabName = event.target.attributes.getNamedItem('data-tab-name').value;
    this.props.changed(tabName);
    event.target.blur();
  };

  SmallTabs.prototype.render = function render() {
    var _this2 = this;

    var currentTab = this.props.currentTab;
    var items = this.props.tabs.map(function (tab) {
      if (tab === currentTab) {
        return React.createElement(
          'li',
          { key: tab },
          React.createElement(
            'a',
            { className: 'attivio-smalltabs-selected' },
            tab
          )
        );
      }
      return React.createElement(
        'li',
        { key: tab },
        React.createElement(
          'a',
          { onClick: _this2.onClick, 'data-tab-name': tab, role: 'button', tabIndex: 0 },
          tab
        )
      );
    });

    return React.createElement(
      'ol',
      { className: 'attivio-smalltabs list-inline' },
      items
    );
  };

  return SmallTabs;
}(React.Component), _class.defaultProps = {
  currentTab: ''
}, _temp);
export { SmallTabs as default };
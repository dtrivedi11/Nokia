'use strict';

exports.__esModule = true;
exports.default = exports.TabInfo = undefined;

var _class2, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TabInfo = exports.TabInfo = function TabInfo(label, id, contents) {
  _classCallCheck(this, TabInfo);

  this.label = label;
  this.id = id;
  this.contents = contents;
};

var TabPanel = (_temp = _class2 = function (_React$Component) {
  _inherits(TabPanel, _React$Component);

  function TabPanel(props) {
    _classCallCheck(this, TabPanel);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.tabElements = [];

    _this.doClick = _this.doClick.bind(_this);
    return _this;
  }

  TabPanel.prototype.doClick = function doClick(newTabId) {
    this.props.tabChanged(newTabId);
    this.tabElements.forEach(function (elem) {
      if (elem) {
        elem.blur();
      }
    });
  };

  TabPanel.prototype.render = function render() {
    var _this2 = this;

    var tabTabs = this.props.tabInfos.map(function (tabInfo) {
      var className = tabInfo.id === _this2.props.activeTabId ? 'active' : '';
      var clickHandler = function clickHandler() {
        _this2.doClick(tabInfo.id);
      };
      return _react2.default.createElement(
        'li',
        { key: tabInfo.id, role: 'presentation', className: className },
        _react2.default.createElement(
          'a',
          {
            'aria-controls': 'id-' + tabInfo.id,
            role: 'tab',
            'data-toggle': 'tab',
            onClick: clickHandler,
            tabIndex: 0,
            ref: function ref(elem) {
              _this2.tabElements.push(elem);
            }
          },
          tabInfo.label
        )
      );
    });
    var tabContents = this.props.tabInfos.map(function (tabInfo) {
      var className = tabInfo.id === _this2.props.activeTabId ? 'tab-pane active' : 'tab-pane';
      return _react2.default.createElement(
        'div',
        { key: tabInfo.id, role: 'tabpanel', className: className, id: 'id-' + tabInfo.id },
        tabInfo.contents
      );
    });

    var className = this.props.nested ? 'attivio-tabpanel attivio-nested-search-tabpanel' : 'attivio-tabpanel';

    return _react2.default.createElement(
      'div',
      { role: 'tabpanel', className: className },
      _react2.default.createElement(
        'ul',
        { className: 'nav nav-tabs attivio-shadow', role: 'tablist' },
        this.props.tabLabel ? _react2.default.createElement(
          'li',
          { className: 'attivio-nested-search-tabpanel-records' },
          _react2.default.createElement(
            'strong',
            null,
            this.props.tabLabel
          )
        ) : '',
        tabTabs
      ),
      _react2.default.createElement(
        'div',
        { className: 'tab-content' },
        tabContents
      )
    );
  };

  return TabPanel;
}(_react2.default.Component), _class2.defaultProps = {
  tabLabel: null,
  nested: false
}, _temp);
exports.default = TabPanel;


TabPanel.TabInfo = TabInfo;
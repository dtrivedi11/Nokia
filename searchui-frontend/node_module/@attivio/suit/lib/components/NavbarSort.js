'use strict';

exports.__esModule = true;
exports.default = undefined;

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Menu = require('./Menu');

var _Menu2 = _interopRequireDefault(_Menu);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * A pop-up menu that lets the user choose which field the
 * search results should be sorted by. It must be a child of
 * the Searcher component it is controlling.
 */
var NavbarSort = (_temp = _class = function (_React$Component) {
  _inherits(NavbarSort, _React$Component);

  NavbarSort.makeMenuItem = function makeMenuItem(fieldName, ascending, current) {
    var arrowClass = ascending ? 'attivio-icon-sort-ascending' : 'attivio-icon-sort-descending';
    var fieldNameElement = current ? _react2.default.createElement(
      'b',
      null,
      fieldName
    ) : fieldName;
    var key = fieldName + ':' + (ascending ? 'ASC' : 'DESC');
    return _react2.default.createElement(
      'li',
      { key: key },
      _react2.default.createElement(
        'a',
        null,
        fieldNameElement,
        ' ',
        _react2.default.createElement('span', { className: arrowClass })
      )
    );
  };

  function NavbarSort(props) {
    _classCallCheck(this, NavbarSort);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.sortChanged = _this.sortChanged.bind(_this);
    return _this;
  }

  NavbarSort.prototype.sortChanged = function sortChanged(item) {
    var searcher = this.context.searcher;
    if (searcher) {
      searcher.updateSort(item.value);
    }
  };

  NavbarSort.prototype.render = function render() {
    var currentSort = void 0;
    var searcher = this.context.searcher;
    if (searcher) {
      var currentSortArray = searcher.state.sort;
      if (currentSortArray && currentSortArray.length > 0) {
        currentSort = currentSortArray[0];
      }
    }
    if (!currentSort) {
      currentSort = this.props.includeRelevancy ? '.score:DESC' : this.props.fieldNames[0] + ':ASC';
    }

    var menuItems = [];
    if (this.props.includeRelevancy) {
      var relevancyDef = new _Menu.MenuItemDef('Relevancy', '.score:DESC');
      relevancyDef.customIconClass = NavbarSort.DESCENDING;
      menuItems.push(relevancyDef);
    }
    this.props.fieldNames.forEach(function (fieldName) {
      // Make an ascending menu item
      var ascDef = new _Menu.MenuItemDef(fieldName, fieldName + ':ASC');
      ascDef.customIconClass = NavbarSort.ASCENDING;
      menuItems.push(ascDef);
      // And a descending one
      var descDef = new _Menu.MenuItemDef(fieldName, fieldName + ':DESC');
      descDef.customIconClass = NavbarSort.DESCENDING;
      menuItems.push(descDef);
    });

    var leftRight = this.props.right ? 'attivio-globalmastnavbar-right' : '';

    return _react2.default.createElement(
      'div',
      { className: leftRight },
      _react2.default.createElement(_Menu2.default, {
        label: this.props.label,
        selection: currentSort,
        items: menuItems,
        onSelect: this.sortChanged
      })
    );
  };

  return NavbarSort;
}(_react2.default.Component), _class.defaultProps = {
  right: false,
  label: 'Sort:',
  includeRelevancy: false
}, _class.contextTypes = {
  searcher: _propTypes2.default.any
}, _class.DESCENDING = 'attivio-icon-sort-descending', _class.ASCENDING = 'attivio-icon-sort-ascending', _temp);
exports.default = NavbarSort;
module.exports = exports['default'];
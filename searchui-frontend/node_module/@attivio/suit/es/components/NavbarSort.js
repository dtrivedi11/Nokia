var _class, _temp;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import PropTypes from 'prop-types';

import Menu, { MenuItemDef } from './Menu';

/**
 * A pop-up menu that lets the user choose which field the
 * search results should be sorted by. It must be a child of
 * the Searcher component it is controlling.
 */
var NavbarSort = (_temp = _class = function (_React$Component) {
  _inherits(NavbarSort, _React$Component);

  NavbarSort.makeMenuItem = function makeMenuItem(fieldName, ascending, current) {
    var arrowClass = ascending ? 'attivio-icon-sort-ascending' : 'attivio-icon-sort-descending';
    var fieldNameElement = current ? React.createElement(
      'b',
      null,
      fieldName
    ) : fieldName;
    var key = fieldName + ':' + (ascending ? 'ASC' : 'DESC');
    return React.createElement(
      'li',
      { key: key },
      React.createElement(
        'a',
        null,
        fieldNameElement,
        ' ',
        React.createElement('span', { className: arrowClass })
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
      var relevancyDef = new MenuItemDef('Relevancy', '.score:DESC');
      relevancyDef.customIconClass = NavbarSort.DESCENDING;
      menuItems.push(relevancyDef);
    }
    this.props.fieldNames.forEach(function (fieldName) {
      // Make an ascending menu item
      var ascDef = new MenuItemDef(fieldName, fieldName + ':ASC');
      ascDef.customIconClass = NavbarSort.ASCENDING;
      menuItems.push(ascDef);
      // And a descending one
      var descDef = new MenuItemDef(fieldName, fieldName + ':DESC');
      descDef.customIconClass = NavbarSort.DESCENDING;
      menuItems.push(descDef);
    });

    var leftRight = this.props.right ? 'attivio-globalmastnavbar-right' : '';

    return React.createElement(
      'div',
      { className: leftRight },
      React.createElement(Menu, {
        label: this.props.label,
        selection: currentSort,
        items: menuItems,
        onSelect: this.sortChanged
      })
    );
  };

  return NavbarSort;
}(React.Component), _class.defaultProps = {
  right: false,
  label: 'Sort:',
  includeRelevancy: false
}, _class.contextTypes = {
  searcher: PropTypes.any
}, _class.DESCENDING = 'attivio-icon-sort-descending', _class.ASCENDING = 'attivio-icon-sort-ascending', _temp);
export { NavbarSort as default };
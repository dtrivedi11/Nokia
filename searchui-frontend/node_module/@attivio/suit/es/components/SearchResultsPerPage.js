var _class, _temp;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import PropTypes from 'prop-types';

import Menu, { MenuItemDef } from './Menu';

/**
 * A pop-up for choosing how many search results should be
 * on each page. It works with the parent Searcher component to
 * update its property and to show the current value.
 */
var SearchResultsPerPage = (_temp = _class = function (_React$Component) {
  _inherits(SearchResultsPerPage, _React$Component);

  // eslint-disable-line max-len
  function SearchResultsPerPage(props) {
    _classCallCheck(this, SearchResultsPerPage);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.onSelect = _this.onSelect.bind(_this);
    return _this;
  }

  SearchResultsPerPage.prototype.onSelect = function onSelect(item) {
    var newValue = parseInt(item.value, 10);
    var searcher = this.context.searcher;
    if (searcher) {
      searcher.updateResultsPerPage(newValue);
    }
  };

  SearchResultsPerPage.prototype.render = function render() {
    var searcher = this.context.searcher;
    var value = 25;
    if (searcher) {
      value = searcher.state.resultsPerPage;
    }

    var items = this.props.options.map(function (count) {
      var stringCount = count.toString();
      return new MenuItemDef(stringCount, stringCount);
    });

    return React.createElement(Menu, {
      label: 'Page Size:',
      items: items,
      selection: value.toString(),
      onSelect: this.onSelect
    });
  };

  return SearchResultsPerPage;
}(React.Component), _class.defaultProps = {
  options: [10, 25, 50, 100]
}, _class.contextTypes = {
  searcher: PropTypes.any
}, _temp);
export { SearchResultsPerPage as default };
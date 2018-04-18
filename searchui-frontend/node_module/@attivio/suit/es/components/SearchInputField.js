var _class, _temp;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import PropTypes from 'prop-types';

import SearchButton from './SearchButton';

/**
 * This component renders an input field for entering a query string
 * for doing a search. It interacts with its parent Searcher component
 * to actually perform the search and the results will be displayed in
 * other children of the Searcher. It is designed to be used outside of
 * the masthead, unlike the <code>SearchBar</code> component.
 */
var SearchInputField = (_temp = _class = function (_React$Component) {
  _inherits(SearchInputField, _React$Component);

  function SearchInputField(props) {
    _classCallCheck(this, SearchInputField);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.updateQuery = _this.updateQuery.bind(_this);
    _this.keyPressed = _this.keyPressed.bind(_this);
    _this.doSearch = _this.doSearch.bind(_this);
    return _this;
  }

  SearchInputField.prototype.updateQuery = function updateQuery(event) {
    if (event.target instanceof HTMLInputElement) {
      var searcher = this.context.searcher;
      searcher.updateQuery(event.target.value);
    }
  };

  SearchInputField.prototype.keyPressed = function keyPressed(event) {
    if (event.target instanceof HTMLInputElement) {
      if (event.key === 'Enter') {
        this.doSearch();
      }
    }
  };

  SearchInputField.prototype.doSearch = function doSearch() {
    var searcher = this.context.searcher;
    searcher.doSearch();
  };

  SearchInputField.prototype.render = function render() {
    var style = {
      height: '2em',
      padding: '1em',
      borderRadius: '5px',
      border: '1px solid #ccc',
      width: '500px'
    };

    var searcher = this.context.searcher;
    var query = '';
    if (searcher) {
      query = searcher.state.query;
    }

    return React.createElement(
      'span',
      null,
      React.createElement('input', {
        type: 'text',
        defaultValue: query,
        placeholder: this.props.placeholder,
        onChange: this.updateQuery,
        style: style,
        onKeyPress: this.keyPressed
      }),
      React.createElement(SearchButton, { doSearch: this.doSearch })
    );
  };

  return SearchInputField;
}(React.Component), _class.defaultProps = {
  placeholder: 'Search\u2026'
}, _class.contextTypes = {
  searcher: PropTypes.any
}, _temp);
export { SearchInputField as default };
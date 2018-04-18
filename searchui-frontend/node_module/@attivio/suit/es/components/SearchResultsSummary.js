function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';

/**
 * A summary of the currently displayed search results.
 */
var SearchResultsSummary = function (_React$Component) {
  _inherits(SearchResultsSummary, _React$Component);

  function SearchResultsSummary() {
    _classCallCheck(this, SearchResultsSummary);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  SearchResultsSummary.prototype.render = function render() {
    if (this.props.haveSearched) {
      var _pageNumber = this.props.pageNumber;
      var _totalResults = this.props.totalResults;
      var _resultsPerPage = this.props.resultsPerPage;
      var firstResult = _pageNumber * _resultsPerPage + 1;
      var lastResult = firstResult + _resultsPerPage - 1 > _totalResults ? _totalResults : firstResult + _resultsPerPage - 1;

      var results = _totalResults === 1 ? React.createElement(
        'span',
        null,
        'Your search returned 1 document.'
      ) : React.createElement(
        'span',
        null,
        'Your search returned ',
        _totalResults,
        ' documents.'
      );
      var range = void 0;
      if (firstResult !== 1 || lastResult < _totalResults) {
        // Not showing the full range so let the user know
        range = React.createElement(
          'span',
          null,
          'Currently showing documents ',
          firstResult,
          ' through ',
          lastResult,
          '.'
        );
      } else {
        range = React.createElement('span', null);
      }

      return React.createElement(
        'div',
        null,
        results,
        ' ',
        range
      );
    }
    return React.createElement('div', null);
  };

  return SearchResultsSummary;
}(React.Component);

export { SearchResultsSummary as default };
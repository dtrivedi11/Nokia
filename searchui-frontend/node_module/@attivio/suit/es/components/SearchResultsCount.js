var _class, _temp;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import PropTypes from 'prop-types';

/**
 * The count of search results or an indication
 * that a search hasn't yet happened.
 */
var SearchResultsCount = (_temp = _class = function (_React$Component) {
  _inherits(SearchResultsCount, _React$Component);

  function SearchResultsCount() {
    _classCallCheck(this, SearchResultsCount);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  SearchResultsCount.prototype.render = function render() {
    var searcher = this.context.searcher;
    var message = void 0;
    var countMessage = void 0;
    if (searcher) {
      var response = searcher.state.response;
      if (response) {
        var count = response.totalHits;
        if (count === 0) {
          countMessage = 'No results found';
        } else if (count === 1) {
          countMessage = '1 result found';
        } else {
          var countStr = Number(count).toLocaleString();
          countMessage = countStr + ' results found';
        }
        message = React.createElement(
          'span',
          null,
          countMessage,
          React.createElement(
            'span',
            { style: { fontWeight: 'normal' } },
            ' ',
            '(in ',
            response.totalTime,
            'ms)'
          )
        );
      } else if (searcher.state.error) {
        // got an error...
        message = 'Error: ' + searcher.state.error;
      } else {
        message = ''; // Not yet searched...
      }
    } else {
      message = 'No searcher is configured.';
    }

    return React.createElement(
      'div',
      { className: 'attivio-globalmastnavbar-results' },
      message
    );
  };

  return SearchResultsCount;
}(React.Component), _class.contextTypes = {
  searcher: PropTypes.any
}, _temp);
export { SearchResultsCount as default };
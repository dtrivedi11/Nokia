var _class, _temp;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import PropTypes from 'prop-types';

/**
 * A simple control for paging through a set of results with
 * just forward and back buttons. It works with the parent
 * Searcher component to know about the page the user is currently
 * on and whether we can go forward or backward and also to
 * trigger a jump to the next or previous page.
 */
var SearchResultsPager = (_temp = _class = function (_React$Component) {
  _inherits(SearchResultsPager, _React$Component);

  function SearchResultsPager(props) {
    _classCallCheck(this, SearchResultsPager);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.back = _this.back.bind(_this);
    _this.next = _this.next.bind(_this);
    return _this;
  }

  SearchResultsPager.prototype.back = function back() {
    if (this.backButton) {
      this.backButton.blur();
    }
    var searcher = this.context.searcher;
    if (searcher) {
      if (searcher.state.response) {
        var pageSize = searcher.state.resultsPerPage;
        if (pageSize > 0) {
          var currentPage = Math.floor(searcher.state.resultsOffset / pageSize);
          if (currentPage > 0) {
            // Can go backward...
            searcher.changePage(currentPage - 1);
          }
        }
      }
    }
  };

  SearchResultsPager.prototype.next = function next() {
    if (this.nextButton) {
      this.nextButton.blur();
    }
    var searcher = this.context.searcher;
    if (searcher) {
      if (searcher.state.response) {
        var pageSize = searcher.state.resultsPerPage;
        if (pageSize > 0) {
          var currentPage = Math.floor(searcher.state.resultsOffset / pageSize);
          var totalDocs = searcher.state.response.totalHits;
          var maxPage = Math.floor(totalDocs / pageSize);
          if (currentPage < maxPage) {
            // Can go forward...
            searcher.changePage(currentPage + 1);
          }
        }
      }
    }
  };

  SearchResultsPager.prototype.render = function render() {
    var _this2 = this;

    var searcher = this.context.searcher;
    if (searcher) {
      if (searcher.state.response) {
        var pageSize = searcher.state.resultsPerPage;
        if (pageSize > 0) {
          var currentPage = Math.floor(searcher.state.resultsOffset / pageSize);
          var currentDisplayPage = Number(currentPage + 1).toLocaleString();
          var totalHits = searcher.state.response.totalHits;
          var lastPage = Math.ceil(totalHits / pageSize);

          var canGoLeft = currentPage > 0;
          var leftButton = canGoLeft ? React.createElement(
            'a',
            {
              role: 'button',
              tabIndex: 0,
              className: 'attivio-globalmastnavbar-pagination-previous attivio-globalmastnavbar-btn attivio-icon-arrow-left-gray',
              onClick: this.back,
              ref: function ref(c) {
                _this2.backButton = c;
              }
            },
            'Previous'
          ) : React.createElement(
            'a',
            {
              className: 'attivio-globalmastnavbar-pagination-previous attivio-globalmastnavbar-btn attivio-icon-arrow-left-gray disabled' // eslint-disable-line max-len
            },
            'Previous'
          );
          var canGoRight = currentPage < lastPage - 1;
          var rightButton = canGoRight ? React.createElement(
            'a',
            {
              role: 'button',
              tabIndex: 0,
              className: 'attivio-globalmastnavbar-pagination-next attivio-globalmastnavbar-btn attivio-icon-arrow-right-gray',
              onClick: this.next,
              ref: function ref(c) {
                _this2.nextButton = c;
              }
            },
            'Next'
          ) : React.createElement(
            'a',
            {
              className: 'attivio-globalmastnavbar-pagination-next attivio-globalmastnavbar-btn attivio-icon-arrow-right-gray disabled' // eslint-disable-line max-len
            },
            'Next'
          );

          var leftRight = this.props.right ? 'attivio-globalmastnavbar-right' : '';

          return React.createElement(
            'div',
            { className: leftRight },
            React.createElement(
              'div',
              { className: 'attivio-globalmastnavbar-pagination' },
              leftButton,
              React.createElement(
                'div',
                { className: 'attivio-globalmastnavbar-pagination-page' },
                'Page ',
                currentDisplayPage
              ),
              rightButton
            )
          );
        }
      }
    }
    // No searcher or no results... return nothing;
    return null;
  };

  return SearchResultsPager;
}(React.Component), _class.defaultProps = {
  right: false
}, _class.contextTypes = {
  searcher: PropTypes.any
}, _temp);
export { SearchResultsPager as default };
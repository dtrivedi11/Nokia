var _class, _temp;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import PropTypes from 'prop-types';

import FieldNames from '../api/FieldNames';

import SearchResult from './SearchResult';
import SearchDocument from '../api/SearchDocument';
import SimpleQueryRequest from '../api/SimpleQueryRequest';
import QueryResponse from '../api/QueryResponse';

/**
 * A container for showing a list of documents from the search results.
 * This comes from the parent Searcher component.
 */
var SimilarDocuments = (_temp = _class = function (_React$Component) {
  _inherits(SimilarDocuments, _React$Component);

  // eslint-disable-line max-len
  function SimilarDocuments(props) {
    _classCallCheck(this, SimilarDocuments);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.state = {
      docs: [],
      error: null
    };
    return _this;
  }

  SimilarDocuments.prototype.componentDidMount = function componentDidMount() {
    var _this2 = this;

    if (this.props.baseDoc) {
      var query = this.props.baseDoc.getFirstValue('morelikethisquery');
      if (query) {
        if (this.context.searcher) {
          var searcher = this.context.searcher;
          var req = new SimpleQueryRequest(query);
          req.queryLanguage = 'advanced';
          var fields = searcher.getFieldList();
          req.fields = fields;
          req.rows = 6;

          searcher.doCustomSearch(req, function (response, error) {
            if (response && response.documents) {
              var _docs = response.documents.slice();
              if (_this2.props.baseDoc) {
                var baseDocId = _this2.props.baseDoc.getFirstValue(FieldNames.ID);
                _docs = _docs.filter(function (doc) {
                  return doc.getFirstValue(FieldNames.ID) !== baseDocId;
                });
              }
              if (_docs.length > 5) {
                _docs = _docs.slice(0, 5);
              }
              _this2.setState({ docs: _docs });
            } else if (error) {
              _this2.setState({ error: error });
            }
          });
        }
      }
    }
  };

  SimilarDocuments.prototype.renderResults = function renderResults() {
    var _this3 = this;

    if (this.state.docs.length > 0) {
      var results = [];
      this.state.docs.forEach(function (document, index) {
        var key = document.getFirstValue(FieldNames.ID);
        var position = index + 1;
        results.push(React.createElement(SearchResult, {
          document: document,
          format: 'simple',
          position: position,
          key: key,
          baseUri: _this3.props.baseUri
        }));
      });
      return results;
    }
    if (this.state.error) {
      return this.state.error;
    }
    return React.createElement(
      'li',
      { className: 'none' },
      'No similar documents exist'
    );
  };

  SimilarDocuments.prototype.render = function render() {
    var style = {
      listStyle: 'none',
      paddingLeft: 0
    };

    return React.createElement(
      'ul',
      { style: style },
      this.renderResults()
    );
  };

  return SimilarDocuments;
}(React.Component), _class.defaultProps = {
  baseUri: ''
}, _class.contextTypes = {
  searcher: PropTypes.any
}, _temp);
export { SimilarDocuments as default };
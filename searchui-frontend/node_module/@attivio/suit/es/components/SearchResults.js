var _class, _temp;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import PropTypes from 'prop-types';

import FieldNames from '../api/FieldNames';

import SearchResult from './SearchResult';
import PeopleSearchResult from './PeopleSearchResult';

import JiraSearchResult from './JiraSearchResult';
import ProductSearchResult from './ProductSearchResult';
//import ConfluenceSearchResult from './ConfluenceSearchResult';
import SquadSearchResult from './SquadSearchResult';

import SearchDocument from '../api/SearchDocument';

/**
 * A container for showing a list of documents from the search results.
 * This comes from the parent Searcher component.
 */
var SearchResults = (_temp = _class = function (_React$Component) {
  _inherits(SearchResults, _React$Component);

  function SearchResults() {
    _classCallCheck(this, SearchResults);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  SearchResults.prototype.renderResults = function renderResults() {
    var _this2 = this;

    var searcher = this.context.searcher;
    var response = searcher.state.response;
    var offset = searcher.state.resultsOffset;
    if (response && response.documents && response.documents.length > 0) {
      var documents = response.documents;
      var results = [];
      documents.forEach(function (document, index) {
        var key = document.getFirstValue(FieldNames.ID);
        var position = offset + index + 1;
        var table = document.getFirstValue('table');
        if (table === 'People')
        {
        results.push(React.createElement(PeopleSearchResult, {
          document: document,
          format: _this2.props.format,
          position: position,
          key: key,
          showScores: _this2.props.showScores,
          entityFields: _this2.props.entityFields,
          baseUri: _this2.props.baseUri,
          showRatings: _this2.props.showRatings,
          showTags: _this2.props.showTags
        }));
      }else if (table === 'SharePoint')
      {results.push(React.createElement(SearchResult, {
          document: document,
          format: _this2.props.format,
          position: position,
          key: key,
          showScores: _this2.props.showScores,
          entityFields: _this2.props.entityFields,
          baseUri: _this2.props.baseUri,
          showRatings: _this2.props.showRatings,
          showTags: _this2.props.showTags
        }));
    }else if (table === 'Jira')
      {results.push(React.createElement(JiraSearchResult, {
          document: document,
          format: _this2.props.format,
          position: position,
          key: key,
          showScores: _this2.props.showScores,
          entityFields: _this2.props.entityFields,
          baseUri: _this2.props.baseUri,
          showRatings: _this2.props.showRatings,
          showTags: _this2.props.showTags
        }));
    }else if (table === 'Enovia')
      {results.push(React.createElement(ProductSearchResult, {
          document: document,
          format: _this2.props.format,
          position: position,
          key: key,
          showScores: _this2.props.showScores,
          entityFields: _this2.props.entityFields,
          baseUri: _this2.props.baseUri,
          showRatings: _this2.props.showRatings,
          showTags: _this2.props.showTags
        }));
    }else if (table === 'Squads')
      {results.push(React.createElement(SquadSearchResult, {
          document: document,
          format: _this2.props.format,
          position: position,
          key: key,
          showScores: _this2.props.showScores,
          entityFields: _this2.props.entityFields,
          baseUri: _this2.props.baseUri,
          showRatings: _this2.props.showRatings,
          showTags: _this2.props.showTags
        }));
    }else{
      results.push(React.createElement(SearchResult, {
          document: document,
          format: _this2.props.format,
          position: position,
          key: key,
          showScores: _this2.props.showScores,
          entityFields: _this2.props.entityFields,
          baseUri: _this2.props.baseUri,
          showRatings: _this2.props.showRatings,
          showTags: _this2.props.showTags
        }));
    }
      });
      return results;
    }
    return null;
  };

  SearchResults.prototype.render = function render() {
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

  return SearchResults;
}(React.Component), _class.defaultProps = {
  baseUri: '',
  format: 'list',
  showScores: false,
  entityFields: new Map([['people', 'People'], ['locations', 'Locations'], ['companies', 'Companies']]),
  showTags: true,
  showRatings: true
}, _class.contextTypes = {
  searcher: PropTypes.any
}, _temp);
export { SearchResults as default };
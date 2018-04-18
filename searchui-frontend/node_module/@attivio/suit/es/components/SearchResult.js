var _class, _temp;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import PropTypes from 'prop-types';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

import SearchDocument from '../api/SearchDocument';
import FieldNames from '../api/FieldNames';
import StringUtils from '../util/StringUtils';

import Card from './Card';
import Configuration from './Configuration';
import DocumentType from './DocumentType';
import StarRating from './StarRating';
import SearchResultTitle from './SearchResultTitle';
import SearchResultBody from './SearchResultBody';
import SearchResultTags from './SearchResultTags';
import TabPanel, { TabInfo } from './TabPanel';
import DocumentThumbnail from './DocumentThumbnail';
import RelevancyScore from './RelevancyScore';
import DocumentEntityList from './DocumentEntityList';
import Signals from '../api/Signals';

/**
 * An individual search result.
 * If the format is "list," then the document should contain these fields:
 *  .id
 *  table
 *  title
 *  text
 *
 * If it's "simple," then these:
 *  .id
 *  table
 *  title
 *  text
 *
 * If it's "usercard," these:
 *
 * If it's "doccard," these:
 *
 * For debug, any and all fields in the document are shown.
 */
var SearchResult = (_temp = _class = function (_React$Component) {
  _inherits(SearchResult, _React$Component);

  SearchResult.getFirstDocumentType = function getFirstDocumentType(list) {
    var result = '';
    if (list && list.length > 0) {
      result = list[0].getFirstValue('table');
    }
    return result;
  };

  SearchResult.valueToDisplay = function valueToDisplay(value) {
    if (typeof value === 'string') {
      return value;
    }
    var json = JSON.stringify(value, null, 2);
    if (json.startsWith('{')) {
      return React.createElement(
        'pre',
        null,
        json
      );
    }
    return React.createElement(
      'span',
      null,
      json
    );
  };

  function SearchResult(props) {
    _classCallCheck(this, SearchResult);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.state = {
      currentTab: SearchResult.getFirstDocumentType(props.document.children)
    };
    _this.tabChanged = _this.tabChanged.bind(_this);
    _this.rateDocument = _this.rateDocument.bind(_this);
    return _this;
  }

  SearchResult.prototype.tabChanged = function tabChanged(newTab) {
    this.setState({
      currentTab: newTab
    });
  };

  SearchResult.prototype.rateDocument = function rateDocument(doc, rating) {
    if (doc.signal) {
      new Signals(this.props.baseUri).addSignal(doc, 'like', rating);
    }
  };


  SearchResult.prototype.handleDocumentClick = function handleDocumentClick(doc, SearchDocument) {
   if (this.titleLink) {
     this.titleLink.blur();
   }
   if (doc.signal) {
        
     new Signals(doc.baseUri).addSignal(doc);
   }
   var uri = doc.getFirstValue('url');

   window.open(uri, '_blank');
  };


  SearchResult.prototype.renderListResult = function renderListResult() {

    var _this2 = this;

      var doc = this.props.document;
      var docId = doc.getFirstValue('.id');
      var table = doc.getFirstValue('table');
      var thumbnailUri = doc.getFirstValue('thumbnailImageUri');
      var scoreString = doc.getFirstValue(FieldNames.SCORE);
      var score = scoreString ? parseFloat(scoreString) : 0;
      var scoreDescription = doc.getFirstValue(FieldNames.SCORE_EXPLAIN);
      var sp_filename = doc.getFirstValue('d.file.name');
      //const title = ( doc.getFirstValue('title') == "" ) ? sp_filename : doc.getFirstValue('title')  ;

      var title = sp_filename;
      var text = doc.getFirstValue('teaser');
      var moreLikeThisQuery = doc.getFirstValue('morelikethisquery');
      var docTags = doc.getAllValues('tags');
      var author = doc.getFirstValue('author') === "" ? "Unavailable" : doc.getFirstValue('author');
      var dateCreated = Date();
      var dateModified = Date();

      var sp_doctype = doc.getFirstValue('doctype');
      var sp_mimetype = doc.getFirstValue('mimetype');
      var sp_table = doc.getFirstValue('table');
      var sp_childpath = doc.getFirstValue('childpath');

      var sp_datetime = doc.getFirstValue('datetime');
      var sp_url = doc.getFirstValue('url');
      var sp_teaser = doc.getFirstValue('teaser');
      var sp_author = doc.getFirstValue('rt_authorname');
      var sp_language = doc.getFirstValue('language');
      var sp_creationdate = doc.getFirstValue('creationdate');
      var sp_modifieddate = doc.getFirstValue('d.file.timelastmodified');
      var sp_parentid = doc.getFirstValue('parentid');
      var sp_keyphrases = doc.getAllValues('keyphrases');

      var sp_url_decoded = decodeURIComponent(sp_url);

      var img_image_height = doc.getFirstValue('image_height');
      var img_image_width = doc.getFirstValue('image_width');
      var img_photoshop_colormode = doc.getFirstValue('photoshop_colormode');
      if (sp_creationdate == "") {
              var newdate = new Date(sp_modifieddate);
            } else {
              var newdate = new Date(sp_creationdate);
            }
      //const formatteddate=sp_creationdate.getUTCDate();
      //var newdate= new Date(sp_creationdate);
      //var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      var options = { day: 'numeric', month: 'long', year: 'numeric' };
      //var formatteddate = newdate.getUTCDate() + '-' + newdate.getUTCMonth() + '-'  + newdate.getUTCFullYear();
      var formatteddate = newdate.toLocaleDateString('en-US', options);

      //const formatteddate=sp_creationdate.getUTCDate();
      var newmoddate = new Date(sp_modifieddate);
      //var formatteddate = newdate.getUTCDate() + '-' + newdate.getUTCMonth() + '-'  + newdate.getUTCFullYear();
      var formattedmoddate = newmoddate.toLocaleDateString('en-US', options);

    var nestedDocs = null;
    if (doc.children && doc.children.length > 0) {
      var childMap = new Map();
      doc.children.forEach(function (child) {
        var childTable = child.getFirstValue('table');
        var tableDocs = childMap.get(childTable);
        if (tableDocs) {
          tableDocs.push(child);
        } else {
          var newTableDocs = [child];
          childMap.set(childTable, newTableDocs);
        }
      });
      var tabInfos = [];
      childMap.forEach(function (tableDocs, tabTable) {
        var label = tableDocs.length === 1 ? '1 ' + tabTable : tableDocs.length + ' ' + tabTable;
        var docResults = tableDocs.map(function (tableDoc, index) {
          var childPosition = index + 1;
          return React.createElement(SearchResult, {
            document: tableDoc,
            key: tableDoc.getFirstValue('.id'),
            position: childPosition,
            baseUri: _this2.props.baseUri
          });
        });
        var docResultsList = React.createElement(
          'div',
          { className: 'attivio-nested-search-results' },
          docResults
        );
        tabInfos.push(new TabInfo(label, tabTable, docResultsList));
      });
      var tabLabel = void 0;
      if (doc.children.length === 1) {
        tabLabel = 'One Child Record:';
      } else {
        tabLabel = doc.children.length + ' Child Records:';
      }
      nestedDocs = React.createElement(TabPanel, {
        tabInfos: tabInfos,
        activeTabId: this.state.currentTab,
        tabChanged: this.tabChanged,
        tabLabel: tabLabel,
        nested: true
      });
    }

    if (thumbnailUri == 'img/word.png') {
        thumbnailUri = 'img/msword.png';
      }

      if (sp_doctype == "JPEG File Interchange") {
        return React.createElement(
          Card,
          { key: docId, style: { marginBottom: '5px' } },
          React.createElement(
            'div',
            { className: ' attivio-search-result' },
            React.createElement(
              'div',
              { className: 'attivio-search-result-col' },
              React.createElement(DocumentType, { docType: table, position: this.props.position }),
              React.createElement(DocumentThumbnail, { uri: thumbnailUri }),
              React.createElement(
                'dl',
                { className: 'attivio-labeldata-stacked attivio-labeldata-stacked-search-results' },
                React.createElement(
                  'dt',
                  null,
                  'Rating'
                ),
                React.createElement(
                  'dd',
                  null,
                  React.createElement(StarRating, { onRated: function onRated(rating) {
                      _this2.rateDocument(doc, rating);
                    } })
                ),
                this.props.showScores ? React.createElement(
                  'dt',
                  null,
                  'Relevancy Score'
                ) : '',
                this.props.showScores ? React.createElement(
                  'dd',
                  null,
                  React.createElement(RelevancyScore, { score: score, explanation: scoreDescription, id: docId })
                ) : ''
              )
            ),
            React.createElement(
              'div',
              { className: 'attivio-search-result-content' },
              React.createElement(SearchResultTitle, { title: title, onClick: function onClick() {
                  _this2.handleDocumentClick(doc);
                } }),

              React.createElement(
                Row,
                null,
                React.createElement(
                  'div',
                  { className: 'col-sm-3 col-xs-2 col-md-8 col-lg-8', style: { margin: '10px' } },
                  React.createElement('img', { src: sp_url, style: { width: '80%', height: '100%' } })
                )
              )
            )
          )
        );
      }
      if (thumbnailUri == 'img/word.png') {
        thumbnailUri = 'img/msword.png';
      }

      if (sp_doctype == "JPEG File Interchange") {
        return React.createElement(
          Card,
          { key: docId, style: { marginBottom: '5px' } },
          React.createElement(
            'div',
            { className: ' attivio-search-result' },
            React.createElement(
              'div',
              { className: 'attivio-search-result-col' },
              React.createElement(DocumentType, { docType: table, position: this.props.position }),
              React.createElement(DocumentThumbnail, { uri: thumbnailUri }),
              React.createElement(
                'dl',
                { className: 'attivio-labeldata-stacked attivio-labeldata-stacked-search-results' },
                React.createElement(
                  'dt',
                  null,
                  'Rating'
                ),
                React.createElement(
                  'dd',
                  null,
                  React.createElement(StarRating, { onRated: function onRated(rating) {
                      _this2.rateDocument(doc, rating);
                    } })
                ),
                this.props.showScores ? React.createElement(
                  'dt',
                  null,
                  'Relevancy Score'
                ) : '',
                this.props.showScores ? React.createElement(
                  'dd',
                  null,
                  React.createElement(RelevancyScore, { score: score, explanation: scoreDescription, id: docId })
                ) : ''
              )
            ),
            React.createElement(
              'div',
              { className: 'attivio-search-result-content' },
              /*React.createElement(SearchResultTitle, { title: title, onClick: function onClick() {
                  _this2.handleDocumentClick(doc);
                } }),*/
                 React.createElement(SearchResultTitle, { doc: doc, baseUri: this.props.baseUri }),
              React.createElement(
                Row,
                null,
                React.createElement(
                  'div',
                  { className: 'col-sm-3 col-xs-2 col-md-8 col-lg-8', style: { margin: '10px' } },
                  React.createElement('img', { src: sp_url, style: { width: '80%', height: '100%' } })
                )
              )
            )
          )
        );
      }

      var phraseList = void 0;
      var index = 0;
      if (sp_keyphrases.length > 0) {
        phraseList = sp_keyphrases.map(function (tag) {
          index++;
          if (index > 10) {
            return;
          }
          return React.createElement(
            'span',
            null,
            tag,
            ','
          );
        });
      } else {
        phraseList = React.createElement(
          'span',
          { className: 'attivio-tags-link none' },
          'None'
        );
      }

      return React.createElement(
        Card,
        null,
        React.createElement(
          'div',
          { className: ' attivio-search-result' },
          React.createElement(
            'div',
            { className: 'attivio-search-result-col' },
            React.createElement(DocumentType, { docType: table, position: this.props.position }),
            React.createElement(DocumentThumbnail, { uri: thumbnailUri }),
            React.createElement(
              'dl',
              { className: 'attivio-labeldata-stacked attivio-labeldata-stacked-search-results' },
              React.createElement(
                'dt',
                null,
                'Rating'
              ),
              React.createElement(
                'dd',
                null,
                React.createElement(StarRating, { onRated: function onRated(rating) {
                    _this2.rateDocument(doc, rating);
                  } })
              ),
              this.props.showScores ? React.createElement(
                'dt',
                null,
                'Relevancy Score'
              ) : '',
              this.props.showScores ? React.createElement(
                'dd',
                null,
                React.createElement(RelevancyScore, { score: score, explanation: scoreDescription, id: docId })
              ) : ''
            )
          ),
          React.createElement(
            'div',
            { className: 'attivio-search-result-content' },
            React.createElement(SearchResultTitle, { title: title, onClick: function onClick() {
                _this2.handleDocumentClick(doc);
              } }),
            React.createElement(
              Row,
              null,
              React.createElement(
                'div',
                { className: 'col-sm-3 col-xs-2 col-md-7 col-lg-7', style: { margin: '1px', width: '100%' } },
                React.createElement(
                  'a',
                  { className: 'url_link', href: sp_url_decoded },
                  ' ',
                  sp_url_decoded
                )
              )
            ),
            React.createElement(
              Row,
              null,
              React.createElement(
                'div',
                { className: 'col-sm-3 col-xs-2 col-md-5 col-lg-5', style: { margin: '1px' } },
                React.createElement(
                  'b',
                  null,
                  '  Author  : '
                ),
                sp_author
              ),
              React.createElement(
                'div',
                { className: 'col-sm-3 col-xs-2 col-md-5 col-lg-5', style: { margin: '1px' } },
                React.createElement(
                  'b',
                  null,
                  '  Language  : '
                ),
                sp_language
              )
            ),
            React.createElement(
              Row,
              null,
              React.createElement(
                'div',
                { className: 'col-sm-3 col-xs-2 col-md-7 col-lg-7', style: { margin: '1px' } },
                React.createElement(
                  'b',
                  null,
                  '  Doc Type  : '
                ),
                sp_doctype
              )
            ),
            React.createElement(
              Row,
              null,
              React.createElement(
                'div',
                { className: 'col-sm-3 col-xs-2 col-md-5 col-lg-5', style: { margin: '1px' } },
                React.createElement(
                  'b',
                  null,
                  '  Modified  Date : '
                ),
                formattedmoddate
              ),
              React.createElement(
                'div',
                { className: 'col-sm-3 col-xs-2 col-md-5 col-lg-5', style: { margin: '1px' } },
                React.createElement(
                  'b',
                  null,
                  '  Created Date : '
                ),
                formatteddate
              )
            ),
            React.createElement(
              Row,
              null,
              React.createElement(
                'div',
                { style: { margin: '10px' } },
                React.createElement(
                  'b',
                  null,
                  '  Phrase List  : '
                ),
                phraseList
              )
            ),
            React.createElement(
              Row,
              null,
              React.createElement(
                Col,
                { xs: 7, sm: 10 },
                React.createElement(SearchResultBody, { body: text.slice(1, 4000) }),
                React.createElement(SearchResultTags, { tags: docTags, moreLikeThisQuery: moreLikeThisQuery, docId: docId })
              )
            )
          )
        )
      );


   /* return React.createElement(
      'div',
      { className: ' attivio-search-result' },
      React.createElement(
        'div',
        { className: 'attivio-search-result-col' },
        React.createElement(DocumentType, { docType: table, position: this.props.position }),
        React.createElement(DocumentThumbnail, { uri: thumbnailUri }),
        React.createElement(
          'dl',
          { className: 'attivio-labeldata-stacked attivio-labeldata-stacked-search-results' },
          this.props.showRatings ? React.createElement(
            'div',
            null,
            React.createElement(
              'dt',
              null,
              'Rating'
            ),
            React.createElement(
              'dd',
              null,
              React.createElement(StarRating, { onRated: function onRated(rating) {
                  _this2.rateDocument(doc, rating);
                } })
            )
          ) : null,
          this.props.showScores ? React.createElement(
            'dt',
            null,
            'Relevancy Score'
          ) : '',
          this.props.showScores ? React.createElement(
            'dd',
            null,
            React.createElement(RelevancyScore, { score: score, explanation: scoreDescription, id: docId })
          ) : ''
        )
      ),
      React.createElement(
        'div',
        { className: 'attivio-search-result-content' },
        React.createElement(SearchResultTitle, { doc: doc, baseUri: this.props.baseUri }),
        React.createElement(
          Row,
          null,
          React.createElement(
            Col,
            { xs: 7, sm: 7 },
            React.createElement(SearchResultBody, { body: text }),
            this.props.showTags ? React.createElement(SearchResultTags, { tags: docTags, moreLikeThisQuery: moreLikeThisQuery, docId: docId }) : null
          ),
          React.createElement(
            Col,
            { xs: 5, sm: 5 },
            React.createElement(DocumentEntityList, { doc: doc, entityFields: this.props.entityFields })
          )
        )
      ),
      nestedDocs
    );*/
  };

  SearchResult.prototype.renderSimpleResult = function renderSimpleResult() {
    var doc = this.props.document;
    var docId = doc.getFirstValue('.id');
    var table = doc.getFirstValue('table');
    var text = doc.getFirstValue('teaser');

    return React.createElement(
      Card,
      { key: docId, style: { marginBottom: '5px' } },
      React.createElement(
        'div',
        { className: 'row', style: { width: '100%', margin: 0 } },
        React.createElement(
          'div',
          { className: 'col-sm-3 col-xs-4 col-md-3 col-lg-3', style: { padding: 0 } },
          React.createElement(DocumentType, { docType: table, position: this.props.position })
        ),
        React.createElement(
          'div',
          { className: 'col-sm-9 col-xs-8 col-md-9 col-lg-9' },
          React.createElement(SearchResultTitle, { doc: doc, baseUri: this.props.baseUri })
        )
      ),
      React.createElement(
        'div',
        { className: 'row', style: { width: '100%', margin: 0 } },
        React.createElement(
          'div',
          {
            className: 'col-sm-12 col-xs-12 col-md-12 col-lg-12',
            style: {
              padding: 0
            }
          },
          StringUtils.stripSimpleHtml(text)
        )
      )
    );
  };

  SearchResult.prototype.renderDebugResult = function renderDebugResult() {
    var _this3 = this;

    var doc = this.props.document;
    var docId = doc.getFirstValue('.id');
    var table = doc.getFirstValue(FieldNames.TABLE);
    var thumbnailUri = doc.getFirstValue('thumbnailImageUri');
    var score = parseFloat(doc.getFirstValue(FieldNames.SCORE));
    var scoreDescription = doc.getFirstValue(FieldNames.SCORE_EXPLAIN);
    var moreLikeThisQuery = doc.getFirstValue('morelikethisquery');
    var docTags = doc.getAllValues('tags');

    var fieldRows = [];
    var fieldNames = this.props.document.fields.keys();
    var finished = false;
    while (!finished) {
      var nextField = fieldNames.next();
      if (nextField.done) {
        finished = true;
      } else {
        var fieldName = nextField.value;
        var value = void 0;
        var values = this.props.document.getAllValues(fieldName);
        if (values && values.length > 1) {
          (function () {
            var index = 0;
            var valueRows = values.map(function (singleValue) {
              var singleValueContents = SearchResult.valueToDisplay(singleValue);
              index += 1;
              return React.createElement(
                'li',
                { key: JSON.stringify(singleValue) + '-' + index },
                singleValueContents
              );
            });
            value = React.createElement(
              'ul',
              null,
              valueRows
            );
          })();
        } else if (values && values.length === 1) {
          value = SearchResult.valueToDisplay(values[0]);
        } else {
          value = React.createElement(
            'span',
            { className: { fontStyle: 'italic' } },
            'No value'
          );
        }
        fieldRows.push(React.createElement(
          'dt',
          { key: fieldName },
          fieldName
        ));
        fieldRows.push(React.createElement(
          'dd',
          { key: fieldName + 'value' },
          value
        ));
      }
    }

    return React.createElement(
      'div',
      { className: ' attivio-search-result row' },
      React.createElement(
        'div',
        { className: 'col-xs-2 col-sm-2' },
        React.createElement(DocumentType, { docType: table, position: this.props.position }),
        React.createElement(DocumentThumbnail, { uri: thumbnailUri }),
        React.createElement(
          'dl',
          { className: 'attivio-labeldata-stacked attivio-labeldata-stacked-search-results' },
          this.props.showRatings ? React.createElement(
            'div',
            null,
            React.createElement(
              'dt',
              null,
              'User Rating'
            ),
            React.createElement(
              'dd',
              null,
              React.createElement(StarRating, { onRated: function onRated(rating) {
                  _this3.rateDocument(doc, rating);
                } })
            )
          ) : null,
          React.createElement(
            'dt',
            null,
            'Relevancy Score'
          ),
          React.createElement(
            'dd',
            null,
            React.createElement(RelevancyScore, { score: score, description: scoreDescription, id: docId })
          )
        )
      ),
      React.createElement(
        'div',
        { className: 'col-xs-8 col-sm-8' },
        React.createElement(SearchResultTitle, { doc: doc, baseUri: this.props.baseUri }),
        React.createElement(
          'dl',
          { className: 'attivio-labeldata-2col attivio-search-result-debugger' },
          fieldRows
        ),
        this.props.showTags ? React.createElement(SearchResultTags, { tags: docTags, moreLikeThisQuery: moreLikeThisQuery, vertical: true, docId: docId }) : null
      )
    );
  };

  SearchResult.prototype.render = function render() {
    switch (this.props.format) {
      case 'debug':
        return this.renderDebugResult();
      case 'usercard':
        return this.renderListResult();
      case 'doccard':
        return this.renderListResult();
      case 'simple':
        return this.renderSimpleResult();
      case 'list':
      default:
        return this.renderListResult();
    }
  };

  return SearchResult;
}(React.Component), _class.defaultProps = {
  baseUri: '',
  format: 'list',
  showScores: false,
  entityFields: new Map(),
  showTags: true,
  showRatings: true
}, _temp);
export { SearchResult as default };

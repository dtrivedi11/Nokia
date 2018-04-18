'use strict';

exports.__esModule = true;
exports.default = undefined;

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Row = require('react-bootstrap/lib/Row');

var _Row2 = _interopRequireDefault(_Row);

var _Col = require('react-bootstrap/lib/Col');

var _Col2 = _interopRequireDefault(_Col);

var _SearchDocument = require('../api/SearchDocument');

var _SearchDocument2 = _interopRequireDefault(_SearchDocument);

var _FieldNames = require('../api/FieldNames');

var _FieldNames2 = _interopRequireDefault(_FieldNames);

var _StringUtils = require('../util/StringUtils');

var _StringUtils2 = _interopRequireDefault(_StringUtils);

var _Card = require('./Card');

var _Card2 = _interopRequireDefault(_Card);

var _DocumentType = require('./DocumentType');

var _DocumentType2 = _interopRequireDefault(_DocumentType);

var _StarRating = require('./StarRating');

var _StarRating2 = _interopRequireDefault(_StarRating);

var _SearchResultTitle = require('./SearchResultTitle');

var _SearchResultTitle2 = _interopRequireDefault(_SearchResultTitle);

var _SearchResultBody = require('./SearchResultBody');

var _SearchResultBody2 = _interopRequireDefault(_SearchResultBody);

var _SearchResultTags = require('./SearchResultTags');

var _SearchResultTags2 = _interopRequireDefault(_SearchResultTags);

var _TabPanel = require('./TabPanel');

var _TabPanel2 = _interopRequireDefault(_TabPanel);

var _DocumentThumbnail = require('./DocumentThumbnail');

var _DocumentThumbnail2 = _interopRequireDefault(_DocumentThumbnail);

var _RelevancyScore = require('./RelevancyScore');

var _RelevancyScore2 = _interopRequireDefault(_RelevancyScore);

var _DocumentEntityList = require('./DocumentEntityList');

var _DocumentEntityList2 = _interopRequireDefault(_DocumentEntityList);

var _Signals = require('../api/Signals');

var _Signals2 = _interopRequireDefault(_Signals);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
      return _react2.default.createElement(
        'pre',
        null,
        json
      );
    }
    return _react2.default.createElement(
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
      new _Signals2.default(this.props.baseUri).addSignal(doc, 'like', rating);
    }
  };

  SearchResult.prototype.renderListResult = function renderListResult() {
    var _this2 = this;

    var doc = this.props.document;
    var docId = doc.getFirstValue('.id');
    var table = doc.getFirstValue('table');
    var thumbnailUri = doc.getFirstValue('thumbnailImageUri');
    var scoreString = doc.getFirstValue(_FieldNames2.default.SCORE);
    var score = scoreString ? parseFloat(scoreString) : 0;
    var scoreDescription = doc.getFirstValue(_FieldNames2.default.SCORE_EXPLAIN);
    var text = doc.getFirstValue('teaser');
    var moreLikeThisQuery = doc.getFirstValue('morelikethisquery');
    var docTags = doc.getAllValues('tags');

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
          return _react2.default.createElement(SearchResult, {
            document: tableDoc,
            key: tableDoc.getFirstValue('.id'),
            position: childPosition,
            baseUri: _this2.props.baseUri
          });
        });
        var docResultsList = _react2.default.createElement(
          'div',
          { className: 'attivio-nested-search-results' },
          docResults
        );
        tabInfos.push(new _TabPanel.TabInfo(label, tabTable, docResultsList));
      });
      var tabLabel = void 0;
      if (doc.children.length === 1) {
        tabLabel = 'One Child Record:';
      } else {
        tabLabel = doc.children.length + ' Child Records:';
      }
      nestedDocs = _react2.default.createElement(_TabPanel2.default, {
        tabInfos: tabInfos,
        activeTabId: this.state.currentTab,
        tabChanged: this.tabChanged,
        tabLabel: tabLabel,
        nested: true
      });
    }

    return _react2.default.createElement(
      'div',
      { className: ' attivio-search-result' },
      _react2.default.createElement(
        'div',
        { className: 'attivio-search-result-col' },
        _react2.default.createElement(_DocumentType2.default, { docType: table, position: this.props.position }),
        _react2.default.createElement(_DocumentThumbnail2.default, { uri: thumbnailUri }),
        _react2.default.createElement(
          'dl',
          { className: 'attivio-labeldata-stacked attivio-labeldata-stacked-search-results' },
          this.props.showRatings ? _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(
              'dt',
              null,
              'Rating'
            ),
            _react2.default.createElement(
              'dd',
              null,
              _react2.default.createElement(_StarRating2.default, { onRated: function onRated(rating) {
                  _this2.rateDocument(doc, rating);
                } })
            )
          ) : null,
          this.props.showScores ? _react2.default.createElement(
            'dt',
            null,
            'Relevancy Score'
          ) : '',
          this.props.showScores ? _react2.default.createElement(
            'dd',
            null,
            _react2.default.createElement(_RelevancyScore2.default, { score: score, explanation: scoreDescription, id: docId })
          ) : ''
        )
      ),
      _react2.default.createElement(
        'div',
        { className: 'attivio-search-result-content' },
        _react2.default.createElement(_SearchResultTitle2.default, { doc: doc, baseUri: this.props.baseUri }),
        _react2.default.createElement(
          _Row2.default,
          null,
          _react2.default.createElement(
            _Col2.default,
            { xs: 7, sm: 7 },
            _react2.default.createElement(_SearchResultBody2.default, { body: text }),
            this.props.showTags ? _react2.default.createElement(_SearchResultTags2.default, { tags: docTags, moreLikeThisQuery: moreLikeThisQuery, docId: docId }) : null
          ),
          _react2.default.createElement(
            _Col2.default,
            { xs: 5, sm: 5 },
            _react2.default.createElement(_DocumentEntityList2.default, { doc: doc, entityFields: this.props.entityFields })
          )
        )
      ),
      nestedDocs
    );
  };

  SearchResult.prototype.renderSimpleResult = function renderSimpleResult() {
    var doc = this.props.document;
    var docId = doc.getFirstValue('.id');
    var table = doc.getFirstValue('table');
    var text = doc.getFirstValue('teaser');

    return _react2.default.createElement(
      _Card2.default,
      { key: docId, style: { marginBottom: '5px' } },
      _react2.default.createElement(
        'div',
        { className: 'row', style: { width: '100%', margin: 0 } },
        _react2.default.createElement(
          'div',
          { className: 'col-sm-3 col-xs-4 col-md-3 col-lg-3', style: { padding: 0 } },
          _react2.default.createElement(_DocumentType2.default, { docType: table, position: this.props.position })
        ),
        _react2.default.createElement(
          'div',
          { className: 'col-sm-9 col-xs-8 col-md-9 col-lg-9' },
          _react2.default.createElement(_SearchResultTitle2.default, { doc: doc, baseUri: this.props.baseUri })
        )
      ),
      _react2.default.createElement(
        'div',
        { className: 'row', style: { width: '100%', margin: 0 } },
        _react2.default.createElement(
          'div',
          {
            className: 'col-sm-12 col-xs-12 col-md-12 col-lg-12',
            style: {
              padding: 0
            }
          },
          _StringUtils2.default.stripSimpleHtml(text)
        )
      )
    );
  };

  SearchResult.prototype.renderDebugResult = function renderDebugResult() {
    var _this3 = this;

    var doc = this.props.document;
    var docId = doc.getFirstValue('.id');
    var table = doc.getFirstValue(_FieldNames2.default.TABLE);
    var thumbnailUri = doc.getFirstValue('thumbnailImageUri');
    var score = parseFloat(doc.getFirstValue(_FieldNames2.default.SCORE));
    var scoreDescription = doc.getFirstValue(_FieldNames2.default.SCORE_EXPLAIN);
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
              return _react2.default.createElement(
                'li',
                { key: JSON.stringify(singleValue) + '-' + index },
                singleValueContents
              );
            });
            value = _react2.default.createElement(
              'ul',
              null,
              valueRows
            );
          })();
        } else if (values && values.length === 1) {
          value = SearchResult.valueToDisplay(values[0]);
        } else {
          value = _react2.default.createElement(
            'span',
            { className: { fontStyle: 'italic' } },
            'No value'
          );
        }
        fieldRows.push(_react2.default.createElement(
          'dt',
          { key: fieldName },
          fieldName
        ));
        fieldRows.push(_react2.default.createElement(
          'dd',
          { key: fieldName + 'value' },
          value
        ));
      }
    }

    return _react2.default.createElement(
      'div',
      { className: ' attivio-search-result row' },
      _react2.default.createElement(
        'div',
        { className: 'col-xs-2 col-sm-2' },
        _react2.default.createElement(_DocumentType2.default, { docType: table, position: this.props.position }),
        _react2.default.createElement(_DocumentThumbnail2.default, { uri: thumbnailUri }),
        _react2.default.createElement(
          'dl',
          { className: 'attivio-labeldata-stacked attivio-labeldata-stacked-search-results' },
          this.props.showRatings ? _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(
              'dt',
              null,
              'User Rating'
            ),
            _react2.default.createElement(
              'dd',
              null,
              _react2.default.createElement(_StarRating2.default, { onRated: function onRated(rating) {
                  _this3.rateDocument(doc, rating);
                } })
            )
          ) : null,
          _react2.default.createElement(
            'dt',
            null,
            'Relevancy Score'
          ),
          _react2.default.createElement(
            'dd',
            null,
            _react2.default.createElement(_RelevancyScore2.default, { score: score, description: scoreDescription, id: docId })
          )
        )
      ),
      _react2.default.createElement(
        'div',
        { className: 'col-xs-8 col-sm-8' },
        _react2.default.createElement(_SearchResultTitle2.default, { doc: doc, baseUri: this.props.baseUri }),
        _react2.default.createElement(
          'dl',
          { className: 'attivio-labeldata-2col attivio-search-result-debugger' },
          fieldRows
        ),
        this.props.showTags ? _react2.default.createElement(_SearchResultTags2.default, { tags: docTags, moreLikeThisQuery: moreLikeThisQuery, vertical: true, docId: docId }) : null
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
}(_react2.default.Component), _class.defaultProps = {
  baseUri: '',
  format: 'list',
  showScores: false,
  entityFields: new Map(),
  showTags: true,
  showRatings: true
}, _temp);
exports.default = SearchResult;
module.exports = exports['default'];
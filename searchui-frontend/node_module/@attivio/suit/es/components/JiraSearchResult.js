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
import Searcher from './Searcher';
import ProfilePhoto from './ProfilePhoto';
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
var JiraSearchResult = (_temp = _class = function (_React$Component) {
  _inherits(JiraSearchResult, _React$Component);

  JiraSearchResult.getFirstDocumentType = function getFirstDocumentType(list) {
    var result = '';
    if (list && list.length > 0) {
      result = list[0].getFirstValue('table');
    }
    return result;
  };

  JiraSearchResult.valueToDisplay = function valueToDisplay(value) {
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

  function JiraSearchResult(props) {
    _classCallCheck(this, JiraSearchResult);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.state = {
      currentTab: JiraSearchResult.getFirstDocumentType(props.document.children)
    };
    _this.tabChanged = _this.tabChanged.bind(_this);
    _this.rateDocument = _this.rateDocument.bind(_this);
    return _this;
  }

  JiraSearchResult.prototype.tabChanged = function tabChanged(newTab) {
    this.setState({
      currentTab: newTab
    });
  };

  JiraSearchResult.prototype.rateDocument = function rateDocument(doc, rating) {
    if (doc.signal) {
      new Signals(this.props.baseUri).addSignal(doc, 'like', rating);
    }
  };

  JiraSearchResult.prototype.handleDocumentClick = function handleDocumentClick(doc, SearchDocument) {
   if (this.titleLink) {
     this.titleLink.blur();
   }
   if (doc.signal) {
        console.log('inside if>>>>>>>>');
     new Signals(doc.baseUri).addSignal(doc);
   }
   var uri = doc.getFirstValue('url');
   console.log('Clicked URL: '+uri);
   window.open(uri, '_blank');
 };

  JiraSearchResult.prototype.renderListResult = function renderListResult() {
    var _this2 = this;

    var doc = this.props.document;
    var docId = doc.getFirstValue('.id');
    var table = doc.getFirstValue('table');
    var thumbnailUri = doc.getFirstValue('thumbnailImageUri');
    var scoreString = doc.getFirstValue(FieldNames.SCORE);
    var score = scoreString ? parseFloat(scoreString) : 0;
    var scoreDescription = doc.getFirstValue(FieldNames.SCORE_EXPLAIN);
    var text = doc.getFirstValue('teaser');

    var docTags = doc.getAllValues('tags');



      var title = 'ID : ' + doc.getFirstValue('id') + ' - ' + doc.getFirstValue('issuesummary'); //doc.getFirstValue('title');
      var text = doc.getFirstValue('teaser');
      var issuedescription = doc.getFirstValue('issuedescription');


      var issuepriority = doc.getFirstValue('issuepriority');
      var issuestatus = doc.getFirstValue('issuestatus');
      var issuecreator = doc.getFirstValue('issuecreator');
      var issueauthor = doc.getFirstValue('author');

      var projectname = doc.getFirstValue('projectname');
      var projecturl = doc.getFirstValue('projecturl');
      var projectlead = doc.getFirstValue('projectlead');

      var moreLikeThisQuery = doc.getFirstValue('morelikethisquery') == '' ? 'Notihng here' : doc.getFirstValue('morelikethisquery');

      var divStyle1 = {
        background: "#eee",
        padding: "20px",
        display: 'inline-block',
        float: 'left'
      };

      var divStyle2 = {
        margin: "20px"
      };

      var moreLikeThisComponent = moreLikeThisQuery.length > 0 ? React.createElement(
        'a',
        {
          className: 'attivio-tags-more',
          role: 'button',
          tabIndex: 0
        },
        'More like this'
      ) : '';



      return React.createElement(
        Card,
        { key: docId, style: { marginBottom: '5px' } },
        React.createElement(
          'div',
          { className: 'row', style: { width: '100%', margin: 0 } },
          React.createElement(
            'div',
            { className: 'col-sm-3 col-xs-2 col-md-1 col-lg-1', style: { padding: 0 } },
            React.createElement(DocumentType, { docType: table, position: this.props.position })
          ),
          React.createElement(
            'div',
            { className: 'col-sm-9 col-xs-8 col-md-11 col-lg-11' },
           React.createElement(SearchResultTitle, { title: title, onClick: function onClick() {
                _this2.handleDocumentClick(doc);
              } })

          )
        ),
        React.createElement(
          'div',
          { className: 'row' },
          React.createElement(
            'div',
            { className: 'col', style: divStyle2 },
            React.createElement(
              'b',
              null,
              'Summary '
            ),
            ' : ',
            StringUtils.stripSimpleHtml(text)
          ),
          React.createElement(
            'div',
            { className: 'col', style: divStyle2 },
            React.createElement(
              'b',
              null,
              'Description '
            ),
            ' : ',
            StringUtils.stripSimpleHtml(issuedescription)
          )
        ),
        React.createElement(
          'div',
          { className: 'row', style: { width: '100%', margin: 5 } },
          React.createElement(
            'div',
            { className: 'col-sm-3 col-xs-2 col-md-4 col-lg-4' },
            React.createElement(
              'b',
              null,
              '  Priority : '
            ),
            issuepriority
          ),
          React.createElement(
            'div',
            { className: 'col-sm-3 col-xs-2 col-md-2 col-lg-2' },
            React.createElement(
              'b',
              null,
              '  Status  : '
            ),
            issuestatus
          )
        ),
        React.createElement(
          'div',
          { className: 'row', style: { width: '100%', margin: 5 } },
          React.createElement(
            'div',
            { className: 'col-sm-3 col-xs-2 col-md-4 col-lg-4' },
            React.createElement(
              'b',
              null,
              '  Creator  : '
            ),
            issuecreator
          ),
          React.createElement(
            'div',
            { className: 'col-sm-3 col-xs-2 col-md-6 col-lg-6' },
            React.createElement(
              'b',
              null,
              '  Author  : '
            ),
            issueauthor
          )
        ),
        React.createElement(
          'div',
          { className: 'row', style: { width: '100%', margin: 5 } },
          React.createElement(
            'div',
            { className: 'col-sm-3 col-xs-2 col-md-4 col-lg-4' },
            React.createElement(
              'b',
              null,
              '  Project : '
            ),
            ' ',
            React.createElement(
              'a',
              { onClick: function onClick() {
                  _this2.handleProjectClick(doc);
                } },
              ' ',
              projectname,
              ' '
            )
          ),
          React.createElement(
            'div',
            { className: 'col-sm-3 col-xs-2 col-md-6 col-lg-6' },
            React.createElement(
              'b',
              null,
              '  Project Lead  : '
            ),
            projectlead
          )
        ),
        React.createElement(
          'div',
          { className: 'row', style: { width: '100%', margin: 5 } },
          React.createElement(
            'a',
            { onClick: function onClick() {
                _this2.moreLikeThis(doc);
              } },
            ' More like this '
          )
        )
      );




  };

  JiraSearchResult.prototype.render = function render() {
    switch (this.props.format) {
      case 'debug':
        return this.renderListResult();
      case 'usercard':
        return this.renderListResult();
      case 'doccard':
        return this.renderListResult();
      case 'simple':
        return this.renderListResult();
      case 'list':
      default:
        return this.renderListResult();
    }
  };

  return JiraSearchResult;
}(React.Component), _class.defaultProps = {
  baseUri: '',
  format: 'list',
  showScores: false,
  entityFields: new Map(),
  showTags: true,
  showRatings: true
}, _temp);
export { JiraSearchResult as default };

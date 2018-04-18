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
var PeopleSearchResult = (_temp = _class = function (_React$Component) {
  _inherits(PeopleSearchResult, _React$Component);

  PeopleSearchResult.getFirstDocumentType = function getFirstDocumentType(list) {
    var result = '';
    if (list && list.length > 0) {
      result = list[0].getFirstValue('table');
    }
    return result;
  };

  PeopleSearchResult.valueToDisplay = function valueToDisplay(value) {
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

  function PeopleSearchResult(props) {
    _classCallCheck(this, PeopleSearchResult);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.state = {
      currentTab: PeopleSearchResult.getFirstDocumentType(props.document.children)
    };
    _this.tabChanged = _this.tabChanged.bind(_this);
    _this.rateDocument = _this.rateDocument.bind(_this);
    return _this;
  }

  PeopleSearchResult.prototype.tabChanged = function tabChanged(newTab) {
    this.setState({
      currentTab: newTab
    });
  };

  PeopleSearchResult.prototype.rateDocument = function rateDocument(doc, rating) {
    if (doc.signal) {
      new Signals(this.props.baseUri).addSignal(doc, 'like', rating);
    }
  };
  PeopleSearchResult.prototype.decodeHTML = function decodeHTML(encodedString) {
    var textArea = document.createElement('textarea');
      textArea.innerHTML = encodedString;
      return textArea.innerText;
  };
  /* PeopleSearchResult.prototype.handleDocumentClick = function handleDocumentClick() {
    if (this.titleLink) {
      this.titleLink.blur();
    }

    if (this.props.doc.signal) {

      new Signals(this.props.baseUri).addSignal(this.props.doc);
    }
    var uri = this.props.doc.getFirstValue(FieldNames.URI);
    window.open(uri, '_blank');
  };*/
  PeopleSearchResult.prototype.handleDocumentClick = function handleDocumentClick(doc, SearchDocument) {
   if (this.titleLink) {
     this.titleLink.blur();
   }
   if (doc.signal) {
     new Signals(doc.baseUri).addSignal(doc);
   }
   var uri = doc.getFirstValue('url');
   window.open(uri, '_blank');
 };
  PeopleSearchResult.prototype.renderListResult = function renderListResult() {
        var _this2 = this;
        var doc = this.props.document;
        var docId = doc.getFirstValue('.id');
        var table = 'PEOPLE';//doc.getFirstValue('table');
        var title = doc.getFirstValue('displayname');
        var text = doc.getFirstValue('teaser');
        var thumbnailUri = 'img/personX.png' //doc.getFirstValue('thumbnailImageUri');

        var people_name = doc.getFirstValue('name');
        var people_displayname = doc.getFirstValue('displayname');
        var people_mailnickname = doc.getFirstValue('mailnickname');
        var people_mail = doc.getFirstValue('mail');
        var people_description = doc.getFirstValue('description');
        var people_givenname = doc.getFirstValue('givenname');
        var people_employeeid = doc.getFirstValue('employeeid');
        var people_employeetype = doc.getFirstValue('employeetype');
        var people_streetaddress = doc.getFirstValue('streetaddress');
        var people_title = this.decodeHTML(doc.getFirstValue('title'));
          var div = document.createElement('div');
          div.innerHTML = people_title;
          var new_title = div.innerText;
        var people_department = doc.getFirstValue('department');
        var people_division = doc.getFirstValue('division');
        var people_company = doc.getFirstValue('company');
        var people_organization = doc.getFirstValue('organization');
        var people_manager = doc.getFirstValue('manager');
        var people_mobile = doc.getFirstValue('mobile');
        var people_telephonenumber = doc.getFirstValue('telephonenumber');

        var xxpeople_manager = doc.getFirstValue('manager');

        var people_manager_arr = people_manager.split(",");
        var people_manager_ext = people_manager_arr[0].split("=")[1];


    /*
    var _this2 = this;

    var doc = this.props.document;
    var docId = doc.getFirstValue('.id');
    var table = doc.getFirstValue('table');
    var thumbnailUri = doc.getFirstValue('thumbnailImageUri');
    var scoreString = doc.getFirstValue(FieldNames.SCORE);
    var score = scoreString ? parseFloat(scoreString) : 0;
    var scoreDescription = doc.getFirstValue(FieldNames.SCORE_EXPLAIN);
    var text = doc.getFirstValue('teaser');
    var moreLikeThisQuery = doc.getFirstValue('morelikethisquery');
    var docTags = doc.getAllValues('tags');
    var people_company = doc.getFirstValue('company');





      var title = doc.getFirstValue('displayname');
      var text = doc.getFirstValue('teaser');
      var thumbnailUri = 'img/personX.png';//doc.getFirstValue('thumbnailImageUri');

      var people_name = doc.getFirstValue('name');
      var people_displayname = doc.getFirstValue('displayname');
      var people_mailnickname = doc.getFirstValue('mailnickname');
      var people_mail = doc.getFirstValue('mail');
      var people_description = doc.getFirstValue('description');
      var people_givenname = doc.getFirstValue('givenname');
      var people_employeeid = doc.getFirstValue('employeeid');
      var people_employeetype = doc.getFirstValue('employeetype');
      var people_streetaddress = doc.getFirstValue('streetaddress');
      var people_title = this.decodeHTML(doc.getFirstValue('title'));
      var people_title = doc.getFirstValue('title');
      var people_department = doc.getFirstValue('department');
      var people_division = doc.getFirstValue('division');
      var people_company = doc.getFirstValue('company');
      var people_organization = doc.getFirstValue('organization');

      var people_mobile = doc.getFirstValue('mobile');
      var people_telephonenumber = doc.getFirstValue('telephonenumber');

      var xxpeople_manager = doc.getFirstValue('manager');
      var people_manager = doc.getFirstValue('manager');
      var people_manager_arr = people_manager.split(",");
      var people_manager_ext = people_manager_arr[0].split("=")[1];*/

      /*var title_new = document.createElement("div");
      title_new.innerHTML = people_title;
      var new_title = title_new.innerText;*/

      var divStyle1 = {
        background: "#eee",
        //padding: "20px",
        margin: "20px",
        display: 'inline-block',
        float: 'left'
      };

      var divStyle2 = {
        //padding: "20px",
        margin: "20px"
        //width: "80%",
        //float: 'right'
      };





    return React.createElement(
        Card,
        { key: docId, style: { marginBottom: '5px' } },
        React.createElement(
          'div',
          { className: 'row', style: { width: '100%', margin: 0 } },
          React.createElement(
            'div',
            { className: 'col-sm-3 col-xs-4 col-md-2 col-lg-2', style: { padding: 0 } },
            React.createElement(DocumentType, { docType: table, position: this.props.position })
          ),
          React.createElement(
            'div',
            { className: 'col-sm-9 col-xs-8 col-md-9 col-lg-9' },
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
            { className: 'col-sm-2 col-xs-2 col-md-2 col-lg-2', style: divStyle1 },
            React.createElement(ProfilePhoto, { url: thumbnailUri, style: { float: 'left', display: 'inline' } })
          ),
          React.createElement(
            'div',
            { className: 'col-sm-9 col-xs-9 col-md-9 col-lg-9', style: divStyle2 },
            React.createElement(
              'div',
              { className: 'row', style: { width: '100%', margin: 5 } },
              React.createElement(
                'div',
                { className: 'col-sm-3 col-xs-5 col-md-10 col-lg-10' },
                React.createElement(
                  'b',
                  null,
                  '  Title  : '
                ),

                new_title
              ),
              React.createElement(
                'div',
                { className: 'col-sm-3 col-xs-5 col-md-10 col-lg-10' },
                React.createElement(
                  'b',
                  null,
                  '  Manager  : '
                ),
                people_manager_ext
              )
            ),
            React.createElement(
              'div',
              { className: 'row', style: { width: '100%', margin: 5 } },
              React.createElement(
                'div',
                { className: 'col-sm-3 col-xs-2 col-md-5 col-lg-5' },
                React.createElement(
                  'b',
                  null,
                  '  ID  : '
                ),
                people_employeeid
              ),
              React.createElement(
                'div',
                { className: 'col-sm-3 col-xs-2 col-md-5 col-lg-5' },
                React.createElement(
                  'b',
                  null,
                  '  Mail  : '
                ),
                people_mail
              )
            ),
            React.createElement(
              'div',
              { className: 'row', style: { width: '100%', margin: 5 } },
              React.createElement(
                'div',
                { className: 'col-sm-3 col-xs-2 col-md-5 col-lg-5' },
                React.createElement(
                  'b',
                  null,
                  '  Telephone  : '
                ),
                people_telephonenumber
              ),
              React.createElement(
                'div',
                { className: 'col-sm-3 col-xs-2 col-md-5 col-lg-5' },
                React.createElement(
                  'b',
                  null,
                  '  Mobile  : '
                ),
                people_mobile
              )
            ),
            React.createElement(
              'div',
              { className: 'row', style: { width: '100%', margin: 5 } },
              React.createElement(
                'div',
                { className: 'col-sm-3 col-xs-2 col-md-5 col-lg-5' },
                React.createElement(
                  'b',
                  null,
                  '  Department  : '
                ),
                people_department
              ),
              React.createElement(
                'div',
                { className: 'col-sm-3 col-xs-2 col-md-5 col-lg-5' },
               React.createElement(
                  'b',
                  null,
                  '  Division  : '
                ),
                people_division
              )
            ),
            React.createElement(
              'div',
              { className: 'row', style: { width: '100%', margin: 5 } },
              React.createElement(
                'div',
                { className: 'col-sm-3 col-xs-2 col-md-5 col-lg-5' },
                React.createElement(
                  'b',
                  null,
                  '  Company  : '
                ),
                people_company
              )
            )
          )
        )
      );




  };

  PeopleSearchResult.prototype.render = function render() {
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

  return PeopleSearchResult;
}(React.Component), _class.defaultProps = {
  baseUri: '',
  format: 'list',
  showScores: false,
  entityFields: new Map(),
  showTags: true,
  showRatings: true
}, _temp);
export { PeopleSearchResult as default };

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
//import moreLikeThis from './MoreLikeThis';

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
var ProductSearchResult = (_temp = _class = function (_React$Component) {
  _inherits(ProductSearchResult, _React$Component);

  ProductSearchResult.getFirstDocumentType = function getFirstDocumentType(list) {
    var result = '';
    if (list && list.length > 0) {
      result = list[0].getFirstValue('table');
    }
    return result;
  };

  ProductSearchResult.valueToDisplay = function valueToDisplay(value) {
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

  function ProductSearchResult(props) {
    _classCallCheck(this, ProductSearchResult);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.state = {
      currentTab: ProductSearchResult.getFirstDocumentType(props.document.children)
    };
    _this.tabChanged = _this.tabChanged.bind(_this);
    _this.rateDocument = _this.rateDocument.bind(_this);
    return _this;
  }

  ProductSearchResult.prototype.tabChanged = function tabChanged(newTab) {
    this.setState({
      currentTab: newTab
    });
  };

  ProductSearchResult.prototype.rateDocument = function rateDocument(doc, rating) {
    if (doc.signal) {
      new Signals(this.props.baseUri).addSignal(doc, 'like', rating);
    }
  };

  ProductSearchResult.prototype.renderListResult = function renderListResult() {
    var _this2 = this;

      var doc = this.props.document;
      var docId = doc.getFirstValue('.id');
      var table = 'Product'; //doc.getFirstValue('table');
      var title = doc.getFirstValue('obj.name'); //doc.getFirstValue('title');
      var thumbnailUri = doc.getFirstValue('thumbnailImageUri');

      var type = doc.getFirstValue('type');
      var code_ = doc.getFirstValue('code');
      var organization = doc.getFirstValue('organisation');
      var objectName = doc.getFirstValue('obj.name');
      var classification = doc.getFirstValue('cat');
      var state = doc.getFirstValue('state');
      var projectLead = doc.getFirstValue('product.management.responsible');
      var ownerGroup = doc.getFirstValue('owner.group');
      var partner = doc.getFirstValue('partner');
      var businessUnit = doc.getFirstValue('business.unit');
      var businessLine = doc.getFirstValue('business.line');
      var alias = doc.getFirstValue('alias.name');
      var category = doc.getFirstValue('category');

      // const projectname = doc.getFirstValue('projectname');
      // const projecturl = doc.getFirstValue('projecturl');
      // const projectlead=doc.getFirstValue('projectlead');

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
          { className: 'row', style: { width: '100%', margin: 5 } },
          React.createElement(
            'div',
            { className: 'col-sm-3 col-xs-2 col-md-4 col-lg-4' },
            React.createElement(
              'b',
              null,
              '  Organization  : '
            ),
            organization
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
              '  Type  : '
            ),
            type
          ),
          React.createElement(
            'div',
            { className: 'col-sm-3 col-xs-2 col-md-6 col-lg-6' },
            React.createElement(
              'b',
              null,
              '  Code  : '
            ),
            code_
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
              '  Responsible Manager: '
            ),
            ' ',
            React.createElement(
              'a',
              { onClick: function onClick() {
                  _this2.handleProjectLeadClick(doc);
                } },
              ' ',
              projectLead,
              ' '
            )
          ),
          React.createElement(
            'div',
            { className: 'col-sm-3 col-xs-2 col-md-6 col-lg-6' },
            React.createElement(
              'b',
              null,
              '  Owner Group  : '
            ),
            ownerGroup
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
              '  Business Unit  : '
            ),
            businessUnit
          ),
          React.createElement(
            'div',
            { className: 'col-sm-3 col-xs-2 col-md-6 col-lg-6' },
            React.createElement(
              'b',
              null,
              '  Business Line  : '
            ),
            businessLine
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
              '  State  : '
            ),
            state
          ),
          React.createElement(
            'div',
            { className: 'col-sm-3 col-xs-2 col-md-6 col-lg-6' },
            React.createElement(
              'b',
              null,
              '  Partner  : '
            ),
            partner
          )
        )
      );


   

  };

  ProductSearchResult.prototype.render = function render() {
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

  return ProductSearchResult;
}(React.Component), _class.defaultProps = {
  baseUri: '',
  format: 'list',
  showScores: false,
  entityFields: new Map(),
  showTags: true,
  showRatings: true
}, _temp);
export { ProductSearchResult as default };
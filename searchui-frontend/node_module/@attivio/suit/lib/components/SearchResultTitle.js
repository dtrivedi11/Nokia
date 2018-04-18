'use strict';

exports.__esModule = true;
exports.default = undefined;

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _FieldNames = require('../api/FieldNames');

var _FieldNames2 = _interopRequireDefault(_FieldNames);

var _Signals = require('../api/Signals');

var _Signals2 = _interopRequireDefault(_Signals);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * The title of a given document in the search results. Any HTML markup in
 * the title is preserved so that highlighting, entities, and sentiment can
 * be displayed. It can optionally be made clickable, by passing a callback.
 */
var SearchResultTitle = (_temp = _class = function (_React$Component) {
  _inherits(SearchResultTitle, _React$Component);

  function SearchResultTitle(props) {
    _classCallCheck(this, SearchResultTitle);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.handleDocumentClick = _this.handleDocumentClick.bind(_this);
    return _this;
  }

  SearchResultTitle.prototype.handleDocumentClick = function handleDocumentClick() {
    if (this.titleLink) {
      this.titleLink.blur();
    }
    if (this.props.doc.signal) {
      new _Signals2.default(this.props.baseUri).addSignal(this.props.doc);
    }
    var uri = this.props.doc.getFirstValue(_FieldNames2.default.URI);
    window.open(uri, '_blank');
  };

  SearchResultTitle.prototype.render = function render() {
    var _this2 = this;

    var title = this.props.doc.getFirstValue(_FieldNames2.default.TITLE);
    if (!title) {
      title = '<span className="none">This document has no title</span>';
    }
    var uri = this.props.doc.getFirstValue(_FieldNames2.default.URI);
    var titleComp = void 0;

    if (uri) {
      titleComp = _react2.default.createElement('a', {
        onClick: this.handleDocumentClick,
        role: 'button',
        tabIndex: 0,
        dangerouslySetInnerHTML: { __html: title } // eslint-disable-line react/no-danger
        , ref: function ref(c) {
          _this2.titleLink = c;
        }
      });
    } else {
      titleComp = _react2.default.createElement('span', { dangerouslySetInnerHTML: { __html: title } }); // eslint-disable-line react/no-danger
    }

    return _react2.default.createElement(
      'h2',
      { className: 'attivio-search-result-title' },
      titleComp
    );
  };

  return SearchResultTitle;
}(_react2.default.Component), _class.defaultProps = {
  baseUri: ''
}, _temp);
exports.default = SearchResultTitle;
module.exports = exports['default'];
'use strict';

exports.__esModule = true;

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRouterDom = require('react-router-dom');

var _queryString = require('query-string');

var _queryString2 = _interopRequireDefault(_queryString);

var _Glyphicon = require('react-bootstrap/lib/Glyphicon');

var _Glyphicon2 = _interopRequireDefault(_Glyphicon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Show the tags for a document from the search results. Optionaly
 * shows a link to view similar documents if the moreLikeThisQuery
 * property is set. If the vertical prop is set, then they're rendered
 * in a single column as opposed to in a horizontal row. Also allows
 * the user to add additional tags by clicking the Add button.
 */
var SearchResultTags = (_temp = _class = function (_React$Component) {
  _inherits(SearchResultTags, _React$Component);

  // eslint-disable-line max-len
  function SearchResultTags(props) {
    _classCallCheck(this, SearchResultTags);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.state = {
      adding: false,
      newTag: '',
      tags: [].concat(props.tags),
      tagError: null,
      updating: false
    };
    _this.updateTags = _this.updateTags.bind(_this);
    _this.removeTag = _this.removeTag.bind(_this);
    _this.addTag = _this.addTag.bind(_this);
    _this.updateNewTag = _this.updateNewTag.bind(_this);
    _this.keyUp = _this.keyUp.bind(_this);
    _this.moreLikeThis = _this.moreLikeThis.bind(_this);
    _this.show360View = _this.show360View.bind(_this);
    return _this;
  }

  SearchResultTags.prototype.updateTags = function updateTags(tags) {
    var _this2 = this;

    if (this.context.searcher) {
      this.setState({
        updating: true
      }, function () {
        _this2.context.searcher.updateTags(tags, _this2.props.docId).then(function () {
          _this2.setState({
            tags: tags,
            newTag: '',
            adding: false,
            tagError: null,
            updating: false
          });
        }).catch(function (error) {
          _this2.setState({
            newTag: '',
            adding: false,
            tagError: error.toString(),
            updating: false
          });
        });
      });
    }
  };

  SearchResultTags.prototype.removeTag = function removeTag(tagName) {
    var tags = this.state.tags.slice();
    var index = tags.indexOf(tagName);
    if (index >= 0) {
      tags.splice(index, 1);
      this.updateTags(tags);
    }
  };

  SearchResultTags.prototype.addTag = function addTag() {
    var tagName = this.state.newTag;
    if (tagName && tagName.length > 0) {
      var _tags = this.state.tags.slice();
      _tags.push(tagName);
      this.updateTags(_tags);
    }
  };

  SearchResultTags.prototype.updateNewTag = function updateNewTag(event) {
    if (event.target instanceof HTMLInputElement) {
      this.setState({
        newTag: event.target.value
      });
    }
  };

  SearchResultTags.prototype.keyUp = function keyUp(event) {
    if (event.target instanceof HTMLInputElement) {
      if (event.key === 'Enter') {
        // If the user presses enter, then add the new tag
        this.addTag();
      } else if (event.key === 'Escape') {
        // Otherwise, if the press escape, to back to showing the Add… link instead of the input field
        this.setState({
          newTag: '',
          adding: false
        });
      }
    }
  };

  SearchResultTags.prototype.moreLikeThis = function moreLikeThis() {
    if (this.context.searcher) {
      this.context.searcher.performQueryImmediately(this.props.moreLikeThisQuery, true);
    }
  };

  SearchResultTags.prototype.show360View = function show360View() {
    var escapedDocId = encodeURIComponent(this.props.docId);
    var path = '/doc360';
    var search = _queryString2.default.parse(this.props.location.search);
    search.docId = escapedDocId;
    this.props.history.push({ pathname: path, search: '' + _queryString2.default.stringify(search) });
  };

  SearchResultTags.prototype.render = function render() {
    var _this3 = this;

    var outerDivClassName = 'attivio-tags ' + (this.props.vertical ? 'attivio-tags-vertical' : '');
    var moreLikeThisComponent = this.props.moreLikeThisQuery.length > 0 ? _react2.default.createElement(
      'a',
      {
        className: 'attivio-tags-more',
        onClick: this.moreLikeThis,
        role: 'button',
        tabIndex: 0
      },
      'More like this'
    ) : '';
    var tagList = void 0;
    if (this.state.tags.length > 0) {
      tagList = this.state.tags.map(function (tag) {
        return _react2.default.createElement(
          'span',
          { key: tag },
          _react2.default.createElement(
            'a',
            {
              className: 'attivio-tags-link',
              onClick: function onClick() {
                _this3.removeTag(tag);
              },
              role: 'button',
              tabIndex: 0
            },
            tag,
            ' ',
            _react2.default.createElement('span', { className: 'attivio-icon-remove' })
          ),
          ' '
        );
      });
    } else {
      tagList = _react2.default.createElement(
        'span',
        { className: 'attivio-tags-link none' },
        'None'
      );
    }

    var addButtonText = this.state.updating ? 'Adding\u2026' : 'Add';
    var extra = this.state.adding ? _react2.default.createElement(
      'div',
      { className: 'form-inline attivio-tags-form' },
      _react2.default.createElement(
        'div',
        { className: 'form-group' },
        _react2.default.createElement(
          'label',
          { htmlFor: 'attivio-tags-more-add', className: 'sr-only' },
          'Tag'
        ),
        _react2.default.createElement('input', {
          type: 'email',
          className: 'form-control',
          id: 'attivio-tags-more-add',
          placeholder: 'Tag\u2026',
          value: this.state.newTag,
          onChange: this.updateNewTag,
          onKeyUp: this.keyUp,
          ref: function ref(comp) {
            _this3.inputField = comp;
          }
        })
      ),
      _react2.default.createElement(
        'button',
        {
          type: 'submit',
          className: 'btn btn-primary btn-xs',
          onClick: this.addTag,
          disabled: this.state.newTag.length === 0 || this.state.updating
        },
        addButtonText
      )
    ) : _react2.default.createElement(
      'a',
      {
        className: 'attivio-tags-link',
        onClick: function onClick() {
          _this3.setState({
            adding: true
          }, function () {
            if (_this3.inputField) {
              _this3.inputField.focus();
            }
          });
        },
        role: 'button',
        tabIndex: 0
      },
      'Add\u2026'
    );

    var show360Component = this.props.view360Label ? _react2.default.createElement(
      'a',
      {
        className: 'attivio-tags-more',
        onClick: this.show360View,
        role: 'button',
        tabIndex: 0
      },
      this.props.view360Label
    ) : '';

    var tagError = this.state.tagError ? _react2.default.createElement(
      'span',
      { title: this.state.tagError },
      _react2.default.createElement(_Glyphicon2.default, { glyph: 'exclamation-sign', style: { color: '#d9534f', marginRight: '4px' } })
    ) : '';

    return _react2.default.createElement(
      'div',
      { className: outerDivClassName },
      show360Component,
      moreLikeThisComponent,
      _react2.default.createElement(
        'span',
        { className: 'attivio-tags-label' },
        'Tags:'
      ),
      tagError,
      tagList,
      extra
    );
  };

  return SearchResultTags;
}(_react2.default.Component), _class.contextTypes = {
  searcher: _propTypes2.default.any
}, _class.defaultProps = {
  moreLikeThisQuery: '',
  vertical: false,
  view360Label: 'Show 360\xB0 View'
}, _temp);
exports.default = (0, _reactRouterDom.withRouter)(SearchResultTags);
module.exports = exports['default'];
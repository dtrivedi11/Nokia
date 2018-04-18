'use strict';

exports.__esModule = true;

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRouterDom = require('react-router-dom');

var _Dropdown = require('react-bootstrap/lib/Dropdown');

var _Dropdown2 = _interopRequireDefault(_Dropdown);

var _Glyphicon = require('react-bootstrap/lib/Glyphicon');

var _Glyphicon2 = _interopRequireDefault(_Glyphicon);

var _MenuItem = require('react-bootstrap/lib/MenuItem');

var _MenuItem2 = _interopRequireDefault(_MenuItem);

var _Configurable = require('./Configurable');

var _Configurable2 = _interopRequireDefault(_Configurable);

var _AutoCompleteInput = require('./AutoCompleteInput');

var _AutoCompleteInput2 = _interopRequireDefault(_AutoCompleteInput);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Component to include in the Masthead for entering the query
 * to use when searching. Must be inside a Searcher component.
 */
// Prevent complaints about this not existing

var SearchBar = (_temp = _class = function (_React$Component) {
  _inherits(SearchBar, _React$Component);

  function SearchBar(props) {
    _classCallCheck(this, SearchBar);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.state = {
      query: '',
      recognizing: false,
      suggestions: []

    };
    _this.doKeyPress = _this.doKeyPress.bind(_this);
    _this.doSearch = _this.doSearch.bind(_this);
    _this.startSpeechRecognition = _this.startSpeechRecognition.bind(_this);
    _this.queryChanged = _this.queryChanged.bind(_this);
    _this.updateQuery = _this.updateQuery.bind(_this);
    _this.languageChanged = _this.languageChanged.bind(_this);
    if (_this.props.allowVoice && !('webkitSpeechRecognition' in window)) {
      console.log('Requested speech recognition but the browser doesn’t support it'); // eslint-disable-line no-console
    }
    return _this;
  }

  SearchBar.prototype.getSuggestionList = function getSuggestionList() {
    if (!this.state.suggestions || this.state.suggestions.length === 0) {
      return null;
    }
    var contents = this.state.suggestions.map(function (suggestion) {
      return _react2.default.createElement(
        _MenuItem2.default,
        { key: suggestion },
        suggestion
      );
    });
    return _react2.default.createElement(
      'ul',
      { className: 'list-unstyled', role: 'menu' },
      contents
    );
  };

  SearchBar.prototype.startSpeechRecognition = function startSpeechRecognition() {
    var _this2 = this;

    var recognition = new webkitSpeechRecognition(); // eslint-disable-line new-cap,no-undef
    recognition.continuous = true;
    recognition.interrimResults = true;
    // recognition.lang = 'en';

    recognition.onresult = function (e) {
      recognition.stop();
      var newQuery = e.results[0][0].transcript;
      if (e.results[0].isFinal) {
        var searcher = _this2.context.searcher;
        if (searcher) {
          searcher.performQueryImmediately(newQuery);
        }
      }
      _this2.setState({
        recognizing: false
      });
    };

    recognition.onerror = function () {
      recognition.stop();
      _this2.setState({
        recognizing: false
      });
    };

    recognition.start();
    this.setState({
      recognizing: true
    });
  };

  SearchBar.prototype.languageChanged = function languageChanged(newLanguage) {
    var searcher = this.context.searcher;
    if (searcher && newLanguage) {
      searcher.updateQueryLanguage(newLanguage);
    }
  };

  SearchBar.prototype.updateQuery = function updateQuery(newQuery) {
    var doSearch = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    // Update the searcher
    var searcher = this.context.searcher;
    if (searcher) {
      if (doSearch) {
        searcher.performQueryImmediately(newQuery);
        this.route();
      } else {
        searcher.updateQuery(newQuery);
      }
    }
    this.forceUpdate();
  };

  SearchBar.prototype.queryChanged = function queryChanged(e) {
    if (e.target instanceof HTMLInputElement) {
      var newQuery = e.target.value;
      this.updateQuery(newQuery);
    }
  };

  SearchBar.prototype.route = function route() {
    var searcher = this.context.searcher;
    if (this.props.route && searcher) {
      // We need to do this to ensure the Searcher's state survives the navigation
      var searchString = searcher.generateLocationQueryStringFromState(searcher.state);
      this.props.history.push({
        pathname: this.props.route,
        search: searchString
      });
    }
  };

  SearchBar.prototype.doSearch = function doSearch() {
    var searcher = this.context.searcher;
    if (this.props.route && searcher) {
      this.route();
    } else {
      searcher.doSearch();
    }
    if (this.submitButton) {
      this.submitButton.blur();
    }
  };

  SearchBar.prototype.doKeyPress = function doKeyPress(e) {
    // If the user presses enter, do the search
    if (e.target instanceof HTMLInputElement) {
      if (e.keyCode === 13) {
        this.doSearch();
      }
    }
  };

  SearchBar.prototype.render = function render() {
    var _this3 = this;

    var showMicrophone = this.props.allowVoice && 'webkitSpeechRecognition' in window;
    var micStyle = {};
    if (this.state.recognizing) {
      micStyle.backgroundSize = '125%';
    }

    var containerClass = this.props.inMasthead ? 'attivio-globalmast-search-container' : '';
    var inputClass = this.props.inMasthead ? 'form-control attivio-globalmast-search-input' : 'form-control';

    var query = '';
    var language = 'simple';
    var searcher = this.context.searcher;
    if (searcher) {
      query = searcher.state.query;
      language = searcher.state.queryLanguage;
    }

    var simpleMenuItem = _react2.default.createElement(
      _MenuItem2.default,
      {
        onSelect: function onSelect() {
          _this3.languageChanged('simple');
          if (_this3.simpleMenuItem) {
            _this3.simpleMenuItem.blur();
          }
        }
      },
      _react2.default.createElement(
        'span',
        { ref: function ref(c) {
            _this3.simpleMenuItem = c;
          } },
        _react2.default.createElement(
          'span',
          { style: { visibility: language === 'simple' ? 'visible' : 'hidden' } },
          '\u2713'
        ),
        ' ',
        'Simple'
      )
    );
    var advancedMenuItem = _react2.default.createElement(
      _MenuItem2.default,
      {
        onSelect: function onSelect() {
          _this3.languageChanged('advanced');
          if (_this3.advancedMenuItem) {
            _this3.advancedMenuItem.blur();
          }
        }
      },
      _react2.default.createElement(
        'span',
        { ref: function ref(c) {
            _this3.advancedMenuItem = c;
          } },
        _react2.default.createElement(
          'span',
          { style: { visibility: language === 'advanced' ? 'visible' : 'hidden' } },
          '\u2713'
        ),
        ' ',
        'Advanced'
      )
    );

    var languageControl = this.props.allowLanguageSelect ? _react2.default.createElement(
      _Dropdown2.default,
      {
        id: 'myDropdown',
        className: '',
        onSelect: this.languageChanged,
        componentClass: 'div',
        style: { display: 'inline-block' }
      },
      _react2.default.createElement(
        _Dropdown2.default.Toggle,
        {
          noCaret: true,
          useAnchor: true,
          className: 'attivio-smalltoolbar-btn',
          bsClass: 'attivio-smalltoolbar-btn',
          title: 'Query Language',
          style: {
            position: 'relative',
            top: '1px',
            left: '-2px',
            color: '#fff',
            border: 'none',
            background: 'transparent'
          }
        },
        _react2.default.createElement(_Glyphicon2.default, { glyph: 'search', style: { color: 'white' } }),
        ' ',
        _react2.default.createElement('span', { className: 'attivio-globalmast-icon attivio-icon-arrow-down-blue' })
      ),
      _react2.default.createElement(
        _Dropdown2.default.Menu,
        {
          style: {
            paddingTop: 0,
            paddingBottom: 0
          }
        },
        simpleMenuItem,
        advancedMenuItem
      )
    ) : '';

    var placeholder = this.props.placeholder;
    if (this.props.allowLanguageSelect && language === 'advanced') {
      placeholder = this.props.placeholderAdvanced;
    }

    var suggestionList = this.getSuggestionList();
    var inputComponent = this.props.autoCompleteUri ? _react2.default.createElement(_AutoCompleteInput2.default, {
      uri: '' + this.props.baseUri + this.props.autoCompleteUri,
      updateValue: this.updateQuery,
      placeholder: placeholder || '',
      value: query,
      className: inputClass,
      style: { minWidth: '500px' }
    }) : _react2.default.createElement('input', {
      type: 'search',
      className: inputClass,
      placeholder: placeholder,
      onChange: this.queryChanged,
      onKeyDown: this.doKeyPress,
      value: query,
      style: { minWidth: '500px' }
    });

    return _react2.default.createElement(
      'div',
      { className: containerClass },
      _react2.default.createElement(
        'div',
        { className: 'attivio-globalmast-search', role: 'search', style: { display: 'inline-block' } },
        _react2.default.createElement(
          'div',
          { className: 'form-group' },
          inputComponent,
          showMicrophone ? _react2.default.createElement(
            'a',
            { onClick: this.startSpeechRecognition, role: 'button', tabIndex: 0 },
            _react2.default.createElement('span', { className: 'attivio-globalmast-search-mic-icon attivio-icon-microphone', style: micStyle })
          ) : '',
          _react2.default.createElement(
            'button',
            {
              type: 'submit',
              className: 'btn attivio-globalmast-search-submit',
              onClick: this.doSearch,
              ref: function ref(c) {
                _this3.submitButton = c;
              }
            },
            this.props.buttonLabel
          )
        ),
        suggestionList
      ),
      languageControl
    );
  };

  return SearchBar;
}(_react2.default.Component), _class.contextTypes = {
  searcher: _propTypes2.default.any
}, _class.defaultProps = {
  inMasthead: false,
  placeholder: 'Search\u2026',
  placeholderAdvanced: 'Enter an advanced query\u2026',
  buttonLabel: 'Go',
  allowLanguageSelect: true,
  allowVoice: true,
  autoCompleteUri: null,
  route: null,
  baseUri: ''
}, _class.AUTOCOMPLETE_THRESHOLD = 2, _temp);
exports.default = (0, _reactRouterDom.withRouter)((0, _Configurable2.default)(SearchBar));
module.exports = exports['default'];
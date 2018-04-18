'use strict';

exports.__esModule = true;
exports.default = undefined;

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _Menu = require('./Menu');

var _Menu2 = _interopRequireDefault(_Menu);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * A pop-up for choosing how many search results should be
 * on each page. It works with the parent Searcher component to
 * update its property and to show the current value.
 */
var SearchRelevancyModel = (_temp = _class = function (_React$Component) {
  _inherits(SearchRelevancyModel, _React$Component);

  // eslint-disable-line max-len
  function SearchRelevancyModel(props) {
    _classCallCheck(this, SearchRelevancyModel);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.state = {
      models: _this.props.models,
      loading: _this.props.models.length === 0,
      errorMessage: null
    };
    _this.onSelect = _this.onSelect.bind(_this);
    return _this;
  }

  SearchRelevancyModel.prototype.componentWillMount = function componentWillMount() {
    var _this2 = this;

    // If our parent didn't set a list of models for us
    // to use, ask the server what we should do.
    var uri = this.props.baseUri + '/rest/relevancyModelApi/getRelevancyModelNames';
    if (!this.state.models || this.state.models.length === 0) {
      _axios2.default.get(uri).then(function (response) {
        if (response && response.data && response.data.length > 0) {
          // If there's just a single relevancy model, tell the searcher to use it
          if (response.data.length === 1) {
            var searcher = _this2.context.searcher;
            if (searcher) {
              searcher.updateRelevancyModels([_this2.state.models[0]]);
            }
          }
          // Save the models
          _this2.setState({
            models: response.data,
            loading: false,
            errorMessage: null
          });
        } else {
          _this2.setState({
            models: [],
            loading: false,
            errorMessage: null
          });
        }
      }).catch(function (error) {
        var errorMessage = 'Unknown';
        if (error) {
          if (error.message) {
            errorMessage = error.message;
          } else if (error.response) {
            if (error.response.status && error.response.statusText) {
              errorMessage = error.response.status + ': ' + error.response.statusText;
            } else if (error.response.statusText) {
              errorMessage = error.response.statusText;
            } else if (error.response.status) {
              errorMessage = 'Error code: ' + error.response.status;
            }
          }
        }
        _this2.setState({
          models: [],
          loading: false,
          errorMessage: errorMessage
        });
      });
    } else if (this.state.models && this.state.models.length === 1) {
      // If there's just a single relevancy model, tell the searcher to use it
      var searcher = this.context.searcher;
      if (searcher) {
        searcher.updateRelevancyModels([this.state.models[0]]);
      }
    }
  };

  SearchRelevancyModel.prototype.onSelect = function onSelect(item) {
    var newValue = item.value;
    var searcher = this.context.searcher;
    if (searcher) {
      searcher.updateRelevancyModels([newValue]);
    }
  };

  SearchRelevancyModel.prototype.render = function render() {
    var menu = void 0;
    if (this.state.loading) {
      var loadingMenuItem = new _Menu.MenuItemDef('Loading\u2026', 'loading');
      loadingMenuItem.disabled = true;
      menu = _react2.default.createElement(_Menu2.default, {
        label: 'Relevancy Model:',
        selection: 'loading',
        items: [loadingMenuItem],
        onSelect: function onSelect() {},
        right: true
      });
    } else if (this.state.errorMessage) {
      var errorMenuItem = new _Menu.MenuItemDef('Error', 'error');
      errorMenuItem.disabled = true;
      var errorDescriptionMenuItem = new _Menu.MenuItemDef(this.state.errorMessage, 'errorDescription');
      errorDescriptionMenuItem.disabled = true;
      menu = _react2.default.createElement(_Menu2.default, {
        label: 'Relevancy Model:',
        selection: 'error',
        items: [errorMenuItem, errorDescriptionMenuItem],
        onSelect: function onSelect() {},
        right: true
      });
    } else if (this.state.models.length <= 1) {
      // If there is only one model or if there are no models, then we don't show the list.
      // In the case of a single model, the searcher will always use that one.
      menu = '';
    } else {
      // Normal case with models provided either by the parent or the back-end
      var currentModel = void 0;
      var searcher = this.context.searcher;
      if (searcher && searcher.state.relevancyModels && searcher.state.relevancyModels.length > 0) {
        currentModel = searcher.state.relevancyModels[0];
      }
      if (!currentModel) {
        currentModel = 'default'; // If the searcher has none set, use default
      }
      var modelNames = this.state.models.slice();
      if (!modelNames.includes(currentModel)) {
        modelNames.unshift(currentModel);
      }
      var items = modelNames.map(function (modelName) {
        return new _Menu.MenuItemDef(modelName, modelName);
      });
      menu = _react2.default.createElement(_Menu2.default, {
        label: 'Relevancy Model:',
        selection: currentModel,
        items: items,
        onSelect: this.onSelect,
        right: true
      });
    }
    var leftRight = this.props.right ? 'attivio-globalmastnavbar-right' : '';
    return _react2.default.createElement(
      'div',
      { className: leftRight },
      menu
    );
  };

  return SearchRelevancyModel;
}(_react2.default.Component), _class.defaultProps = {
  models: [],
  right: false,
  baseUri: ''
}, _class.contextTypes = {
  searcher: _propTypes2.default.any
}, _temp);
exports.default = SearchRelevancyModel;
module.exports = exports['default'];
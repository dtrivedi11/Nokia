'use strict';

exports.__esModule = true;
exports.default = exports.DataPairInfo = undefined;

var _class2, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DataPairInfo =
/**
 * The type of the value which, if present, is used to add
 * an indicator for well-known categories.
 */
exports.DataPairInfo = function DataPairInfo(label, value) {
  var type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

  _classCallCheck(this, DataPairInfo);

  this.label = label;
  this.value = value;
  this.type = type;
}
/** The value for the pair. */

/** The label shown describing the value. */
;

/**
* Display a list of name/value pairs, with optional category type indicators
* in a side-by-side, two-column list format.
*/
var DataPairs = (_temp = _class2 = function (_React$Component) {
  _inherits(DataPairs, _React$Component);

  function DataPairs(props) {
    _classCallCheck(this, DataPairs);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.showAll = _this.showAll.bind(_this);
    _this.state = {
      showingAll: false
    };
    return _this;
  }

  DataPairs.prototype.showAll = function showAll() {
    if (this.showAllLink) {
      this.showAllLink.blur();
    }
    this.setState({ showingAll: true });
  };

  DataPairs.prototype.render = function render() {
    var _this2 = this;

    var rows = [];
    var haveTruncated = false;
    this.props.pairs.forEach(function (pair) {
      var value = pair.value;
      if (!_this2.state.showingAll && pair.value.length > DataPairs.MAX_CHARACTERS) {
        haveTruncated = true;
        value = pair.value.substr(0, 100) + '\u2026';
      }

      if (pair.type && pair.type !== '') {
        // Have a real type, use that class name
        var className = 'attivio-labeldata-2col-search-results-entity attivio-labeldata-2col-search-results-' + pair.type;
        rows.push(_react2.default.createElement(
          'dt',
          { className: className, key: pair.label + '-label' },
          pair.label
        ));
      } else {
        // Simple label
        rows.push(_react2.default.createElement(
          'dt',
          { key: pair.label + '-label' },
          pair.label
        ));
      }
      rows.push(_react2.default.createElement(
        'dd',
        { key: pair.label + '-value' },
        value
      ));
    });
    if (!this.state.showingAll && haveTruncated) {
      // Add the show all link...
      rows.push(_react2.default.createElement('dt', { key: 'allData-label' }));
      rows.push(_react2.default.createElement(
        'dd',
        { key: 'allData-value' },
        _react2.default.createElement(
          'a',
          {
            className: 'attivio-labeldata-2col-search-results-more',
            onClick: this.showAll,
            role: 'button',
            tabIndex: 0,
            ref: function ref(c) {
              _this2.showAllLink = c;
            }
          },
          'All data\u2026'
        )
      ));
    }

    return _react2.default.createElement(
      'dl',
      { className: 'attivio-labeldata-2col attivio-labeldata-2col-search-results' },
      rows
    );
  };

  return DataPairs;
}(_react2.default.Component), _class2.MAX_CHARACTERS = 100, _temp);
exports.default = DataPairs;


DataPairs.DataPairInfo = DataPairInfo;
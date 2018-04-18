'use strict';

exports.__esModule = true;
exports.default = undefined;

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _PlacementResult = require('./PlacementResult');

var _PlacementResult2 = _interopRequireDefault(_PlacementResult);

var _Placement = require('../api/Placement');

var _Placement2 = _interopRequireDefault(_Placement);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * A container for showing a list of business center promotional placements from the search results.
 * These come from the parent Searcher component.
 */
var PlacementResults = (_temp = _class = function (_React$Component) {
  _inherits(PlacementResults, _React$Component);

  function PlacementResults() {
    _classCallCheck(this, PlacementResults);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  PlacementResults.prototype.renderResults = function renderResults() {
    var searcher = this.context.searcher;
    var response = searcher.state.response;
    if (response && response.placements && response.documents.length > 0) {
      var placements = response.placements;
      var results = [];
      placements.forEach(function (placement) {
        results.push(_react2.default.createElement(_PlacementResult2.default, {
          linkUrl: placement.linkUrl,
          linkText: placement.linkText,
          imageUrl: placement.imageUrl,
          markup: placement.markup
        }));
      });
      return results;
    }
    return null;
  };

  PlacementResults.prototype.render = function render() {
    var style = {
      listStyle: 'none',
      paddingLeft: 0
    };

    return _react2.default.createElement(
      'ul',
      { style: style },
      this.renderResults()
    );
  };

  return PlacementResults;
}(_react2.default.Component), _class.contextTypes = {
  searcher: _propTypes2.default.any
}, _temp);
exports.default = PlacementResults;
module.exports = exports['default'];
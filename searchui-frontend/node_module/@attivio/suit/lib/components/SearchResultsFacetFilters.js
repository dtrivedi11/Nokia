'use strict';

exports.__esModule = true;
exports.default = undefined;

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _NavbarFilter = require('./NavbarFilter');

var _NavbarFilter2 = _interopRequireDefault(_NavbarFilter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SearchResultsFacetFilters = (_temp = _class = function (_React$Component) {
  _inherits(SearchResultsFacetFilters, _React$Component);

  function SearchResultsFacetFilters() {
    _classCallCheck(this, SearchResultsFacetFilters);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  SearchResultsFacetFilters.getNavbarFilter = function getNavbarFilter(key, name, label, remove) {
    return _react2.default.createElement(_NavbarFilter2.default, {
      key: key,
      facetName: name,
      bucketLabel: label,
      removeCallback: remove
    });
  };

  SearchResultsFacetFilters.prototype.render = function render() {
    var _this2 = this;

    var filters = this.context.searcher.state.facetFilters;
    var filterComps = filters.map(function (filter) {
      var key = filter.facetName + '-' + filter.bucketLabel;
      return SearchResultsFacetFilters.getNavbarFilter(key, filter.facetName, filter.bucketLabel, function () {
        _this2.context.searcher.removeFacetFilter(filter);
      });
    });
    var geoFilters = this.context.searcher.state.geoFilters;
    var geoFilterComps = geoFilters.map(function (filter) {
      return SearchResultsFacetFilters.getNavbarFilter(filter, 'Position', 'Polygon Filter', function () {
        _this2.context.searcher.removeGeoFilter(filter);
      });
    });
    return _react2.default.createElement(
      'div',
      { style: { display: 'inline-block' } },
      geoFilterComps,
      filterComps
    );
  };

  return SearchResultsFacetFilters;
}(_react2.default.Component), _class.contextTypes = {
  searcher: _propTypes2.default.any
}, _temp);
exports.default = SearchResultsFacetFilters;
module.exports = exports['default'];
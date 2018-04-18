'use strict';

exports.__esModule = true;
exports.default = undefined;

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _SearchFacet = require('../api/SearchFacet');

var _SearchFacet2 = _interopRequireDefault(_SearchFacet);

var _SearchFacetBucket = require('../api/SearchFacetBucket');

var _SearchFacetBucket2 = _interopRequireDefault(_SearchFacetBucket);

var _DateUtils = require('../util/DateUtils');

var _DateUtils2 = _interopRequireDefault(_DateUtils);

var _DateFormat = require('../util/DateFormat');

var _DateFormat2 = _interopRequireDefault(_DateFormat);

var _Card = require('./Card');

var _Card2 = _interopRequireDefault(_Card);

var _CollapsiblePanel = require('./CollapsiblePanel');

var _CollapsiblePanel2 = _interopRequireDefault(_CollapsiblePanel);

var _BarChartFacetContents = require('./BarChartFacetContents');

var _BarChartFacetContents2 = _interopRequireDefault(_BarChartFacetContents);

var _PieChartFacetContents = require('./PieChartFacetContents');

var _PieChartFacetContents2 = _interopRequireDefault(_PieChartFacetContents);

var _MoreListFacetContents = require('./MoreListFacetContents');

var _MoreListFacetContents2 = _interopRequireDefault(_MoreListFacetContents);

var _ListWithBarsFacetContents = require('./ListWithBarsFacetContents');

var _ListWithBarsFacetContents2 = _interopRequireDefault(_ListWithBarsFacetContents);

var _TagCloudFacetContents = require('./TagCloudFacetContents');

var _TagCloudFacetContents2 = _interopRequireDefault(_TagCloudFacetContents);

var _TimeSeriesFacetContents = require('./TimeSeriesFacetContents');

var _TimeSeriesFacetContents2 = _interopRequireDefault(_TimeSeriesFacetContents);

var _SentimentFacetContents = require('./SentimentFacetContents');

var _SentimentFacetContents2 = _interopRequireDefault(_SentimentFacetContents);

var _MapFacetContents = require('./MapFacetContents');

var _MapFacetContents2 = _interopRequireDefault(_MapFacetContents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Display a single facet from the search results.
 */
var Facet = (_temp = _class = function (_React$Component) {
  _inherits(Facet, _React$Component);

  function Facet(props) {
    _classCallCheck(this, Facet);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.addFacetFilter = _this.addFacetFilter.bind(_this);
    _this.addTimeSeriesFilter = _this.addTimeSeriesFilter.bind(_this);
    return _this;
  }

  Facet.prototype.addFacetFilter = function addFacetFilter(bucket, customBucketLabel) {
    var bucketLabel = customBucketLabel || bucket.displayLabel();
    this.context.searcher.addFacetFilter(this.props.facet.findLabel(), bucketLabel, bucket.filter);
  };

  /**
   * Create a facet filter for the starting and ending dates...
   * If start is set but end is not, filters on the specific time
   * set by start, otherwises filters on the range. (If start is not
   * set, this simply returns).
   */


  Facet.prototype.addTimeSeriesFilter = function addTimeSeriesFilter(start, end) {
    if (start !== null) {
      var facetFilterString = void 0;
      var labelString = void 0;

      var startFacetFilterString = _DateUtils2.default.formatDate(start, _DateFormat2.default.ATTIVIO);
      var startLabelString = _DateUtils2.default.formatDate(start, _DateFormat2.default.MEDIUM);
      if (end !== null) {
        var endFacetFilterString = _DateUtils2.default.formatDate(end, _DateFormat2.default.ATTIVIO);
        var endLabelString = _DateUtils2.default.formatDate(end, _DateFormat2.default.MEDIUM);
        labelString = startLabelString + ' to ' + endLabelString;

        facetFilterString = this.props.facet.name + ':FACET(RANGE("' + startFacetFilterString + '", "' + endFacetFilterString + '", upper=inclusive))'; // eslint-disable-line max-len
      } else {
        labelString = startLabelString;
        facetFilterString = this.props.facet.name + ':FACET(RANGE("' + startFacetFilterString + '", ' + startFacetFilterString + ', upper=inclusive))'; // eslint-disable-line max-len
      }
      this.context.searcher.addFacetFilter(this.props.facet.findLabel(), labelString, facetFilterString);
    }
  };

  Facet.prototype.render = function render() {
    var facetColors = this.props.entityColors;
    var facetColor = facetColors.has(this.props.facet.field) ? facetColors.get(this.props.facet.field) : null;

    var facetContents = void 0;
    if (this.props.facet.buckets && this.props.facet.buckets.length > 0) {
      switch (this.props.type) {
        case 'barchart':
          facetContents = facetColor ? _react2.default.createElement(_BarChartFacetContents2.default, {
            buckets: this.props.facet.buckets,
            addFacetFilter: this.addFacetFilter,
            color: facetColor
          }) : _react2.default.createElement(_BarChartFacetContents2.default, {
            buckets: this.props.facet.buckets,
            addFacetFilter: this.addFacetFilter
          });
          break;
        case 'columnchart':
          facetContents = facetColor ? _react2.default.createElement(_BarChartFacetContents2.default, {
            buckets: this.props.facet.buckets,
            addFacetFilter: this.addFacetFilter,
            columns: true,
            color: facetColor
          }) : _react2.default.createElement(_BarChartFacetContents2.default, {
            buckets: this.props.facet.buckets,
            addFacetFilter: this.addFacetFilter,
            columns: true
          });
          break;
        case 'piechart':
          facetContents = _react2.default.createElement(_PieChartFacetContents2.default, {
            buckets: this.props.facet.buckets,
            addFacetFilter: this.addFacetFilter,
            entityColors: this.props.entityColors
          });
          break;
        case 'barlist':
          facetContents = facetColor ? _react2.default.createElement(_ListWithBarsFacetContents2.default, {
            buckets: this.props.facet.buckets,
            addFacetFilter: this.addFacetFilter,
            color: facetColor
          }) : _react2.default.createElement(_ListWithBarsFacetContents2.default, {
            buckets: this.props.facet.buckets,
            addFacetFilter: this.addFacetFilter
          });
          break;
        case 'tagcloud':
          facetContents = _react2.default.createElement(_TagCloudFacetContents2.default, {
            buckets: this.props.facet.buckets,
            maxBuckets: this.props.maxBuckets,
            addFacetFilter: this.addFacetFilter
          });
          break;
        case 'timeseries':
          facetContents = _react2.default.createElement(_TimeSeriesFacetContents2.default, { buckets: this.props.facet.buckets, addFacetFilter: this.addTimeSeriesFilter });
          break;
        case 'sentiment':
          facetContents = _react2.default.createElement(_SentimentFacetContents2.default, { buckets: this.props.facet.buckets, addFacetFilter: this.addFacetFilter });
          break;
        case 'geomap':
          facetContents = _react2.default.createElement(_MapFacetContents2.default, { buckets: this.props.facet.buckets, addFacetFilter: this.addFacetFilter });
          break;
        case 'list':
        default:
          facetContents = _react2.default.createElement(_MoreListFacetContents2.default, { buckets: this.props.facet.buckets, addFacetFilter: this.addFacetFilter });
          break;
      }
    } else {
      facetContents = _react2.default.createElement(
        'span',
        { className: 'none' },
        'No values for this facet.'
      );
    }

    // Prefer the display name but fall back to the name field (note special case for geomaps
    // where we always use the label "Map").
    var label = this.props.type === 'geomap' ? 'Map' : this.props.facet.findLabel();

    if (this.props.collapse) {
      var collapsed = this.props.facet.buckets.length === 0;
      return _react2.default.createElement(
        _CollapsiblePanel2.default,
        { title: label, id: 'facet-' + this.props.facet.field, collapsed: collapsed },
        facetContents
      );
    }
    return _react2.default.createElement(
      _Card2.default,
      { title: label, borderless: !this.props.bordered, className: 'attivio-facet' },
      facetContents
    );
  };

  return Facet;
}(_react2.default.Component), _class.defaultProps = {
  type: 'list',
  maxBuckets: 15,
  collapse: false,
  bordered: false,
  entityColors: new Map()
}, _class.contextTypes = {
  searcher: _propTypes2.default.any
}, _temp);
exports.default = Facet;
module.exports = exports['default'];
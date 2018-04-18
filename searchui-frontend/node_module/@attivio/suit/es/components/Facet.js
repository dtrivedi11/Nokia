var _class, _temp;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import PropTypes from 'prop-types';

import SearchFacet from '../api/SearchFacet';
import SearchFacetBucket from '../api/SearchFacetBucket';
import DateUtils from '../util/DateUtils';
import DateFormat from '../util/DateFormat';
import Card from './Card';
import CollapsiblePanel from './CollapsiblePanel';
import BarChartFacetContents from './BarChartFacetContents';
import PieChartFacetContents from './PieChartFacetContents';
import MoreListFacetContents from './MoreListFacetContents';
import ListWithBarsFacetContents from './ListWithBarsFacetContents';
import TagCloudFacetContents from './TagCloudFacetContents';
import TimeSeriesFacetContents from './TimeSeriesFacetContents';
import SentimentFacetContents from './SentimentFacetContents';
import MapFacetContents from './MapFacetContents';

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

      var startFacetFilterString = DateUtils.formatDate(start, DateFormat.ATTIVIO);
      var startLabelString = DateUtils.formatDate(start, DateFormat.MEDIUM);
      if (end !== null) {
        var endFacetFilterString = DateUtils.formatDate(end, DateFormat.ATTIVIO);
        var endLabelString = DateUtils.formatDate(end, DateFormat.MEDIUM);
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
          facetContents = facetColor ? React.createElement(BarChartFacetContents, {
            buckets: this.props.facet.buckets,
            addFacetFilter: this.addFacetFilter,
            color: facetColor
          }) : React.createElement(BarChartFacetContents, {
            buckets: this.props.facet.buckets,
            addFacetFilter: this.addFacetFilter
          });
          break;
        case 'columnchart':
          facetContents = facetColor ? React.createElement(BarChartFacetContents, {
            buckets: this.props.facet.buckets,
            addFacetFilter: this.addFacetFilter,
            columns: true,
            color: facetColor
          }) : React.createElement(BarChartFacetContents, {
            buckets: this.props.facet.buckets,
            addFacetFilter: this.addFacetFilter,
            columns: true
          });
          break;
        case 'piechart':
          facetContents = React.createElement(PieChartFacetContents, {
            buckets: this.props.facet.buckets,
            addFacetFilter: this.addFacetFilter,
            entityColors: this.props.entityColors
          });
          break;
        case 'barlist':
          facetContents = facetColor ? React.createElement(ListWithBarsFacetContents, {
            buckets: this.props.facet.buckets,
            addFacetFilter: this.addFacetFilter,
            color: facetColor
          }) : React.createElement(ListWithBarsFacetContents, {
            buckets: this.props.facet.buckets,
            addFacetFilter: this.addFacetFilter
          });
          break;
        case 'tagcloud':
          facetContents = React.createElement(TagCloudFacetContents, {
            buckets: this.props.facet.buckets,
            maxBuckets: this.props.maxBuckets,
            addFacetFilter: this.addFacetFilter
          });
          break;
        case 'timeseries':
          facetContents = React.createElement(TimeSeriesFacetContents, { buckets: this.props.facet.buckets, addFacetFilter: this.addTimeSeriesFilter });
          break;
        case 'sentiment':
          facetContents = React.createElement(SentimentFacetContents, { buckets: this.props.facet.buckets, addFacetFilter: this.addFacetFilter });
          break;
        case 'geomap':
          facetContents = React.createElement(MapFacetContents, { buckets: this.props.facet.buckets, addFacetFilter: this.addFacetFilter });
          break;
        case 'list':
        default:
          facetContents = React.createElement(MoreListFacetContents, { buckets: this.props.facet.buckets, addFacetFilter: this.addFacetFilter });
          break;
      }
    } else {
      facetContents = React.createElement(
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
      return React.createElement(
        CollapsiblePanel,
        { title: label, id: 'facet-' + this.props.facet.field, collapsed: collapsed },
        facetContents
      );
    }
    return React.createElement(
      Card,
      { title: label, borderless: !this.props.bordered, className: 'attivio-facet' },
      facetContents
    );
  };

  return Facet;
}(React.Component), _class.defaultProps = {
  type: 'list',
  maxBuckets: 15,
  collapse: false,
  bordered: false,
  entityColors: new Map()
}, _class.contextTypes = {
  searcher: PropTypes.any
}, _temp);
export { Facet as default };
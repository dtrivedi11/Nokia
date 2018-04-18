var _class, _temp;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import PropTypes from 'prop-types';

import Facet from './Facet';

import SearchFacet from '../api/SearchFacet';
import ObjectUtils from '../util/ObjectUtils';

/**
 * A container for showing facet results from a search.
 * It must be contained within a Searcher component and
 * will obtain the list of facets from there. Via properties,
 * you can specify how to display specific facets. Any facet
 * not coveed by one of these property's lists will be displayed
 * in a standard "More…" list.
 */
var FacetInsights = (_temp = _class = function (_React$Component) {
  _inherits(FacetInsights, _React$Component);

  function FacetInsights() {
    _classCallCheck(this, FacetInsights);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  FacetInsights.matchesFacetList = function matchesFacetList(field, facetList) {
    if (facetList) {
      if (typeof facetList === 'string') {
        return facetList === field;
      }
      return facetList.includes(field);
    }
    return false;
  };

  FacetInsights.prototype.componentDidMount = function componentDidMount() {
    // If the user hasn't yet done a search, do a search for
    // "*:*" so there will be something to display here. If the
    // user has already searched, show things based on the current
    // search results.
    var searcher = this.context.searcher;
    if (searcher && !searcher.state.haveSearched) {
      searcher.doSearch();
    }
  };

  FacetInsights.prototype.getFacetDisplayType = function getFacetDisplayType(field) {
    if (FacetInsights.matchesFacetList(field, this.props.pieChartFacets)) {
      return 'piechart';
    }
    if (FacetInsights.matchesFacetList(field, this.props.barChartFacets)) {
      return 'barchart';
    }
    if (FacetInsights.matchesFacetList(field, this.props.columnChartFacets)) {
      return 'columnchart';
    }
    if (FacetInsights.matchesFacetList(field, this.props.barListFacets)) {
      return 'barlist';
    }
    if (FacetInsights.matchesFacetList(field, this.props.tagCloudFacets)) {
      return 'tagcloud';
    }
    if (FacetInsights.matchesFacetList(field, this.props.timeSeriesFacets)) {
      return 'timeseries';
    }
    if (FacetInsights.matchesFacetList(field, this.props.sentimentFacets)) {
      return 'sentiment';
    }
    if (FacetInsights.matchesFacetList(field, this.props.geoMapFacets)) {
      return 'geomap';
    }
    return 'list';
  };

  FacetInsights.prototype.facetForField = function facetForField(fieldName, facetMap) {
    var result = void 0;
    var facet = facetMap.get(fieldName);
    if (facet) {
      var displayType = this.getFacetDisplayType(fieldName);
      result = React.createElement(Facet, {
        facet: facet,
        key: fieldName,
        maxBuckets: this.props.maxFacetBuckets,
        type: displayType,
        bordered: true,
        entityColors: this.props.entityColors
      });
    } else {
      result = null;
    }
    return result;
  };

  FacetInsights.prototype.render = function render() {
    var _this2 = this;

    var searcher = this.context.searcher;
    var facets = searcher.state.response ? searcher.state.response.facets.slice() : [];

    var facetMap = new Map();
    facets.forEach(function (facet) {
      facetMap.set(facet.field, facet);
    });

    facets.sort(function (f1, f2) {
      var label1 = f1.findLabel();
      var label2 = f2.findLabel();
      return label1.localeCompare(label2);
    });

    var facetOrder = facets.map(function (facet) {
      return facet.field;
    });

    // Remove special "first" facets...
    ObjectUtils.removeItem(facetOrder, 'table');
    ObjectUtils.removeItem(facetOrder, 'keyphrases');
    ObjectUtils.removeItem(facetOrder, 'date');

    var additionalFacets = facetOrder.map(function (facetField) {
      var facet = facetMap.get(facetField);
      if (facet) {
        return React.createElement(
          'div',
          { key: facetField, style: { flex: 1 } },
          _this2.facetForField(facetField, facetMap)
        );
      }
      return null;
    });
    return React.createElement(
      'div',
      { className: 'facet-insights' },
      React.createElement(
        'div',
        {
          style: {
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            gridGap: '20px',
            gridAutoRows: 'minmax(200px, auto)'
          }
        },
        React.createElement(
          'div',
          { style: { gridRow: 'span 2' } },
          this.facetForField('table', facetMap)
        ),
        React.createElement(
          'div',
          null,
          this.facetForField('keyphrases', facetMap)
        ),
        React.createElement(
          'div',
          { style: { gridColumn: 'span 3' } },
          this.facetForField('date', facetMap)
        ),
        additionalFacets
      )
    );
  };

  return FacetInsights;
}(React.Component), _class.defaultProps = {
  pieChartFacets: null,
  barChartFacets: null,
  columnChartFacets: null,
  barListFacets: null,
  tagCloudFacets: null,
  timeSeriesFacets: null,
  sentimentFacets: null,
  geoMapFacets: null,
  maxFacetBuckets: 15,
  entityColors: new Map()
}, _class.contextTypes = {
  searcher: PropTypes.any
}, _temp);
export { FacetInsights as default };
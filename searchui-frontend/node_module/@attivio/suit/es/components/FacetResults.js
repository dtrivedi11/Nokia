var _class, _temp;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import PropTypes from 'prop-types';

import Facet from './Facet';
import SearchFacet from '../api/SearchFacet';

/**
 * A container for showing facet results from a search.
 * It must be contained within a Searcher component and
 * will obtain the list of facets from there. Via properties,
 * you can specify how to display specific facets. Any facet
 * not coveed by one of these property's lists will be displayed
 * in a standard "More…" list.
 */
var FacetResults = (_temp = _class = function (_React$Component) {
  _inherits(FacetResults, _React$Component);

  function FacetResults() {
    _classCallCheck(this, FacetResults);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  FacetResults.matchesFacetList = function matchesFacetList(field, facetList) {
    if (facetList) {
      if (typeof facetList === 'string') {
        return facetList === field;
      }
      return facetList.includes(field);
    }
    return false;
  };

  FacetResults.prototype.getFacetDisplayType = function getFacetDisplayType(field) {
    if (FacetResults.matchesFacetList(field, this.props.pieChartFacets)) {
      return 'piechart';
    }
    if (FacetResults.matchesFacetList(field, this.props.barChartFacets)) {
      return 'barchart';
    }
    if (FacetResults.matchesFacetList(field, this.props.columnChartFacets)) {
      return 'columnchart';
    }
    if (FacetResults.matchesFacetList(field, this.props.barListFacets)) {
      return 'barlist';
    }
    if (FacetResults.matchesFacetList(field, this.props.tagCloudFacets)) {
      return 'tagcloud';
    }
    if (FacetResults.matchesFacetList(field, this.props.timeSeriesFacets)) {
      return 'timeseries';
    }
    if (FacetResults.matchesFacetList(field, this.props.sentimentFacets)) {
      return 'sentiment';
    }
    if (FacetResults.matchesFacetList(field, this.props.geoMapFacets)) {
      return 'geomap';
    }

    return 'list';
  };

  FacetResults.prototype.renderFacets = function renderFacets() {
    var _this2 = this;

    var searcher = this.context.searcher;
    var facets = searcher.state.response ? searcher.state.response.facets : null;
    if (facets && facets.length > 0) {
      var facetsMap = new Map();
      facets.forEach(function (facet) {
        facetsMap.set(facet.name, facet);
      });
      var results = [];
      this.props.orderHint.forEach(function (facetName) {
        var facet = facetsMap.get(facetName);
        if (facet) {
          var type = _this2.getFacetDisplayType(facet.field);
          results.push(React.createElement(Facet, {
            facet: facet,
            type: type,
            key: facet.name,
            maxBuckets: _this2.props.maxFacetBuckets,
            collapse: true,
            entityColors: _this2.props.entityColors
          }));
        }
      });
      facets.forEach(function (facet) {
        if (!_this2.props.orderHint.includes(facet.name)) {
          var type = _this2.getFacetDisplayType(facet.field);
          results.push(React.createElement(Facet, {
            facet: facet,
            type: type,
            key: facet.name,
            maxBuckets: _this2.props.maxFacetBuckets,
            collapse: true,
            entityColors: _this2.props.entityColors
          }));
        }
      });
      return results;
    }
    return null;
  };

  FacetResults.prototype.render = function render() {
    return React.createElement(
      'div',
      { className: 'facetResults' },
      this.renderFacets()
    );
  };

  return FacetResults;
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
  orderHint: [],
  entityColors: new Map()
}, _class.contextTypes = {
  searcher: PropTypes.any
}, _temp);
export { FacetResults as default };
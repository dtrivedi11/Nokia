'use strict';

exports.__esModule = true;
exports.default = undefined;

var _SearchFacetBucket = require('./SearchFacetBucket');

var _SearchFacetBucket2 = _interopRequireDefault(_SearchFacetBucket);

var _SearchFacetStatistics = require('./SearchFacetStatistics');

var _SearchFacetStatistics2 = _interopRequireDefault(_SearchFacetStatistics);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * A particular facet from a query, including all of its values.
 */
var SearchFacet = function () {
  SearchFacet.fromJson = function fromJson(json) {
    var buckets = [];
    if (json.buckets && json.buckets.length > 0) {
      buckets = json.buckets.map(function (bucket) {
        return _SearchFacetBucket2.default.fromJson(bucket);
      });
    }
    var statistics = null;
    if (json.statistics) {
      statistics = _SearchFacetStatistics2.default.fromJson(json.statistics);
    }
    return new SearchFacet(json.name, json.field, json.label, buckets, statistics);
  };

  function SearchFacet(name, field, label) {
    var buckets = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];
    var statistics = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;

    _classCallCheck(this, SearchFacet);

    // eslint-disable-line max-len
    this.name = name;
    this.field = field;
    this.label = label;
    this.buckets = buckets;
    this.statistics = statistics;
  }

  /** The facet buckets (the various values for the facet that can be used to limit the query) */

  /** The name of the facet */

  /** The field that the facet is for */

  /** The human-readable label for this facet, usually the name of the field being faceted on */

  /** Statistics for the facet (only available for numeric fields) */


  SearchFacet.prototype.findLabel = function findLabel() {
    if (this.label && this.label.length > 0) {
      return this.label;
    }
    if (this.name && this.name.length > 0) {
      return this.name;
    }
    // Field should always be set.
    return this.field;
  };

  return SearchFacet;
}();

exports.default = SearchFacet;
module.exports = exports['default'];
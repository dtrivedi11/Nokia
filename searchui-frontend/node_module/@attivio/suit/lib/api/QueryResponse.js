'use strict';

exports.__esModule = true;
exports.default = undefined;

var _SearchDocument = require('./SearchDocument');

var _SearchDocument2 = _interopRequireDefault(_SearchDocument);

var _SearchFacet = require('./SearchFacet');

var _SearchFacet2 = _interopRequireDefault(_SearchFacet);

var _SearchFeedback = require('./SearchFeedback');

var _SearchFeedback2 = _interopRequireDefault(_SearchFeedback);

var _SearchPlacement = require('./SearchPlacement');

var _SearchPlacement2 = _interopRequireDefault(_SearchPlacement);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * The results of executing a query on the Attivio index.
 */
var QueryResponse = function () {
  QueryResponse.fromJson = function fromJson(json) {
    var result = new QueryResponse();
    if (json.totalTime) {
      result.totalTime = json.totalTime;
    }
    if (json.totalHits) {
      result.totalHits = json.totalHits;
    }
    if (json.documents && json.documents.length > 0) {
      var resultDocuments = json.documents.map(function (document) {
        return _SearchDocument2.default.fromJson(document);
      });
      result.documents = resultDocuments;
    }
    if (json.facets && json.facets.length > 0) {
      var resultFacets = json.facets.map(function (facet) {
        return _SearchFacet2.default.fromJson(facet);
      });
      result.facets = resultFacets;
    }
    if (json.feedback && json.feedback.length > 0) {
      var resultFeedback = json.feedback.map(function (feedback) {
        return _SearchFeedback2.default.fromJson(feedback);
      });
      result.feedback = resultFeedback;
    }
    if (json.placements && json.placements.length > 0) {
      var resultPlacements = json.placements.map(function (placement) {
        return _SearchPlacement2.default.fromJson(placement);
      });
      result.placements = resultPlacements;
    }
    return result;
  };

  function QueryResponse() {
    _classCallCheck(this, QueryResponse);

    this.totalTime = 0;
    this.totalHits = 0;
    this.documents = [];
    this.facets = [];
    this.feedback = [];
    this.placements = [];
  }

  /** The total amount of time, in milliseconds, it took to perform the query */

  /** The total number of matching documents */

  /** An array of documents matching the query (limited by the offset and rows parameters in the search request) */

  /** An array of facets applicable to the query */

  /** An array of feedback objects from performing the query */

  /** An array of Attivio-Business-Center-generated placements for the query */


  return QueryResponse;
}();

exports.default = QueryResponse;
module.exports = exports['default'];
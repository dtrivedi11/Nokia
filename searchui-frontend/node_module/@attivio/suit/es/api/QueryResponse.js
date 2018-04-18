function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

import SearchDocument from './SearchDocument';
import SearchFacet from './SearchFacet';
import SearchFeedback from './SearchFeedback';
import SearchPlacement from './SearchPlacement';

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
        return SearchDocument.fromJson(document);
      });
      result.documents = resultDocuments;
    }
    if (json.facets && json.facets.length > 0) {
      var resultFacets = json.facets.map(function (facet) {
        return SearchFacet.fromJson(facet);
      });
      result.facets = resultFacets;
    }
    if (json.feedback && json.feedback.length > 0) {
      var resultFeedback = json.feedback.map(function (feedback) {
        return SearchFeedback.fromJson(feedback);
      });
      result.feedback = resultFeedback;
    }
    if (json.placements && json.placements.length > 0) {
      var resultPlacements = json.placements.map(function (placement) {
        return SearchPlacement.fromJson(placement);
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

export { QueryResponse as default };
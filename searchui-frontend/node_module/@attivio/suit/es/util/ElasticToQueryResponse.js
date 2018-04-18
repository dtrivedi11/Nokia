import QueryResponse from "../api/QueryResponse";
import SearchDocument from "../api/SearchDocument";
import SearchFacet from "../api/SearchFacet";

export default (function (json, customOptions) {
  var result = new QueryResponse();

  if (json.took) {
    result.totalTime = json.took;
  }

  if (json.hits.total) {
    result.totalHits = json.hits.total;
  }

  if (json.hits.hits.length > 0) {
    result.documents = _getElasticDocuments(json.hits.hits, customOptions);
  }
  if (json.aggregations || Object.keys(json.aggregations).length > 0) {
    result.facets = _getElasticFacets(json.aggregations, customOptions);
  }

  return result;
});

var _wrapIfNotArray = function _wrapIfNotArray(v) {
  return Array.isArray(v) ? v : [v];
};

var _getElasticDocuments = function _getElasticDocuments(documents, customOptions) {
  return documents.map(function (doc) {
    var mapp = customOptions.mappings;
    var fields = {};

    Object.keys(mapp).forEach(function (k) {
      if (mapp[k] && doc._source[mapp[k]]) fields[k] = _wrapIfNotArray(doc._source[mapp[k]]);
    });

    fields[".id"] = [doc._id];
    fields[".score"] = [doc._score || 0];

    return SearchDocument.fromJson({ fields: fields });
  });
};

var _getElasticFacets = function _getElasticFacets(facets, customOptions) {
  return Object.keys(facets).map(function (field) {
    var facetConfig = customOptions.facets.find(function (f) {
      return f.field === field;
    }) || {};
    return SearchFacet.fromJson({
      name: facetConfig.field,
      field: facetConfig.field,
      label: facetConfig.displayName,
      buckets: facets[field].buckets.map(function (b) {
        return { value: b.key, count: b.doc_count, filter: facetConfig.field + ":\"" + b.key + "\"" };
      })
    });
  });
};
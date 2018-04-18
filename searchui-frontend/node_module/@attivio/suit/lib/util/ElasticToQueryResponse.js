"use strict";

exports.__esModule = true;

var _QueryResponse = require("../api/QueryResponse");

var _QueryResponse2 = _interopRequireDefault(_QueryResponse);

var _SearchDocument = require("../api/SearchDocument");

var _SearchDocument2 = _interopRequireDefault(_SearchDocument);

var _SearchFacet = require("../api/SearchFacet");

var _SearchFacet2 = _interopRequireDefault(_SearchFacet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (json, customOptions) {
  var result = new _QueryResponse2.default();

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
};

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

    return _SearchDocument2.default.fromJson({ fields: fields });
  });
};

var _getElasticFacets = function _getElasticFacets(facets, customOptions) {
  return Object.keys(facets).map(function (field) {
    var facetConfig = customOptions.facets.find(function (f) {
      return f.field === field;
    }) || {};
    return _SearchFacet2.default.fromJson({
      name: facetConfig.field,
      field: facetConfig.field,
      label: facetConfig.displayName,
      buckets: facets[field].buckets.map(function (b) {
        return { value: b.key, count: b.doc_count, filter: facetConfig.field + ":\"" + b.key + "\"" };
      })
    });
  });
};
module.exports = exports["default"];
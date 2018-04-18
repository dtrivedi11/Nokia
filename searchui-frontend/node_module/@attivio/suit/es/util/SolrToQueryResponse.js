import QueryResponse from "../api/QueryResponse";
import SearchDocument from "../api/SearchDocument";
import SearchFacet from "../api/SearchFacet";

export default (function (json, customOptions) {
  var result = new QueryResponse();

  if (json.responseHeader) {
    result.totalTime = json.responseHeader.QTime;
  }

  if (json.response) {
    result.totalHits = json.response.numFound;
  }
  if (json.response.docs.length > 0) {
    result.documents = _getSolrDocuments(json.response.docs, customOptions);
  }
  if (json.facets) {
    result.facets = _getSolrFacets(json.facets, customOptions);
  }

  return result;
});

var _wrapIfNotArray = function _wrapIfNotArray(v) {
  return Array.isArray(v) ? v : [v];
};

var _getSolrDocuments = function _getSolrDocuments(documents, customOptions) {
  return documents.map(function (doc) {
    var mapp = customOptions.mappings;
    var fields = {};

    Object.keys(mapp).forEach(function (k) {
      if (mapp[k] && doc[mapp[k]]) fields[k] = _wrapIfNotArray(doc[mapp[k]]);
    });

    if (customOptions.customId && customOptions.customId.length > 0) {
      fields[".id"] = [doc[customOptions.customId]];
    } else {
      fields[".id"] = [doc.id];
    }

    fields[".score"] = [""];

    return SearchDocument.fromJson({ fields: fields });
  });
};

var _getSolrFacets = function _getSolrFacets(facets, customOptions) {

  if (facets.count) delete facets.count;

  return Object.keys(facets).map(function (field) {
    var facetConfig = customOptions.facets.find(function (f) {
      return f.field === field;
    }) || {};
    return SearchFacet.fromJson({
      name: facetConfig.field || field,
      field: facetConfig.field || field,
      label: facetConfig.displayName || field,
      buckets: facets[field].buckets.map(function (b) {
        return { value: b.val, count: b.count, filter: facetConfig.field + ":\"" + b.val + "\"" };
      })
    });
  });
};
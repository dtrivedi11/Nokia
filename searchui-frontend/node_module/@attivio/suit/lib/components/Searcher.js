'use strict';

exports.__esModule = true;

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = require('react-router-dom');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _queryString = require('query-string');

var _queryString2 = _interopRequireDefault(_queryString);

var _Search = require('../api/Search');

var _Search2 = _interopRequireDefault(_Search);

var _SimpleQueryRequest = require('../api/SimpleQueryRequest');

var _SimpleQueryRequest2 = _interopRequireDefault(_SimpleQueryRequest);

var _QueryResponse = require('../api/QueryResponse');

var _QueryResponse2 = _interopRequireDefault(_QueryResponse);

var _FacetFilter = require('../api/FacetFilter');

var _FacetFilter2 = _interopRequireDefault(_FacetFilter);

var _FieldNames = require('../api/FieldNames');

var _FieldNames2 = _interopRequireDefault(_FieldNames);

var _ObjectUtils = require('../util/ObjectUtils');

var _ObjectUtils2 = _interopRequireDefault(_ObjectUtils);

var _Configurable = require('../components/Configurable');

var _Configurable2 = _interopRequireDefault(_Configurable);

var _Configuration = require('../components/Configuration');

var _Configuration2 = _interopRequireDefault(_Configuration);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * A wrapper for an Attivio search. Child components can access this object using
 * the searcher property that is inserted into their context object. This allows them
 * to access the Searcher's state to see all of its input parameters aa well as the
 * results of the most recent search and any errors. In addition, they can use the
 * reference to the Seacher to call methods which allow them to update the Searcher's
 * state or execute searches.
 *
 * The Searcher also provides a method, doCustomSearch(), that lets the callers
 * query the index using the configured Search class but providing their own request
 * object, without affecting the Searcher's state.
 *
 * See the SearchResults component for an example
 * of how this is done using by defining "static contextTypes" in the component.
 *
 * Note that the Searcher will add query parameters to the URL for the page's location
 * when the usere executes a (non-custom) search. This allows the URL for the search to be
 * used to repeat the same search, either when refreshing the browser window or when
 * bookmarking the page, sharing it in an email, etc. The URL is updated whenever a search
 * happens, whether caused by the user clicking the search button or by changing the
 * parameters to an existing search (e.g., changing the sort order or paging through the
 * results).

 IF
Searcher is first loaded, we need to check for query parameters and apply them if they exist.In this case, we need to do the search.

IF
Searcher is updated with a new query string, then we need to parse it and possibly do a new search, if it has changed.

IF
User does a search manually, we need to calculate the query string and push the new location onto the history if it has changed.
  THIS HAPPENS IN THE doSearch() method

IF
User updates a property that affects existing searches but doesn't require resetting, we need to update the state and then,
if there's a previous search, perform a new one (and, only in this case, update the search string
  THIS HAPPENDS WHEN THESE PROPERTIES CHANGE:
      resultsOffset (i.e., paging)

IF
User updates a property that affects existing searches AND requires resetting, then we need to update the state including setting
the offset to 0, and , if there's a previous search, perform a new one (and, only in this case, update the search string
  THIS HAPPENDS WHEN THESE PROPERTIES CHANGE:
      geoFilters (adding or removing)
      resultsPerPage
      facetFilters (adding or removing)
      sort
      relevancyModels
      format
      searchProfile


      // NEED TO DEAL WITH VALUES IN URL THAT ARE NOT VALID...

 */


/*

IF
Searcher is first loaded, we need to check for query parameters and apply them if they exist.In this case, we need to do the search.

IF
Searcher is updated with a new query string, then we need to parse it and possibly do a new search, if it has changed.

IF
User does a search manually, we need to calculate the query string and push the new location onto the history if it has changed.
  THIS HAPPENS IN THE doSearch() method

IF
User updates a property that affects existing searches but doesn't require resetting, we need to update the state and then,
]if there's a previous search, perform a new one (and, only in this case, update the search string
  THIS HAPPENDS WHEN THESE PROPERTIES CHANGE:
      resultsOffset (i.e., paging)

IF
User updates a property that affects existing searches AND requires resetting, then we need to update the state including
setting the offset to 0, and , if there's a previous search, perform a new one (and, only in this case, update the search string
  THIS HAPPENDS WHEN THESE PROPERTIES CHANGE:
      geoFilters (adding or removing)
      resultsPerPage
      facetFilters (adding or removing)
      sort
      relevancyModels
      format
      searchProfile


      // NEED TO DEAL WITH VALUES IN URL THAT ARE NOT VALID...
*/

/*
 * NOTE: If you add or remove anything from the Searcher's state, you'll
 * need to update (at least) the following methods to accommodate the chnage:
 *   constructor()
 *   getQueryRequest()
 *   generateLocationQueryStringFromState()
 *   parseLocationQueryStringToState()
 *   reset()
 *   relevantStateDiffers()
 *   getDefaultState()
 */
var Searcher = (_temp = _class = function (_React$Component) {
  _inherits(Searcher, _React$Component);

  /**
   * Convert an array of facet filters to an array of string representations thereof.
   */
  Searcher.serializeFacetFilters = function serializeFacetFilters(facetFilters) {
    return facetFilters.map(function (facetFilter) {
      return facetFilter.facetName + ',+' + facetFilter.bucketLabel + ',+' + facetFilter.filter;
    });
  };

  /**
   * Conveert an array of stringified facet filters to an array of actual FacetFilter objects.
   */


  Searcher.deserializeFacetFilters = function deserializeFacetFilters(facetFilters) {
    return facetFilters.map(function (facetFilterString) {
      var parts = facetFilterString.split(',+');
      var facetFilter = new _FacetFilter2.default();
      facetFilter.facetName = parts[0];
      facetFilter.bucketLabel = parts[1];
      facetFilter.filter = parts[2];
      return facetFilter;
    });
  };

  function Searcher(props) {
    _classCallCheck(this, Searcher);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.search = new _Search2.default(_this.props.baseUri, _this.props.searchEngineType, _this.props.customOptions);

    _this.state = _this.getDefaultState();
    _this.updateSearchResults = _this.updateSearchResults.bind(_this);
    return _this;
  }

  Searcher.prototype.getChildContext = function getChildContext() {
    return {
      searcher: this
    };
  };

  Searcher.prototype.componentWillMount = function componentWillMount() {
    // When the searcher is first created, this is called.
    // Pull a state object out of the location's query string
    var location = this.props.location;
    var newState = this.parseLocationQueryStringToState(location.search);

    // We check to see if the state needs to be updated due to this
    if (this.relevantStateDiffers(newState)) {
      this.updateStateAndSearch(newState);
    }
  };

  Searcher.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    // When the searcher gets updated to have a new set of props, then this is called.
    var location = nextProps.location;

    // Pull a state object out of the location's query string
    var newState = this.parseLocationQueryStringToState(location.search);

    // We check to see if the state needs to be updated due to this
    if (this.relevantStateDiffers(newState)) {
      this.updateStateAndSearch(newState);
    }
  };

  /**
   * Method to get the default state for the Searcher. This ism in a
   * separate method since it needs to be done both in the constructor
   * and in the reset method.
   */


  Searcher.prototype.getDefaultState = function getDefaultState() {
    return {
      haveSearched: false,
      response: undefined,
      error: undefined,
      query: Searcher.STAR_COLON_STAR,
      queryLanguage: this.props.defaultQueryLanguage,
      sort: ['.score:DESC'],
      relevancyModels: this.props.relevancyModels,
      facetFilters: [],
      geoFilters: [],
      resultsPerPage: parseInt(this.props.resultsPerPage, 10),
      resultsOffset: 0,
      format: this.props.format
    };
  };

  /**
   * Use the properties of the Searcher component and the values from its
   * current state to generate a query request object that will be passed
   * to the Search class to do the work.
   */


  Searcher.prototype.getQueryRequest = function getQueryRequest() {
    var qr = new _SimpleQueryRequest2.default();
    qr.workflow = this.props.searchWorkflow;
    qr.query = this.state.query;
    qr.queryLanguage = this.state.queryLanguage;
    qr.rows = this.state.resultsPerPage;
    if (this.state.geoFilters) {
      qr.filters = this.state.geoFilters;
    } else {
      qr.filters = [];
    }
    if (this.props.queryFilter) {
      qr.filters.push(this.props.queryFilter);
    }
    if (this.props.locale) {
      qr.locale = this.props.locale;
    }
    qr.facets = this.props.facets;
    qr.sort = this.state.sort;
    qr.fields = this.getFieldList();
    qr.facetFilters = this.state.facetFilters;

    // And now, the fields that don't have explicit counterparts
    // in the simple query request, which need to be set using
    // the restParams property.
    var restParams = new Map();
    restParams.set('offset', ['' + this.state.resultsOffset]);
    if (this.state.relevancyModels && this.state.relevancyModels.length > 0) {
      restParams.set('relevancymodelnames', [this.state.relevancyModels.join(',')]);
    } else if (this.props.relevancyModels && this.props.relevancyModels.length > 0) {
      restParams.set('relevancymodelnames', [this.props.relevancyModels.join(',')]);
    }
    restParams.set('includemetadatainresponse', ['true']);
    if (this.props.highlightResults) {
      restParams.set('highlight', ['true']);
      restParams.set('highlight.mode', ['HTML']);
    }
    if (this.props.facetFinderCount > 0) {
      restParams.set('facet.ff', ['RESULTS']);
      restParams.set('facet.ffcount', [this.props.facetFinderCount.toString(10)]);
    }
    restParams.set('join.rollup', [this.props.joinRollupMode]);
    if (this.props.businessCenterProfile) {
      var profiles = [this.props.businessCenterProfile];
      restParams.set('abc.enabled', ['true']);
      restParams.set('searchProfile', profiles);
    }

    qr.restParams = restParams;
    return qr;
  };

  /**
   * Get the list of fields to use in the query request.
   */


  Searcher.prototype.getFieldList = function getFieldList() {
    // Start out with the fields the user specifed
    var result = [].concat(this.props.fields || []);
    // Add the mapped fields that the search results will expect
    result.push(this.props.title + ' as title');
    result.push(this.props.uri + ' as uri');
    result.push(this.props.table + ' as table');
    result.push(this.props.teaser + ' as teaser');
    result.push(this.props.text + ' as text');
    result.push(this.props.previewImageUri + ' as previewImageUri');
    result.push(this.props.thumbnailImageUri + ' as thumbnailImageUri');
    result.push(this.props.latitude + ' as latitude');
    result.push(this.props.longitude + ' as longitude');
    result.push(this.props.moreLikeThisQuery + ' as morelikethisquery');
    result.push(this.props.mimetype + ' as mimetype');
    result.push(this.props.sourcePath + ' as sourcepath');
    // Add the fields we always want
    result.push('tags');
    return result;
  };

  /**
   * Check to see if the old and new state differ, only comparing the
   * properties we care about (non-transient ones).
   */


  Searcher.prototype.relevantStateDiffers = function relevantStateDiffers(compareWith) {
    // Get a copy of the state with transient values removed
    var currentState = Object.assign({}, this.state);
    delete currentState.error;
    delete currentState.response;
    delete currentState.haveSearched;

    var newState = Object.assign({}, compareWith);
    delete newState.error;
    delete newState.response;
    delete newState.haveSearched;

    return !_ObjectUtils2.default.deepEquals(currentState, newState);
  };

  /**
   * Given a SearcherState object, generate the serialized URL query string parameters
   * that represent that state. If the optional original queryString parameter is passed,
   * then any non-SearcherState parameters encoded in it will be added to the resulting
   * query string.
   */


  Searcher.prototype.generateLocationQueryStringFromState = function generateLocationQueryStringFromState(state, originalQueryString) {
    var basicState = {};

    if (!(state.query === '*' || state.query === '*:*')) {
      basicState.query = state.query;
    }
    if (state.queryLanguage !== this.props.defaultQueryLanguage) {
      basicState.queryLanguage = state.queryLanguage;
    }
    if (state.geoFilters && state.geoFilters.length > 0) {
      basicState.geoFilters = state.geoFilters;
    }
    if (state.resultsPerPage !== this.props.resultsPerPage) {
      basicState.resultsPerPage = state.resultsPerPage;
    }
    if (state.resultsOffset !== 0) {
      basicState.resultsOffset = state.resultsOffset;
    }
    if (state.facetFilters && state.facetFilters.length > 0) {
      basicState.facetFilters = Searcher.serializeFacetFilters(state.facetFilters);
    }
    if (state.sort) {
      // LJV TODO compare with default version
      basicState.sort = state.sort;
    }
    if (state.relevancyModels && state.relevancyModels.length > 0) {
      basicState.relevancyModels = state.relevancyModels;
    }
    if (state.format && state.format !== this.props.format) {
      basicState.format = state.format;
    }

    // See if there are any query parameters other than those set by the Searcher. If so, we want to maintain them.
    if (originalQueryString) {
      var originalParsed = _queryString2.default.parse(originalQueryString);
      if (originalParsed) {
        originalParsed.delete('query');
        originalParsed.delete('queryLanguage');
        originalParsed.delete('geoFilters');
        originalParsed.delete('resultsPerPage');
        originalParsed.delete('resultsOffset');
        originalParsed.delete('facetFilters');
        originalParsed.delete('sort');
        originalParsed.delete('relevancyModels');
        originalParsed.delete('format');
      }
      // Add any leftover fields back in to the basic state
      basicState = Object.assign({}, basicState, originalParsed);
    }

    return _queryString2.default.stringify(basicState);
  };

  /**
   * Given the query string from the location URL, parse it into the values of a SearcherState
   * object. Values which are missing are set to their default values. Any values in the
   * queryString which don't apply to the SearcherState are ignored.
   */


  Searcher.prototype.parseLocationQueryStringToState = function parseLocationQueryStringToState(queryString) {
    var parsed = _queryString2.default.parse(queryString);

    // Get the query string
    // DEFAULT: *:*
    var query = parsed.query ? parsed.query : '*:*';

    // Get the query language (and validate that it's one of 'simple' or 'advanced')
    // DEFAULT: this.props.defaultQueryLanguage
    var queryLanguage = this.props.defaultQueryLanguage;
    if (parsed.queryLanguage === 'simple' || parsed.queryLanguage === 'advanced') {
      queryLanguage = parsed.queryLanguage;
    } else if (parsed.queryLanguage) {
      console.log('Searcher was passed unknown query language from the URI: ' + parsed.queryLanguage + '. Using default: ' + this.props.defaultQueryLanguage); // eslint-disable-line max-len
    }

    // Get the geoFilters (normalized to an array of strings)
    // DEFAUT: []
    var geoFilters = parsed.geoFilters;
    if (!geoFilters) {
      geoFilters = [];
    } else if (typeof geoFilters === 'string') {
      geoFilters = [geoFilters];
    }

    // Get the number of results per page (as a positive integer)
    // DEFAULT: this.props.resultsPerPage¸
    var resultsPerPage = void 0;
    if (parsed.resultsPerPage) {
      resultsPerPage = parseInt(parsed.resultsPerPage, 10);
    }
    if (!resultsPerPage || resultsPerPage <= 0) {
      resultsPerPage = this.props.resultsPerPage;
    }

    // Get the offset into the search results (as a positive integer or zero)
    // DEFAULT: 0
    var resultsOffset = void 0;
    if (parsed.resultsOffset) {
      resultsOffset = parseInt(parsed.resultsOffset, 10);
    }
    if (!resultsOffset || resultsOffset < 0) {
      resultsOffset = 0;
    }

    // Get the facet filters (normalized to an array of FacetFilter objects
    // DEFAULT: []
    var facetFiltersStrings = [];
    if (parsed.facetFilters) {
      // Wrap single strings in an array
      if (typeof parsed.facetFilters === 'string') {
        facetFiltersStrings = [parsed.facetFilters];
      } else {
        facetFiltersStrings = parsed.facetFilters;
      }
    }
    // Deserialize the strings to get FacetFilter objects
    var facetFilters = Searcher.deserializeFacetFilters(facetFiltersStrings);

    // Get the sort order
    // DEFAULT: '.score:DESC'
    var sort = void 0;
    if (typeof parsed.sort === 'string') {
      // LJV TODO Validate the sort column and direction
      sort = parsed.sort;
    }
    if (!sort) {
      sort = '.score:DESC';
    }

    // Get the relevancy models to use.
    // DEFAULT: []
    var relevancyModels = void 0;
    if (parsed.relevancyModels) {
      if (typeof parsed.relevancyModels === 'string') {
        relevancyModels = [parsed.relevancyModels];
      } else {
        relevancyModels = parsed.relevancyModels;
      }
    }
    if (!relevancyModels) {
      relevancyModels = [];
    }

    // LJV TODO
    // Get the business center profile to use.
    // DEFAULT: none

    // Get the format.
    // DEFAULT: this.props.format
    var format = this.props.format;
    if (parsed.format === 'list' || parsed.format === 'usercard' || parsed.format === 'doccard' || parsed.format === 'debug' || parsed.format === 'simple') {
      format = parsed.format;
    } else if (parsed.format) {
      console.log('Searcher was passed unknown list format from the URI: ' + parsed.format + '. Using default: ' + this.props.format);
    }

    var result = {
      query: query,
      queryLanguage: queryLanguage,
      geoFilters: geoFilters,
      resultsPerPage: resultsPerPage,
      resultsOffset: resultsOffset,
      facetFilters: facetFilters,
      sort: [sort],
      relevancyModels: relevancyModels,
      format: format,
      haveSearched: this.state.haveSearched // Make sure we don't change this
    };

    return result;
  };

  /**
   * Reset to the first page and then update the state, re-running the search if one had already been done.
   */


  Searcher.prototype.updateStateResetAndSearch = function updateStateResetAndSearch(partialState) {
    var newPartialState = Object.assign({}, partialState);
    newPartialState.resultsOffset = 0;
    this.updateStateAndSearch(newPartialState);
  };

  /**
   * Update the state of the searcher and then re-run the search if one had already been done.
   */


  Searcher.prototype.updateStateAndSearch = function updateStateAndSearch(partialState) {
    var _this2 = this;

    this.setState(partialState, function () {
      if (_this2.state.haveSearched) {
        _this2.doSearch();
      }
    });
  };

  /**
   * Used to tell the search results component which format
   * to use when rendering results.
   */


  Searcher.prototype.updateFormat = function updateFormat(newFormat) {
    if (this.state.format !== newFormat) {
      this.updateStateAndSearch({
        format: newFormat
      });
    }
  };

  /**
   * Update the list of tags for the given document.
   */


  Searcher.prototype.updateTags = function updateTags(tags, docId) {
    return this.search.updateRealtimeField(docId, _FieldNames2.default.TAGS, tags);
  };

  /**
   * Callback used when the search is completed. Will update the Searcher's state
   * with the query response or the error string passed in.
   */
  Searcher.prototype.updateSearchResults = function updateSearchResults(response, error) {
    if (response) {
      // Succeeded...
      this.setState({
        response: response,
        error: undefined,
        haveSearched: true
      });
    } else if (error) {
      // Failed!
      this.setState({
        response: undefined,
        haveSearched: true,
        error: error
      });
    }
  };

  /**
   * Perform a custom search given a query request. Calls the updateResults callback
   * and doesn't affect the state of the searcher itself.
   */


  Searcher.prototype.doCustomSearch = function doCustomSearch(request, updateResults) {
    this.search.search(request, updateResults);
  };

  /**
   * Completely reset the searcher to its default state and call an
   * optional callback when done.
   */


  Searcher.prototype.reset = function reset() {
    var _this3 = this;

    var callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {};

    this.setState(this.getDefaultState(), callback);

    var callBackWrapper = function callBackWrapper() {
      _this3.updateStateResetAndSearch(_this3.getDefaultState());
    };
    this.setState({
      haveSearched: false,
      response: undefined,
      error: undefined
    }, callBackWrapper);
  };

  /**
   * Trigger a new search.
   *
   * If the search has been reset by one of the other
   * methods, then
   * <ul>
   *  <li>The "haveSearched" flag is reset to false until the search completes</li>
   *  <li>The offset is reset to 0 to show the first page of results</li>
   *  <li>Any facet filters that were applied are cleared.</li>
   *  <li>Any response or error from a previous search are cleared.</li>
   * </ul>
   */


  Searcher.prototype.doSearch = function doSearch() {
    var _this4 = this;

    var qr = this.getQueryRequest();
    this.search.search(qr, function (response, error) {
      _this4.updateSearchResults(response, error);

      // potentially do window.scrollTo(0, 0)?

      // Update the URL if needed.
      var oldQueryString = _this4.props.location.query;
      var updatedQueryString = _this4.generateLocationQueryStringFromState(_this4.state, oldQueryString);
      if (oldQueryString !== updatedQueryString) {
        _this4.props.history.push('?' + updatedQueryString);
      }
    });
  };

  /**
   * Set the query string to the passed-in value and trigger the
   * query immediately, resetting parameters to the beginning.
   */


  Searcher.prototype.performQueryImmediately = function performQueryImmediately(query) {
    var advanced = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    this.updateStateResetAndSearch({
      haveSearched: true, // Force it to update right now
      error: undefined,
      response: undefined,
      queryLanguage: advanced ? 'advanced' : 'simple',
      facetFilters: [],
      query: query
    });
  };

  /**
   * Set whether the simple or advanced query language should be
   * used to perform the search.
   * This causes subsequent searches to be reset.
   */


  Searcher.prototype.updateQueryLanguage = function updateQueryLanguage(queryLanguage) {
    if (queryLanguage !== this.state.queryLanguage) {
      this.updateStateResetAndSearch({
        queryLanguage: queryLanguage
      });
    }
  };

  /**
   * Update the query string to use for searching. Don't add this into the
   * URL because we don't want the URL changing as the user types, only when
   * the search button is clicked.
   * This causes subsequent searches to be reset (see doSearch() for details).
   */


  Searcher.prototype.updateQuery = function updateQuery(query) {
    this.setState({
      haveSearched: false,
      query: query
    });
  };

  /**
   * Update the number of documents to show on a page.
   * If there is a current search and the value has changed, the
   * search will be repeated with the new value.
   */


  Searcher.prototype.updateResultsPerPage = function updateResultsPerPage(newResultsPerPage) {
    if (newResultsPerPage !== this.state.resultsPerPage) {
      this.updateStateResetAndSearch({
        resultsPerPage: newResultsPerPage
      });
    }
  };

  /**
   * Call to change the relevancy model in use by the searcher.
   * If there is a current search and the value has changed, the
   * search will be repeated with the new value.
   */


  Searcher.prototype.updateRelevancyModels = function updateRelevancyModels(newRelevancyModels) {
    if (JSON.stringify(newRelevancyModels) !== JSON.stringify(this.state.relevancyModels)) {
      this.updateStateResetAndSearch({
        relevancyModels: newRelevancyModels
      });
    }
  };

  /**
   * Update the searcher to use a new sort column. The value passed
   * in should have the column name and sort direction, separated
   * by a colon (direction is either ASC or DESC).
   * If there is a current search and the value has changed, the
   * search will be repeated with the new value.
   * The search is reset to the first page when performed again.
   */


  Searcher.prototype.updateSort = function updateSort(newSort) {
    if (this.newSort !== this.state.sort) {
      var _sort = this.state.sort;
      if (_sort && _sort.length > 0) {
        _sort[0] = newSort;
      } else {
        _sort = [newSort];
      }
      this.updateStateResetAndSearch({
        sort: _sort
      });
    }
  };

  /**
   * Add a query filter (in AQL) to the query request.
   */


  Searcher.prototype.addGeoFilter = function addGeoFilter(filter) {
    this.addGeoFilters([filter]);
  };

  /**
   * Add multiple query filters (in AQL) to the query request.
   */


  Searcher.prototype.addGeoFilters = function addGeoFilters(filters) {
    var geoFilters = this.state.geoFilters.slice();
    geoFilters = geoFilters.concat(filters);
    this.updateStateResetAndSearch({
      geoFilters: geoFilters
    });
  };

  /**
   * Remove a query filter by name (in AQL) from the query request.
   */


  Searcher.prototype.removeGeoFilter = function removeGeoFilter(filter) {
    var geoFilters = this.state.geoFilters.slice();
    var index = geoFilters.indexOf(filter);
    if (index !== -1) {
      geoFilters.splice(index, 1);
    }
    this.updateStateResetAndSearch({
      geoFilters: geoFilters
    });
  };

  /**
   * Add a facet filter to the current search. Will repeat the search
   * if it's already been performed. Note that if a filter for the
   * same facet name already exists, it will be replaced with the
   * new one.
   */


  Searcher.prototype.addFacetFilter = function addFacetFilter(facetName, bucketLabel, filter) {
    var newFF = new _FacetFilter2.default();
    newFF.facetName = facetName;
    newFF.bucketLabel = bucketLabel;
    newFF.filter = filter;

    var updatedFacetFilters = [];
    var facetFilters = this.state.facetFilters;
    facetFilters.forEach(function (facetFilter) {
      if (facetFilter.facetName !== facetName) {
        updatedFacetFilters.push(facetFilter);
      }
    });
    updatedFacetFilters.push(newFF);
    this.updateStateResetAndSearch({
      facetFilters: updatedFacetFilters
    });
  };

  /**
   * Remove the specified facet filter from the current
   * search. If a search has already been performed, it
   * will be repeated with the updated set of facet filters.
   */


  Searcher.prototype.removeFacetFilter = function removeFacetFilter(removeFilter) {
    var updatedFacetFilters = [];
    var facetFilters = this.state.facetFilters;
    facetFilters.forEach(function (facetFilter) {
      if (facetFilter.facetName !== removeFilter.facetName) {
        updatedFacetFilters.push(facetFilter);
      }
    });
    this.updateStateResetAndSearch({
      facetFilters: updatedFacetFilters
    });
  };

  /**
   * Navigate to a new page of search results. (Should only actually be
   * called if a search has been completed.) The search will be performed
   * again with the new page's offset.
   */


  Searcher.prototype.changePage = function changePage(newPage) {
    var resultsPerPage = this.state.resultsPerPage;
    var oldOffset = this.state.resultsOffset;
    var newOffset = resultsPerPage * newPage;
    if (newOffset !== oldOffset) {
      this.updateStateAndSearch({
        resultsOffset: newOffset
      });
    }
  };

  Searcher.prototype.render = function render() {
    // Nothing special to do here. The children will all look at our state to decide what to render
    return _react2.default.createElement(
      'div',
      null,
      this.props.children
    );
  };

  return Searcher;
}(_react2.default.Component), _class.STAR_COLON_STAR = '*:*', _class.defaultProps = {
  searchEngineType: 'attivio',
  customOptions: {},
  baseUri: '',
  searchWorkflow: 'search',
  fields: ['*'],
  facets: [],
  relevancyModels: ['default'],
  facetFinderCount: 0,
  queryFilter: null,
  highlightResults: 'on',
  joinRollupMode: 'TREE',
  locale: null,
  title: _FieldNames2.default.TITLE,
  uri: _FieldNames2.default.URI,
  table: _FieldNames2.default.TABLE,
  teaser: 'SCOPETEASER(text, fragment=true, numFragments=4, fragmentScope=sentence)',
  text: 'SCOPETEASER(text, fragment=true, numFragments=1, fragmentScope=2147483647)',
  previewImageUri: 'img.uri.preview',
  thumbnailImageUri: 'img.uri.thumbnail',
  latitude: _FieldNames2.default.LATITUDE,
  longitude: _FieldNames2.default.LONGITUDE,
  moreLikeThisQuery: 'morelikethisquery',
  mimetype: _FieldNames2.default.MIME_TYPE,
  sourcePath: _FieldNames2.default.SOURCEPATH,
  format: 'list',
  resultsPerPage: 10,
  businessCenterProfile: null,
  defaultQueryLanguage: 'simple'
}, _class.contextTypes = {
  configuration: _propTypes2.default.instanceOf(_Configuration2.default)
}, _class.childContextTypes = {
  searcher: _propTypes2.default.any }, _temp);
exports.default = (0, _reactRouterDom.withRouter)((0, _Configurable2.default)(Searcher));
module.exports = exports['default'];
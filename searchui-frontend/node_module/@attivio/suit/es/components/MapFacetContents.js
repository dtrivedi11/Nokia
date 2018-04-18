var _class, _temp;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';

import React from 'react';
//Uncommenting DrawControl import would enable Polygon selection feature and render it in Chrome but won't render in IE11.
//import DrawControl from 'react-mapbox-gl-draw';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';

import PropTypes from 'prop-types';
import sizeMe from 'react-sizeme';

import Configurable from '../components/Configurable';
import SearchFacetBucket from '../api/SearchFacetBucket';
import PositionUtils from '../util/PositionUtils';
import ObjectUtils from '../util/ObjectUtils';
import StringUtils from '../util/StringUtils';

var ReactMapboxGl = require("react-mapbox-gl");

/**
 * Component to display the buckets of a facet using a MapBox map.
 */
var MapFacetContents = (_temp = _class = function (_React$Component) {
  _inherits(MapFacetContents, _React$Component);

  MapFacetContents.calcState = function calcState(buckets, zoom, geoFilters, updating) {
    var center = PositionUtils.calcCenter(buckets.map(function (bucket) {
      return bucket.value;
    }));
    return {
      latitude: center.latitude,
      longitude: center.longitude,
      zoom: zoom,
      geoFilters: geoFilters,
      updating: updating
    };
  };

  MapFacetContents.getFilter = function getFilter(e) {
    var filter = 'position:POLYGON(';
    e.features[0].geometry.coordinates[0].forEach(function (point) {
      filter = filter + '(' + point[0] + ',' + point[1] + '),';
    });
    filter = filter.substr(0, filter.length - 1).concat(')');
    return filter;
  };

  function MapFacetContents(props) {
    _classCallCheck(this, MapFacetContents);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.state = MapFacetContents.calcState(_this.props.buckets, 1, [], '');
    _this.viewportChange = _this.viewportChange.bind(_this);
    _this.create = _this.create.bind(_this);
    _this.delete = _this.delete.bind(_this);
    _this.select = _this.select.bind(_this);
    _this.update = _this.update.bind(_this);
    _this.apply = _this.apply.bind(_this);
    return _this;
  }

  MapFacetContents.prototype.componentDidMount = function componentDidMount() {
    this.handleNewData(this.props.buckets);
  };

  MapFacetContents.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    this.handleNewData(nextProps.buckets);
  };

  MapFacetContents.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps, nextState) {
    var stateTemp = Object.assign({}, this.state);
    stateTemp.geoFilters = [];
    stateTemp.proximityBoosts = [];
    stateTemp.updating = '';
    var nextStateTemp = Object.assign({}, nextState);
    nextStateTemp.geoFilters = [];
    nextStateTemp.proximityBoosts = [];
    nextStateTemp.updating = '';
    return !ObjectUtils.deepEquals(this.props.buckets, nextProps.buckets) || !ObjectUtils.deepEquals(nextStateTemp, stateTemp);
  };

  MapFacetContents.prototype.create = function create(e) {
    var geoFilters = this.state.geoFilters.slice();
    var updating = this.state.updating;
    updating = MapFacetContents.getFilter(e);
    geoFilters.push(updating);
    this.setState({
      geoFilters: geoFilters,
      updating: updating
    });
  };

  MapFacetContents.prototype.delete = function _delete(e) {
    var geoFilters = this.state.geoFilters.slice();
    var index = geoFilters.indexOf(MapFacetContents.getFilter(e));
    if (index !== -1) {
      geoFilters.splice(index, 1);
    }
    this.setState({
      geoFilters: geoFilters,
      updating: ''
    });
  };

  MapFacetContents.prototype.select = function select(e) {
    var updating = '';
    if (e.features.length) {
      updating = MapFacetContents.getFilter(e);
    }
    this.setState({
      updating: updating
    });
  };

  MapFacetContents.prototype.update = function update(e) {
    var geoFilters = this.state.geoFilters.slice();
    var updating = this.state.updating;
    updating = MapFacetContents.getFilter(e);
    var index = geoFilters.indexOf(this.state.updating);
    if (index !== -1) {
      geoFilters.splice(index, 1, updating);
    }
    this.setState({
      geoFilters: geoFilters,
      updating: updating
    });
  };

  MapFacetContents.prototype.apply = function apply() {
    if (this.context.searcher) {
      if (this.state.geoFilters.length) {
        var geoFilter = '';
        this.state.geoFilters.forEach(function (filter) {
          geoFilter = geoFilter ? 'OR(' + filter + ', ' + geoFilter + ')' : filter;
        });
        this.context.searcher.addGeoFilter(geoFilter);
      }
    }
  };

  MapFacetContents.prototype.handleNewData = function handleNewData(buckets) {
    this.setState(MapFacetContents.calcState(buckets, this.state.zoom, this.state.geoFilters, this.state.updating));
  };

  MapFacetContents.prototype.viewportChange = function viewportChange(viewport) {
    this.setState({
      latitude: viewport.latitude,
      longitude: viewport.longitude,
      zoom: viewport.zoom
    });
  };

  MapFacetContents.prototype.render = function render() {
    var _this2 = this;

    var Marker = ReactMapboxGl.Marker;
    var ZoomControl = ReactMapboxGl.ZoomControl;
    if (StringUtils.notEmpty(this.props.mapboxKey)) {
      var _Map = ReactMapboxGl.Map({
        accessToken: this.props.mapboxKey,
        attributionControl: false
      });

      var points = this.props.buckets.map(function (bucket) {
        var value = bucket.value; // JSON.parse(bucket.value);
        // Keep track of the boundaries of the coordinates
        return React.createElement(
          Marker,
          {
            coordinates: [value.longitude || 0, value.latitude || 0],
            onClick: function onClick() {
              _this2.props.addFacetFilter(bucket);
            },
            key: (value.longitude || 0) + ',' + (value.latitude || 0),
            style: { cursor: 'pointer' }
          },
          React.createElement(Glyphicon, { glyph: 'map-marker', style: { fontSize: '18px', color: '#2a689c' } })
        );
      });

      var height = this.props.size && this.props.size.height ? this.props.size.height : 400;
      var width = this.props.size && this.props.size.width ? this.props.size.width : 400;

      // style filters
      var selected = ['==', 'active', 'true'];
      var deselected = ['==', 'active', 'false'];
      var polygon = ['==', '$type', 'Polygon'];
      var line = ['==', '$type', 'LineString'];

      // styles
      var selectedColor = '#f9c448';
      var deselectedColor = '#3276b1';
      var lineLayout = {
        'line-cap': 'round',
        'line-join': 'round'
      };
      var selectedLinePaint = {
        'line-color': selectedColor,
        'line-dasharray': [0.2, 2],
        'line-width': 2
      };

      return React.createElement(
        'div',
        null,
        React.createElement(
          'a',
          {
            className: 'btn btn-primary btn-xs',
            style: {
              position: 'relative',
              display: 'inline',
              zIndex: 1,
              top: '30px',
              left: '35px'
            },
            role: 'button',
            tabIndex: 0,
            onClick: this.apply
          },
          'Update Results'
        ),
        React.createElement(
          _Map,
          {
            style: 'mapbox://styles/mapbox/light-v9' // eslint-disable-line react/style-prop-object
            , containerStyle: {
              height: height,
              width: width
            },
            center: [this.state.longitude || 0, this.state.latitude || 0],
            zoom: [this.state.zoom || 1],
            onStyleLoad: function onStyleLoad(map) {
              // add a filter query to the state on draw.create
              map.on('draw.create', _this2.create);
              // find and remove the appropriate filter query from the state on draw.delete
              map.on('draw.delete', _this2.delete);
              // keep track of the selected polygon whenever the selection changes
              map.on('draw.selectionchange', _this2.select);
              // find and remove the selected filter from the state then add the updated filter back to it on draw.update
              map.on('draw.update', _this2.update);
            }
          },
          React.createElement(ZoomControl, { position: 'bottom-right' }),
          points
        )
      );
    }
    return React.createElement(
      'div',
      { className: 'none' },
      'You must configure a Mapbox key to display map facets.'
    );
  };

  return MapFacetContents;
}(React.Component), _class.defaultProps = {
  size: null,
  mapboxKey: ''
}, _class.contextTypes = {
  searcher: PropTypes.any
}, _temp);


var hoc = sizeMe({
  monitorHeight: true,
  refreshRate: 10000
});

export default hoc(Configurable(MapFacetContents));
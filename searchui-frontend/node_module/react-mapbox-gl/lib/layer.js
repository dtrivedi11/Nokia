"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var PropTypes = require("prop-types");
var isEqual = require('deep-equal');
var diff_1 = require("./util/diff");
var Layer = (function (_super) {
    __extends(Layer, _super);
    function Layer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.source = __assign({ type: 'geojson' }, _this.props.sourceOptions, { data: {
                type: 'FeatureCollection',
                features: []
            } });
        _this.geometry = function (coordinates) {
            switch (_this.props.type) {
                case 'symbol':
                case 'circle':
                    return {
                        type: 'Point',
                        coordinates: coordinates
                    };
                case 'fill':
                    return {
                        type: coordinates.length > 1 ? 'MultiPolygon' : 'Polygon',
                        coordinates: coordinates
                    };
                case 'line':
                    return {
                        type: 'LineString',
                        coordinates: coordinates
                    };
                default:
                    return {
                        type: 'Point',
                        coordinates: coordinates
                    };
            }
        };
        _this.makeFeature = function (props, id) { return ({
            type: 'Feature',
            geometry: _this.geometry(props.coordinates),
            properties: __assign({}, props.properties, { id: id })
        }); };
        _this.initialize = function () {
            var _a = _this.props, type = _a.type, layout = _a.layout, paint = _a.paint, layerOptions = _a.layerOptions, sourceId = _a.sourceId, before = _a.before, images = _a.images, id = _a.id;
            var map = _this.context.map;
            var layer = __assign({ id: id, source: sourceId || id, type: type,
                layout: layout,
                paint: paint }, layerOptions);
            if (images) {
                var normalizedImages = !Array.isArray(images[0]) ? [images] : images;
                normalizedImages.forEach(function (image) {
                    map.addImage(image[0], image[1], image[2]);
                });
            }
            if (!sourceId) {
                map.addSource(id, _this.source);
            }
            map.addLayer(layer, before);
        };
        _this.onStyleDataChange = function () {
            if (!_this.context.map.getLayer(_this.props.id)) {
                _this.initialize();
                _this.forceUpdate();
            }
        };
        return _this;
    }
    Layer.prototype.componentWillMount = function () {
        var map = this.context.map;
        this.initialize();
        map.on('styledata', this.onStyleDataChange);
    };
    Layer.prototype.componentWillUnmount = function () {
        var map = this.context.map;
        var _a = this.props, images = _a.images, id = _a.id;
        if (!map || !map.getStyle()) {
            return;
        }
        map.removeLayer(id);
        if (!this.props.sourceId) {
            map.removeSource(id);
        }
        if (images) {
            var normalizedImages = !Array.isArray(images[0]) ? [images] : images;
            normalizedImages
                .map(function (_a) {
                var key = _a[0], rest = _a.slice(1);
                return key;
            })
                .forEach(map.removeImage);
        }
        map.off('styledata', this.onStyleDataChange);
    };
    Layer.prototype.componentWillReceiveProps = function (props) {
        var _a = this.props, paint = _a.paint, layout = _a.layout, before = _a.before, layerOptions = _a.layerOptions, id = _a.id;
        var map = this.context.map;
        if (!isEqual(props.paint, paint)) {
            var paintDiff_1 = diff_1.default(paint, props.paint);
            Object.keys(paintDiff_1).forEach(function (key) {
                map.setPaintProperty(id, key, paintDiff_1[key]);
            });
        }
        if (!isEqual(props.layout, layout)) {
            var layoutDiff_1 = diff_1.default(layout, props.layout);
            Object.keys(layoutDiff_1).forEach(function (key) {
                map.setLayoutProperty(id, key, layoutDiff_1[key]);
            });
        }
        if (props.layerOptions &&
            layerOptions &&
            !isEqual(props.layerOptions.filter, layerOptions.filter)) {
            map.setFilter(id, props.layerOptions.filter);
        }
        if (before !== props.before) {
            map.moveLayer(id, props.before);
        }
    };
    Layer.prototype.render = function () {
        var _this = this;
        var map = this.context.map;
        var _a = this.props, sourceId = _a.sourceId, draggedChildren = _a.draggedChildren;
        var children = this.props.children;
        if (!children) {
            children = [];
        }
        if (draggedChildren) {
            children = draggedChildren;
        }
        else {
            children = Array.isArray(children)
                ? children.reduce(function (arr, next) { return arr.concat(next); }, [])
                : [children];
        }
        var features = children
            .map(function (_a, id) {
            var props = _a.props;
            return _this.makeFeature(props, id);
        })
            .filter(Boolean);
        var source = map.getSource(sourceId || this.props.id);
        if (source && !sourceId && source.setData) {
            source.setData({
                type: 'FeatureCollection',
                features: features
            });
        }
        return null;
    };
    Layer.contextTypes = {
        map: PropTypes.object
    };
    Layer.defaultProps = {
        type: 'symbol',
        layout: {},
        paint: {}
    };
    return Layer;
}(React.Component));
exports.default = Layer;
//# sourceMappingURL=layer.js.map
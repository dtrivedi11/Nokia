/// <reference types="react" />
import Map from './map';
import { LayerCommonProps, Props as LayerProps } from './layer';
import { EnhancedLayerProps } from './layer-events-hoc';
import GeoJSONLayer from './geojson-layer';
import Feature, { Props } from './feature';
import ZoomControl from './zoom-control';
import Popup from './popup';
import ScaleControl from './scale-control';
import Marker from './marker';
import Source from './source';
import Cluster from './cluster';
import RotationControl from './rotation-control';
import { Context } from './util/types';
import * as PropTypes from 'prop-types';
export declare type FeatureProps = Props;
export declare type Context = Context;
export declare type LayerCommonProps = LayerCommonProps;
export declare type LayerProps = LayerProps;
export declare type EnhancedLayerProps = EnhancedLayerProps;
export declare const PropTypesAlias: typeof PropTypes;
declare const Layer: {
    new (props?: (EnhancedLayerProps & LayerCommonProps) | undefined, context?: any): {
        context: Context;
        hover: number[];
        isDragging: boolean;
        draggedChildren: JSX.Element[] | undefined;
        id: string;
        getChildren: () => React.ReactElement<Props>[];
        areFeaturesDraggable: (children: React.ReactElement<Props>[], featureIds?: number[]) => boolean;
        onClick: (evt: any) => void;
        onMouseEnter: (evt: any) => void;
        onMouseLeave: (evt: any) => void;
        onMouseDown: () => void;
        onTouchStart: (evt: any) => void;
        onDragMove: ({lngLat}: any) => void;
        onDragUp: (moveEvent: string, evt: any) => void;
        componentWillMount(): void;
        componentWillUnmount(): void;
        render(): JSX.Element;
        setState<K extends never>(f: (prevState: {}, props: EnhancedLayerProps & LayerCommonProps) => Pick<{}, K>, callback?: (() => any) | undefined): void;
        setState<K extends never>(state: Pick<{}, K>, callback?: (() => any) | undefined): void;
        forceUpdate(callBack?: (() => any) | undefined): void;
        props: Readonly<{
            children?: React.ReactNode;
        }> & Readonly<EnhancedLayerProps & LayerCommonProps>;
        state: Readonly<{}>;
        refs: {
            [key: string]: React.ReactInstance;
        };
    };
    contextTypes: {
        map: PropTypes.Requireable<any>;
    };
};
export { Feature, Layer, GeoJSONLayer, Map, Popup, ZoomControl, ScaleControl, Marker, Source, Cluster, RotationControl };
export default Map;

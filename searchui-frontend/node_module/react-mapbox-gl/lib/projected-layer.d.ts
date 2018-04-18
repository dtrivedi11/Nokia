/// <reference types="react" />
/// <reference types="mapbox-gl" />
import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Map } from 'mapbox-gl';
import { Anchor, PointDef, OverlayProps } from './util/overlays';
import * as GeoJSON from 'geojson';
export interface Props {
    coordinates: GeoJSON.Position;
    anchor?: Anchor;
    offset?: number | number[] | PointDef;
    children?: JSX.Element;
    onClick?: React.MouseEventHandler<HTMLDivElement>;
    onDoubleClick?: React.MouseEventHandler<HTMLDivElement>;
    onMouseEnter?: React.MouseEventHandler<HTMLDivElement>;
    onMouseLeave?: React.MouseEventHandler<HTMLDivElement>;
    onScroll?: React.UIEventHandler<HTMLDivElement>;
    onWheel?: React.MouseEventHandler<HTMLDivElement>;
    style?: React.CSSProperties;
    className: string;
}
export interface Context {
    map: Map;
}
export default class ProjectedLayer extends React.Component<Props, any> {
    context: Context;
    private container;
    private prevent;
    static contextTypes: {
        map: PropTypes.Requireable<any>;
    };
    static defaultProps: {
        anchor: "left" | "right" | "center" | "top-right" | "top-left" | "bottom-right" | "bottom-left" | "top" | "bottom";
        offset: number;
        onClick: (...args: any[]) => any[];
    };
    state: OverlayProps;
    private setContainer;
    private handleMapMove;
    componentDidMount(): void;
    private havePropsChanged(props, nextProps);
    componentWillReceiveProps(nextProps: Props): void;
    componentWillUnmount(): void;
    render(): JSX.Element;
}

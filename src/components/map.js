import React from 'react'
import ReactDOM from 'react-dom'
import mapboxgl from 'mapbox-gl'
import Tooltip from "./tooltip"
import * as _ from 'lodash'

mapboxgl.accessToken = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6' +
    'tFX7QHmA';

class Map extends React.Component {
  tooltipContainer;
  map;
  markers = [];

  constructor(props) {
    super(props);
    this.state = {
      center: props.center
    };
  }

  componentDidUpdate(prevProps) {
    console.log("Update");

    if (!_.isEqual(this.props.center, prevProps.center)) {
      console.log("New props", this.props.center, prevProps.center);
      this
        .map
        .setCenter(this.props.center)
    }

    if (!_.isEqual(this.props.range, prevProps.range)) {
      console.log("New props", this.props.range, prevProps.range);
      console.log('this.props.mainData : ', this.props.mainData);

      const data = this
        .props
        .mainData
        .features
        .filter(i => i.properties.price >= this.props.range[0] && i.properties.price <= this.props.range[1])
      console.log('', data);

      this
        .map
        .getSource('realty')
        .setData({"type": "FeatureCollection", "features": data});

    }
  }

  componentWillUnmount() {
    console.log("UNMOUNT");
    this
      .map
      .remove()
  }

  setTooltip(features) {
    if (features.length) {
      console.log(features, features.length);
      ReactDOM.render(< Tooltip features = {
        features
      } />, this.tooltipContainer);
    } else {
      ReactDOM.unmountComponentAtNode(this.tooltipContainer)
    }
  }

  componentDidMount() {
    this.tooltipContainer = document.createElement('div');
    this.map = new mapboxgl.Map({container: this.mapContainer, style: 'mapbox://styles/mapbox/streets-v9', center: this.state.center, zoom: this.props.zoom});
    const tooltip = new mapboxgl
      .Marker(this.tooltipContainer, {
      offset: [-120, 0]
    })
      .setLngLat([0, 0])
      .addTo(this.map);

    console.log("AMP INSTANCE", this.map);

    this
      .map
      .on('load', (e) => {
        console.log("map load done", this.props.mainData);

        this
          .map
          .addSource('realty', {
            type: 'geojson',
            data: this.props.mainData
          });

        this
          .map
          .addLayer({
            id: "mainDataPoint",
            type: "circle",
            source: "realty",
            paint: {
              "circle-color": "red",
              "circle-radius": 7,
              "circle-stroke-width": 1,
              "circle-stroke-color": "#fff"
            }
          });

      })

    this
      .map
      .on('click', (e) => {
        console.log("map load done", JSON.stringify(e.lngLat));
        this
          .markers
          .push(e.lngLat)
        console.log(this.markers);

      })

    this
      .map
      .on('mouseenter', 'mainDataPoint', (e) => {

        this
          .map
          .getCanvas()
          .style
          .cursor = 'pointer';

        const features = this
          .map
          .queryRenderedFeatures(e.point, {layers: ["mainDataPoint"]});

        tooltip.setLngLat(features[0].geometry.coordinates);

        this.setTooltip(features[0].properties.description + ' $' + features[0].properties.price);
        console.log('features: ', features);
      });

    this
      .map
      .on('mouseleave', 'mainDataPoint', (e) => {
        this
          .map
          .getCanvas()
          .style
          .cursor = '';
        this.setTooltip("")
      });
  }

  render() {
    return (
      <div >
        <div
          ref=
          { el => this.mapContainer = el }
          style={{
          width: 100 + "%",
          height: 100 + "vh"
        }}></div>
      </div >
    );
  }
}

export default Map;
import { default as React, Component } from "react";

import { GoogleMap, Marker } from "react-google-maps";

/*
 * https://developers.google.com/maps/documentation/javascript/examples/event-simple
 *
 * Add <script src="https://maps.googleapis.com/maps/api/js"></script> to your HTML to provide google.maps reference
 */
export default class MapAddMarker extends Component {

  static defaultProps = {
    initialCenter: { lat: 51.1079, lng: 17.0385 },
    markerPosition: { lat: 51.1079, lng: 17.0385 }
  }

  state = {
    zoom: 10,
    center: this.props.initialCenter,
  }

  handleMarkerClick() {
    this.setState({
      zoom: 8,
    });
  }

  handleMapCenterChanged() {
    const newPos = this.refs.map.getCenter();
    if (newPos.equals(new google.maps.LatLng(this.props.initialCenter))) {
      // Notice: Check newPos equality here,
      // or it will fire center_changed event infinitely
      return;
    }
    if (this._timeoutId) {
      clearTimeout(this._timeoutId);
    }
    this._timeoutId = setTimeout(() => {
      this.setState({ center: this.props.initialCenter });
    }, 3000);

    this.setState({
      // Because center now is a controlled variable, we need to set it to new
      // value when "center_changed". Or in the next render it will use out-dated
      // state.center and reset the center of the map to the old location.
      // We can never drag the map.
      center: newPos,
    });
  }

  handleMapClick(event) {

    this.setState({
      markerPosition: event.latLng
    });
    this.props.onChange(event.latLng.lat(), event.latLng.lng())
  }

  render() {
    const { initialCenter, ...restProps } = this.props;
    const { zoom, center, markerPosition } = this.state;

    let marker = <Marker position={markerPosition}/>

    return (
      <GoogleMap
        containerProps={{
          ...restProps,
          style: {
            height: `300px`,
            width: `300px`
          },
        }}
        ref="map"
        zoom={zoom}
        center={center}
        onClick={::this.handleMapClick}>
        {marker}
      </GoogleMap>
    );
  }
}

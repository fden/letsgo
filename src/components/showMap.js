import { default as React, Component } from "react";

import { GoogleMap, Marker } from "react-google-maps";

/*
 * https://developers.google.com/maps/documentation/javascript/examples/event-simple
 *
 * Add <script src="https://maps.googleapis.com/maps/api/js"></script> to your HTML to provide google.maps reference
 */
export default class ShowMap extends Component {

  static defaultProps = {
    initialCenter: { lat: 51.1079, lng: 17.0385 },
    markerPosition: { lat: 51.1079, lng: 17.0385 }
  }

  state = {
    zoom: 13,
    center: this.props.initialCenter,
  }

  handleMarkerClick() {

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

    let markerPos = {
      lat: this.props.lat,
      lng: this.props.lng
    }
    console.log(this.props)

    let marker = <Marker position={markerPos}/>

    return (
      <GoogleMap
        containerProps={{
          ...restProps,
          style: {
            height: `300px`,
            "min-width": `300px`,
            "max-width": `100%`
          },
        }}
        ref="map"
        zoom={zoom}
        center={markerPos}
        onClick={::this.handleMapClick}>
        {marker}
      </GoogleMap>
    );
  }
}

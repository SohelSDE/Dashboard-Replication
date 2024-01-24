import React from 'react';
import Widget from '../../../../components/Widget';
import s from './Google.module.scss';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const Map = () => {
  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "YOUR_API_KEY"
  });

  const center = {
    lat: -37.813179,
    lng: 144.950259
  };

  return (
    <div className={s.MapContainer}>
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={{ height: 'inherit', width: 'inherit' }}
          center={center}
          zoom={12}
        >
          <Marker position={center} />
        </GoogleMap>
      ) : (
        <div>{loadError ? 'Error loading maps' : 'Loading maps'}</div>
      )}
    </div>
  );
};

class Maps extends React.Component {
  render() {
    return (
      <div>
        <h1 className="page-title">
          Google <span className="fw-semi-bold">Maps</span>
        </h1>
        <Widget
          title={<h4>Google Maps <small className="text-muted">Default and customized</small></h4>}
          collapse
          close
        >
          <Map />
        </Widget>
      </div>
    );
  }
}

export default Maps;

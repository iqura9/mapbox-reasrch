import { useRef, useState } from 'react';
import Map, { MapRef } from 'react-map-gl';
import ReactMapGlMarkers from '../../hooks/useReactMapGlMarkers';

const KYIV_COORDS = { longitude: 30.5234, latitude: 50.4501 };

interface ReactMapGlMapProps {
  markerCount: number;
  isOptimized: boolean;
}

export const ReactMapGlMap = ({
  markerCount,
  isOptimized,
}: ReactMapGlMapProps) => {
  const mapRef = useRef<MapRef | null>(null);
  const [mapIsLoaded, setMapIsLoaded] = useState(false);

  const handleMapLoad = () => {
    setMapIsLoaded(true);
  };

  return (
    <Map
      ref={mapRef}
      onLoad={handleMapLoad}
      initialViewState={{
        longitude: KYIV_COORDS.longitude,
        latitude: KYIV_COORDS.latitude,
        zoom: 12,
      }}
      style={{ width: '100%', height: '800px' }}
      mapStyle="mapbox://styles/mapbox/streets-v12"
      mapboxAccessToken={import.meta.env.VITE_REACT_MAPBOX_TOKEN}
    >
      <ReactMapGlMarkers
        mapRef={mapRef}
        count={markerCount}
        isOptimized={isOptimized}
        mapIsLoaded={mapIsLoaded}
      />
    </Map>
  );
};

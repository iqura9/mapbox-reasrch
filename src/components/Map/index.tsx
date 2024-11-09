import mapboxgl from 'mapbox-gl';
import { MutableRefObject, useEffect } from 'react';

mapboxgl.accessToken = import.meta.env.VITE_REACT_MAPBOX_TOKEN;

interface MapProps {
  longitude: number;
  latitude: number;
  zoom: number;
  mapRef: MutableRefObject<HTMLDivElement | null>;
}

export const MapboxGlMap = ({
  longitude,
  latitude,
  zoom,
  mapRef,
}: MapProps) => {
  useEffect(() => {
    if (mapRef.current) {
      const map = new mapboxgl.Map({
        container: mapRef.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [longitude, latitude],
        zoom: zoom,
      });

      return () => {
        map.remove();
      };
    }
  }, [longitude, latitude, zoom, mapRef]);

  return <div ref={mapRef} className="w-full h-[calc(100vh_-_150px)]" />;
};

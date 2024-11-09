import mapboxgl from 'mapbox-gl';
import { useEffect, useRef } from 'react';

mapboxgl.accessToken = import.meta.env.VITE_REACT_MAPBOX_TOKEN;

interface MapProps {
  longitude: number;
  latitude: number;
  zoom: number;
}

export const MapboxGlMap = ({ longitude, latitude, zoom }: MapProps) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (mapContainerRef.current) {
      const map = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [longitude, latitude],
        zoom: zoom,
      });

      return () => {
        map.remove();
      };
    }
  }, [longitude, latitude, zoom]);

  return (
    <div ref={mapContainerRef} className="w-full h-[calc(100vh_-_150px)]" />
  );
};

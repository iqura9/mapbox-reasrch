import mapboxgl from 'mapbox-gl';
import React, { useEffect } from 'react';

interface MapGlMapProps {
  longitude: number;
  latitude: number;
  zoom: number;
  mapRef: React.MutableRefObject<mapboxgl.Map | null>;
  containerRef: React.RefObject<HTMLDivElement>;
}

export const MapGlMap = ({
  longitude,
  latitude,
  zoom,
  mapRef,
  containerRef,
}: MapGlMapProps) => {
  useEffect(() => {
    if (!containerRef.current) return;

    mapRef.current = new mapboxgl.Map({
      container: containerRef.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [longitude, latitude],
      zoom: zoom,
    });

    mapRef.current?.addControl(new mapboxgl.NavigationControl(), 'top-right');

    mapRef.current.on('load', () => {
      // Nifty code to force map to fit inside container when it loads
      mapRef.current?.resize();
    });

    // Clean up on unmount
    return () => mapRef.current?.remove();
  }, [longitude, latitude, zoom, mapRef, containerRef]);

  return <div ref={containerRef} className="w-full h-[800px]" id="map" />;
};

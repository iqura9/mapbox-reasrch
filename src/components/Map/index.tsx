import mapboxgl from 'mapbox-gl';
import React, { useEffect, useRef, useState } from 'react';
import useMarkers from '../../hooks/useMarkers';

interface MapGlMapProps {
  longitude: number;
  latitude: number;
  zoom: number;
  inputValue: string;
}

export const MapGlMap = ({
  longitude,
  latitude,
  zoom,
  inputValue,
}: MapGlMapProps) => {
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  useMarkers({
    mapRef,
    count: Number(inputValue),
    isOptimized: true,
    isMapLoaded,
  });

  useEffect(() => {
    if (!containerRef.current) return;

    mapRef.current = new mapboxgl.Map({
      container: containerRef.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [longitude, latitude],
      zoom: zoom,
    });

    mapRef.current?.addControl(new mapboxgl.NavigationControl(), 'top-right');

    const handleLoad = () => {
      setIsMapLoaded(true);
      mapRef.current?.resize();
    };

    mapRef.current.on('load', handleLoad);

    return () => {
      if (mapRef.current) {
        mapRef.current.off('load', handleLoad);
        mapRef.current.remove();
      }
    };
  }, [longitude, latitude, zoom]);

  return <div ref={containerRef} className="w-full h-[800px]" id="map" />;
};

import mapboxgl from 'mapbox-gl';
import { MutableRefObject, useEffect, useState } from 'react';
import { generateRandomCoordinates } from '../utils/generateRandomCoords';
import { renderSlowMarkers } from '../utils/renderSlowMarkers';
import { renderOptimizedMarkers } from '../utils/renderOptimizedMarkers';

interface UseMarkersProps {
  mapRef: MutableRefObject<mapboxgl.Map | null>;
  count: number;
  isOptimized?: boolean;
}

export default function useMarkers({
  mapRef,
  count,
  isOptimized = false,
}: UseMarkersProps) {
  const [coordinatesList, setCoordinatesList] = useState<[number, number][]>(
    []
  );

  useEffect(() => {
    console.log('map rerender');
    if (!mapRef.current || count === 0) return;

    const map = mapRef.current;

    const handleMapReady = () => {
      const centerCoordinates: [number, number] = [
        map.getCenter().lng,
        map.getCenter().lat,
      ];

      const newCoordinates = Array.from({ length: count }, () =>
        generateRandomCoordinates(centerCoordinates, 0.1)
      );
      setCoordinatesList(newCoordinates);
    };

    if (map.isStyleLoaded()) {
      handleMapReady();
    } else {
      map.once('load', handleMapReady);
    }
  }, [mapRef, count]);

  useEffect(() => {
    if (!mapRef.current || coordinatesList.length === 0) return;

    const map = mapRef.current;
    const markers: mapboxgl.Marker[] = [];

    if (isOptimized) {
      console.log('render renderOptimizedMarkers');
      renderOptimizedMarkers(map, coordinatesList);
    } else {
      renderSlowMarkers(map, coordinatesList, markers);
    }

    return () => {
      markers.forEach((marker) => marker.remove());
      if (isOptimized) {
        map.removeLayer('points-layer');
        map.removeSource('points');
      }
    };
  }, [mapRef, isOptimized, coordinatesList]);
}

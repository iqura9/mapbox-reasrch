import mapboxgl from 'mapbox-gl';
import { MutableRefObject, useEffect, useState } from 'react';
import { generateRandomCoordinates } from '../utils/generateRandomCoords';
import { renderSlowMarkers } from '../utils/renderSlowMarkers';
import { renderOptimizedMarkers } from '../utils/renderOptimizedMarkers';

interface UseMarkersProps {
  mapRef: MutableRefObject<mapboxgl.Map | null>;
  count: number;
  isOptimized?: boolean;
  isMapLoaded?: boolean;
}

export default function useMarkers({
  mapRef,
  count,
  isOptimized = false,
  isMapLoaded = false,
}: UseMarkersProps) {
  const [coordinatesList, setCoordinatesList] = useState<[number, number][]>(
    []
  );

  useEffect(() => {
    if (!mapRef.current || count === 0 || !isMapLoaded) return;

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
    handleMapReady();
  }, [mapRef, count, isMapLoaded]);

  useEffect(() => {
    if (!mapRef.current || coordinatesList.length === 0) return;

    const map = mapRef.current;
    const markers: mapboxgl.Marker[] = [];

    if (isOptimized) {
      renderOptimizedMarkers(map, coordinatesList);
    }

    if (!isOptimized) {
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

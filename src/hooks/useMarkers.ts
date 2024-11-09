import mapboxgl from 'mapbox-gl';
import { MutableRefObject, useEffect } from 'react';
import { generateRandomCoordinates } from '../utils/generateRandomCoords';

interface UseMarkersProps {
  mapRef: MutableRefObject<mapboxgl.Map | null>;
  count: number;
}

export default function useMarkers({ mapRef, count }: UseMarkersProps) {
  useEffect(() => {
    if (!mapRef.current) return;

    const map = mapRef.current;
    const markers: mapboxgl.Marker[] = [];

    const centerCoordinates: [number, number] = [
      map.getCenter().lng,
      map.getCenter().lat,
    ];

    for (let i = 0; i < count; i++) {
      const coordinates = generateRandomCoordinates(centerCoordinates, 0.1);

      const marker = new mapboxgl.Marker().setLngLat(coordinates).addTo(map);
      markers.push(marker);
    }
    return () => {
      markers.forEach((marker) => marker.remove());
    };
  }, [mapRef, count]);
}

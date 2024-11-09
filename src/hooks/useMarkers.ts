import mapboxgl from 'mapbox-gl';
import { MutableRefObject, useEffect, useState } from 'react';
import { generateRandomCoordinates } from '../utils/generateRandomCoords';

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

function renderSlowMarkers(
  map: mapboxgl.Map,
  coordinatesList: [number, number][],
  markers: mapboxgl.Marker[]
) {
  coordinatesList.forEach((coords) => {
    const el = document.createElement('div');
    el.className = 'marker';
    el.style.backgroundImage = `url(https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png)`;
    el.style.width = '32px';
    el.style.height = '40px';
    el.style.backgroundSize = '100%';
    const marker = new mapboxgl.Marker(el).setLngLat(coords).addTo(map);
    markers.push(marker);
  });
}

function renderOptimizedMarkers(
  map: mapboxgl.Map,
  coordinatesList: [number, number][]
) {
  const features: mapboxgl.GeoJSONFeature[] = coordinatesList.map((coords) => ({
    type: 'Feature',
    geometry: { type: 'Point', coordinates: coords },
    properties: { title: 'Mapbox Marker' },
    source: '',
  }));

  map.addSource('points', {
    type: 'geojson',
    data: {
      type: 'FeatureCollection',
      features,
    },
  });

  const makiIconUrl =
    'https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png';

  map.loadImage(makiIconUrl, (error, image) => {
    if (error) throw error;
    map.addImage('custom-marker', image as ImageData);

    map.addLayer({
      id: 'points-layer',
      type: 'symbol',
      source: 'points',
      layout: {
        'icon-image': 'custom-marker',
        'icon-allow-overlap': true,
        'symbol-avoid-edges': true,
      },
    });
  });
}

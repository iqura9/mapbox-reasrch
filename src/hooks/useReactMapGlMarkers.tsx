import { MutableRefObject, useEffect, useState } from 'react';
import { Layer, Marker, Source } from 'react-map-gl';
import { generateRandomCoordinates } from '../utils/generateRandomCoords';

interface UseMarkersProps {
  mapRef: MutableRefObject<Map | null>;
  count: number;
  isOptimized: boolean;
  mapIsLoaded: boolean;
}

export default function useReactMapGlMarkers({
  mapRef,
  count,
  isOptimized,
  mapIsLoaded,
}: UseMarkersProps) {
  const [coordinatesList, setCoordinatesList] = useState<[number, number][]>(
    []
  );

  useEffect(() => {
    if (!mapIsLoaded || !mapRef.current || count === 0) return;

    const map = mapRef.current;
    const centerCoordinates: [number, number] = [
      map.getCenter().lng,
      map.getCenter().lat,
    ];

    const newCoordinates = Array.from({ length: count }, () =>
      generateRandomCoordinates(centerCoordinates, 0.1)
    );
    setCoordinatesList(newCoordinates);
  }, [mapRef, count, mapIsLoaded]);

  if (coordinatesList.length === 0) return null;

  if (isOptimized) {
    return (
      <Source
        id="points"
        type="geojson"
        data={{
          type: 'FeatureCollection',
          features: coordinatesList.map((coords) => ({
            type: 'Feature',
            geometry: { type: 'Point', coordinates: coords },
            properties: { title: 'Mapbox Marker' },
          })),
        }}
      >
        <Layer
          id="points-layer"
          type="symbol"
          layout={{
            'icon-image': 'custom-marker',
            'icon-allow-overlap': true,
            'symbol-avoid-edges': true,
          }}
        />
      </Source>
    );
  } else {
    return (
      <>
        {coordinatesList.map((coords, index) => (
          <Marker
            key={index}
            longitude={coords[0]}
            latitude={coords[1]}
            anchor="bottom"
          >
            <div
              style={{
                backgroundImage: `url(https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png)`,
                width: '32px',
                height: '40px',
                backgroundSize: '100%',
              }}
            />
          </Marker>
        ))}
      </>
    );
  }
}

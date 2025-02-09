import { MutableRefObject, useEffect, useState } from 'react';
import { Layer, Marker, Source, MapRef } from 'react-map-gl';
import { generateRandomCoordinates } from '../utils/generateRandomCoords';
import { loadCustomMarker } from '../utils/loadCustomMarker';

type CoordinateType = [number, number];
interface UseMarkersProps {
  mapRef: MutableRefObject<MapRef | null>;
  count: number;
  isOptimized: boolean;
  mapIsLoaded: boolean;
}

export default function ReactMapGlMarkers({
  mapRef,
  count,
  isOptimized,
  mapIsLoaded,
}: UseMarkersProps) {
  const [coordinatesList, setCoordinatesList] = useState<CoordinateType[]>([]);

  useEffect(() => {
    if (!mapIsLoaded || !mapRef.current || count === 0) return;

    const map = mapRef.current;
    const centerCoordinates: CoordinateType = [
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
    const geojsonData = {
      type: 'FeatureCollection',
      features: coordinatesList.map((coords) => ({
        type: 'Feature',
        geometry: { type: 'Point', coordinates: coords },
        properties: { title: 'Mapbox Marker' },
      })),
    };

    loadCustomMarker(mapRef.current);

    return (
      <Source id="points" type="geojson" data={geojsonData}>
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
  }

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

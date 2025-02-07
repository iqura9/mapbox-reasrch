import mapboxgl from 'mapbox-gl';
export function renderOptimizedMarkers(
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

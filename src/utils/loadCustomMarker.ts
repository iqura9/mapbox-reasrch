import { MapRef } from 'react-map-gl';

const CUSTOM_MARKER_URL =
  'https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png';

export function loadCustomMarker(map: MapRef | null) {
  map?.loadImage(CUSTOM_MARKER_URL, (error, image) => {
    if (error) throw error;
    map.addImage('custom-marker', image as ImageData);
  });
}

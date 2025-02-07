import mapboxgl from 'mapbox-gl';

export function renderSlowMarkers(
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

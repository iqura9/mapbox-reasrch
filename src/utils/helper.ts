/**
 * Call a function when the map's style has loaded. You can safely add and
 * modify map layers within this function
 *
 * @param {mapboxgl.Map} map
 * @param {function} fn
 */
export function onMapStyleLoaded(map, fn) {
  if (map.isStyleLoaded()) return process.nextTick(fn);
  map.once('styledata', () => onMapStyleLoaded(map, fn));
}

/**
 * Call a function when the map's tiles have loaded, i.e. most network activity
 * is complete (although sprite and font loading may still be occurring)
 *
 * @param {mapboxgl.Map} map
 * @param {function} fn
 */
export function onMapTilesLoaded(map, fn) {
  if (map.areTilesLoaded()) return process.nextTick(fn);
  map.once('sourcedata', () => onMapTilesLoaded(map, fn));
}

/**
 * Call a function when the map has finished rendering and transitions are
 * complete
 *
 * @param {mapboxgl.Map} map
 * @param {function} fn
 */
export function onMapRenderComplete(map, fn) {
  if (map.loaded()) return process.nextTick(fn);
  map.once('render', () => onMapRenderComplete(map, fn));
}

import { MapboxGlMap } from './components/Map';

function App() {
  return (
    <div>
      <h1>Mapbox GL Map</h1>
      <MapboxGlMap longitude={-74.5} latitude={40} zoom={9} />
    </div>
  );
}

export default App;

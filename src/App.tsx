import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useRef, useState } from 'react';
import HeaderTabs from './components/HeaderTabs';
import { MapGlMap } from './components/Map';
import useMarkers from './hooks/useMarkers';

mapboxgl.accessToken = import.meta.env.VITE_REACT_MAPBOX_TOKEN;

function App() {
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);

  const [inputValue, setInputValue] = useState<number>(3);

  const handleTabClick = (index: number) => {
    console.log('Clicked Tab Index:', index);
  };

  useMarkers({ mapRef, count: Number(inputValue) });

  return (
    <div className="w-full h-screen">
      <HeaderTabs onTabClick={handleTabClick} />

      <MapGlMap
        longitude={30.5}
        latitude={50.45}
        zoom={12}
        mapRef={mapRef}
        containerRef={mapContainerRef}
      />
      <div className="flex gap-5 flex-nowrap items-center">
        <div className="flex flex-nowrap text-nowrap">Number of markers:</div>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(Number(e.target.value))}
          className="border rounded p-2 w-full my-2"
          placeholder="Enter count of markers"
        />
      </div>
    </div>
  );
}

export default App;

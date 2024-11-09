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

  const [inputValue, setInputValue] = useState<string>('10');
  const [tab, setTab] = useState<number>(0);

  const handleTabClick = (index: number) => {
    setTab(index);
  };

  useMarkers({ mapRef, count: Number(inputValue), isOptimized: tab === 1 });

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
          onChange={(e) => setInputValue(e.target.value)}
          className="border rounded p-2 w-full my-2"
          placeholder="Enter count of markers"
        />
      </div>
    </div>
  );
}

export default App;

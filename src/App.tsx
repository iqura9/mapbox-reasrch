import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useState } from 'react';
import HeaderTabs from './components/HeaderTabs';
import { MapGlMap } from './components/Map';
import { ReactMapGlMap } from './components/Map/ReactMapGlMap';

mapboxgl.accessToken = import.meta.env.VITE_REACT_MAPBOX_TOKEN;

const KYIV_COORDS = {
  longitude: 30.5,
  latitude: 50.45,
};

function App() {
  const [inputValue, setInputValue] = useState<string>('10');
  const [tab, setTab] = useState<number>(2);

  const handleTabClick = (index: number) => {
    setTab(index);
  };

  return (
    <div className="w-full h-screen">
      <HeaderTabs onTabClick={handleTabClick} />
      {tab === 0 || tab === 1 ? (
        <MapGlMap
          longitude={KYIV_COORDS.longitude}
          latitude={KYIV_COORDS.latitude}
          zoom={12}
          inputValue={inputValue}
        />
      ) : null}

      {tab === 2 ? (
        <ReactMapGlMap markerCount={Number(inputValue)} isOptimized={false} />
      ) : null}

      {tab === 3 ? (
        <ReactMapGlMap markerCount={Number(inputValue)} isOptimized={true} />
      ) : null}

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

import { useRef, useState } from 'react';
import HeaderTabs from './components/HeaderTabs';
import { MapboxGlMap } from './components/Map';

function App() {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const [inputValue, setInputValue] = useState<number>();

  const handleTabClick = (index: number) => {
    console.log('Clicked Tab Index:', index);
  };

  return (
    <div className="w-full h-screen">
      <HeaderTabs onTabClick={handleTabClick} />
      <input
        type="number"
        value={inputValue}
        onChange={(e) => setInputValue(Number(e.target.value))}
        className="border rounded p-2 w-full my-2"
        placeholder="Enter count of markers"
      />
      <MapboxGlMap
        longitude={30.5}
        latitude={50.45}
        zoom={12}
        mapRef={mapContainerRef}
      />
    </div>
  );
}

export default App;

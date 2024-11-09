import HeaderTabs from './components/HeaderTabs';
import { MapboxGlMap } from './components/Map';

function App() {
  const handleTabClick = (index: number) => {
    console.log('Clicked Tab Index:', index);
  };
  return (
    <div className="w-full h-screen">
      <HeaderTabs onTabClick={handleTabClick} />

      <MapboxGlMap longitude={30.5} latitude={50.45} zoom={12} />
    </div>
  );
}

export default App;

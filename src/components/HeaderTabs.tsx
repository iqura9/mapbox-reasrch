import { useState } from 'react';

interface HeaderTabsProps {
  onTabClick: (index: number) => void;
}

const HeaderTabs = ({ onTabClick }: HeaderTabsProps) => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = ['MapBox-GL Map', 'Tab 2', 'Tab 3'];

  const handleTabClick = (index: number) => {
    setActiveTab(index);
    onTabClick(index);
  };

  return (
    <div className="flex justify-center bg-gray-100 p-4">
      {tabs.map((tab, index) => (
        <button
          key={index}
          onClick={() => handleTabClick(index)}
          className={`px-4 py-2 mx-2 font-semibold ${
            activeTab === index
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-600'
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default HeaderTabs;

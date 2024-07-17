import classNames from 'classnames';
import React from 'react';

export type TabsVariant = 'default';

export interface Tab {
  name: string;
  TabComponent: React.ReactNode;
}

export interface TabsProps {
  tabs: Tab[];
  variant?: TabsVariant;
  selectedIndex: number;
  onChange(index: number): void;
}

const Tabs: React.FC<TabsProps> = ({
  tabs,
  variant = 'default',
  selectedIndex = 0,
  onChange,
}) => {
  const tabActiveVariantClassMap: Record<TabsVariant, string> = {
    default:
      'font-bold text-primary py-3 px-6 bg-primary bg-opacity-10 rounded-t-xl shadow-inner',
  };

  const tabInActiveVariantClassMap: Record<TabsVariant, string> = {
    default: 'font-bold text-dark-9 py-3 px-6',
  };

  return (
    <div className='flex flex-col'>
      <div
        className={classNames(
          'flex-grow overflow-x-auto flex flex-row space-x-3 bg-transparent shadow-sm sticky top-0'
        )}
      >
        {tabs.map(({ name }, index) => {
          const activeTab = index === selectedIndex;

          return (
            <button
              className={classNames(
                'font-zen-body text-base focus:outline-none whitespace-pre',
                activeTab
                  ? tabActiveVariantClassMap[variant]
                  : tabInActiveVariantClassMap[variant]
              )}
              onClick={() => onChange(index)}
              key={name}
            >
              {name}
            </button>
          );
        })}
      </div>
      <div key={selectedIndex} className='flex-grow overflow-y-scroll'>
        {tabs[selectedIndex].TabComponent}
      </div>
    </div>
  );
};

export default Tabs;

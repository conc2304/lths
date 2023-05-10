import { ReactNode } from 'react';

interface TabPanelProps {
  currentTab: string;
  value: string;
  children?: ReactNode;
}

const TabPanel = (props: TabPanelProps) => {
  const { value, currentTab, children } = props;

  return (
    <div role="tabpanel" hidden={value !== currentTab}>
      {value === currentTab && children}
    </div>
  );
};

export default TabPanel;

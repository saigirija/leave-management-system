import React, { useMemo, useState } from 'react';
import LecturerRegisterScreen from '../components/auth/LecturerRegisterScreen';
import StudentRegisterScreen from '../components/auth/StudentRegisterScreen';
import Layout from '../components/Layout';
import Tabs, { Tab } from '../components/Tabs';

interface RegisterScreenProps {}

const RegisterScreen: React.FC<RegisterScreenProps> = () => {
  const [selectedTabIndex, setSelectedTabIndex] = useState<number>(0);

  const tabs: Tab[] = useMemo(
    () => [
      {
        name: 'Lecturer',
        TabComponent: <LecturerRegisterScreen />,
      },
      {
        name: 'Student',
        TabComponent: <StudentRegisterScreen />,
      },
    ],
    []
  );

  return (
    <Layout>
      <Tabs
        tabs={tabs}
        selectedIndex={selectedTabIndex}
        onChange={setSelectedTabIndex}
      />
    </Layout>
  );
};

export default RegisterScreen;

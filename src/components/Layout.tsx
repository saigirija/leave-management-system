import React from 'react';
import Header from './Header';

interface Props {
  children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div className='flex flex-col w-screen min-h-screen max-h-screen'>
      <Header />
      <div className='md:overflow-y-scroll flex-1'>{children}</div>
    </div>
  );
};

export default Layout;

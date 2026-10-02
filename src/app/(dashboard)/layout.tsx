import { ReactNode } from 'react';
import SideMenu from '@components/SideMenu';
import './index.css';

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className='dasboard-layout'>
      <SideMenu />
      {children}
    </div>
  );
};

export default RootLayout;

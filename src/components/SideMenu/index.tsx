import Link from 'next/link';
import SpacesList from '@features/spaces/components/SpacesList';
import IconCheck from '@icons/IconCheck';
import IconDashboard from '@icons/IconDashboard';
import './SideMenu.css';

const SideMenu = () => {
  return (
    <div className='side-menu-wrapper'>
      <div className='title'>
        <h1>Pulse</h1>
      </div>
      <span className='separator'></span>
      <Link className='menu-link' href={'/dashboard'}>
        <IconDashboard />
        Dashboard
      </Link>
      <Link className='menu-link' href={'/dashboard'}>
        <IconCheck /> My Work Items
      </Link>
      <span className='separator'></span>
      <SpacesList />
    </div>
  );
};

export default SideMenu;

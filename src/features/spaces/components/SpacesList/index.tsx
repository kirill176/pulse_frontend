'use client';

import { useMutation } from '@tanstack/react-query';
import { redirect } from 'next/navigation';
import { authApi } from '@api/authApi';
import Button from '@components/Button';
import IconPlus from '@icons/IconPlus';
import './SpacesList.css';

const SpacesList = () => {
  const { mutateAsync: logout } = useMutation({
    mutationFn: authApi.logout
  });

  const handleLogout = async () => {
    await logout().then(() => redirect('/login'));
  };

  return (
    <div className='space-list-wrapper'>
      <div className='spaces-title'>
        <span>SPACES</span>
        <Button onClick={handleLogout}>
          <IconPlus />
        </Button>
      </div>
    </div>
  );
};

export default SpacesList;

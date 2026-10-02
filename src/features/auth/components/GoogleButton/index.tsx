import Link from 'next/link';
import Button from '@components/Button';
import IconGoogle from '@icons/IconGoogle';
import './GoogleButton.css';

const GoogleButton = () => {
  const backendGoogleUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/auth/google`;

  return (
    <Link href={backendGoogleUrl} className='block w-full'>
      <Button type='button' className='google-button w-full'>
        <IconGoogle /> Continue with Google
      </Button>
    </Link>
  );
};

export default GoogleButton;

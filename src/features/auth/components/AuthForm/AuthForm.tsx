'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { authApi } from '@api/authApi';
import { AuthDto } from '@app-types/authTypes';
import Button from '@components/Button';
import { FormContainer } from '@components/FormContainer';
import Text from '@components/FormContainer/FormTypes/Text';
import './AuthForm.css';

const AuthForm = () => {
  const router = useRouter();

  const pathname = usePathname();
  const currentPage = pathname.split('/').filter(Boolean).pop();

  const isLogin = currentPage === 'login';

  const methods = useForm<AuthDto>();

  const queryClient = useQueryClient();

  const { handleSubmit } = methods;

  const onSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ['auth'] });
    router.push('/');
  };

  const { mutateAsync: login, error: loginError } = useMutation({
    mutationFn: authApi.login,
    onSuccess
  });

  const { mutateAsync: registration, error: registrationError } = useMutation({
    mutationFn: authApi.registration,
    onSuccess
  });

  const onSubmit = async (data: AuthDto) => {
    const action = isLogin ? login : registration;
    await action(data);
  };

  const errorMessage = useMemo(() => {
    if (!loginError && !registrationError) return;
    return loginError?.message ?? registrationError?.message;
  }, [loginError, registrationError]);

  return (
    <div className='login-form-wrapper'>
      <FormProvider {...methods}>
        <FormContainer onSubmit={handleSubmit(onSubmit)} className='login-form'>
          <Text {...{ name: 'email', required: true, label: 'Email' }} />
          <Text {...{ name: 'password', required: true, label: 'Password' }} />
          {errorMessage && <span className='error-message'>{errorMessage}</span>}
          <Button type='submit'>{isLogin ? 'Login' : 'Sign Up'}</Button>
        </FormContainer>
      </FormProvider>
      <div className='auth-switch'>
        {isLogin ? (
          <span>
            Don&apos;t have an account?
            <Link href='/registration'> Sign up</Link>
          </span>
        ) : (
          <span>
            Already have an account? <Link href='/login'>Log in</Link>
          </span>
        )}
      </div>
    </div>
  );
};

export default AuthForm;

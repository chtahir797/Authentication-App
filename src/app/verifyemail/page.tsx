'use client'

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

function VerifyEmailPage() {
  const [token, setToken] = useState('');
  const [verify, setVerify] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const verifyUserEmail = async () => {
    try {
      const response = await axios.post("/api/users/verifyemail", { token });
      setVerify(true);
    } catch (error: any) {
      setError('Verification failed. Redirecting to signup page...');
      console.error('Error:', error.response?.data || error.message);

      // Redirect to signup page after a short delay to show the error message
      setTimeout(() => {
        router.push('/signup');
      }, 2000); // 2 seconds delay
    }
  };

  useEffect(() => {
    if (verify) {
      router.push('/signin');
    }
  }, [verify]);

  useEffect(() => {
    console.log('Hello')
    const queryParams = new URLSearchParams(window.location.search);
    const getToken = queryParams.get('token');
    // const {query}=router
    // console.log(query.token)
    setToken(getToken || '');

    if (!getToken) {
      router.push('/signup');
      console.warn('Not allowed to stay here without a token');
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Email Verification</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <Button onClick={verifyUserEmail} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
        Verify Email
      </Button>
    </div>
  );
}

export default VerifyEmailPage;

// 'use client'

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useRouter } from 'next/navigation';
// import { Button } from '@/components/ui/button';

// function VerifyEmailPage() {
//   const [token, setToken] = useState('');
//   const [verify, setVerify] = useState(false);
//   const [error, setError] = useState('');
//   const router = useRouter();

//   const verifyUserEmail = async () => {
//     try {
//       const response = await axios.post("/api/users/verifyemail", { token });
//       setVerify(true);
//     } catch (error: any) {
//       setError('Verification failed. Redirecting to signup page...');
//       console.error('Error:', error.response?.data || error.message);

//       // Redirect to signup page after a short delay to show the error message
//       setTimeout(() => {
//         router.push('/signup');
//       }, 2000); // 2 seconds delay
//     }
//   };

//   useEffect(() => {
//     if (verify) {
//       router.push('/signin');
//     }
//   }, [verify]);

//   useEffect(() => {
//     console.log('Hello')
//     const queryParams = new URLSearchParams(window.location.search);
//     const getToken = queryParams.get('token');
//     // const {query}=router
//     // console.log(query.token)
//     setToken(getToken || '');

//     if (!getToken) {
//       router.push('/signup');
//       console.warn('Not allowed to stay here without a token');
//     }
//   }, []);

//   return (
//     <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
//       <h1 className="text-2xl font-bold mb-4">Email Verification</h1>
//       {error && <p className="text-red-500 mb-4">{error}</p>}
//       <Button onClick={verifyUserEmail} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
//         Verify Email
//       </Button>
//     </div>
//   );
// }

// export default VerifyEmailPage;










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

      setTimeout(() => {
        router.push('/signup');
      }, 2000);
    }
  };

  useEffect(() => {
    if (verify) {
      router.push('/signin');
    }
  }, [verify, router]);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const getToken = queryParams.get('token');
    setToken(getToken || '');

    if (!getToken) {
      setError('No token found. Redirecting to signup page...');
      setTimeout(() => {
        router.push('/signup');
      }, 2000);
    } else {
      verifyUserEmail();
    }
  }, [router]);

  return (
    <section className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-indigo-500 to-purple-600 p-6">
      <h1 className="text-center text-5xl text-white font-semibold mb-8">
        Verify Email
      </h1>
      <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg">
        {error && (
          <p className="text-red-500 mb-6">{error}</p>
        )}
        <Button
          onClick={() => router.push('/signin')}
          className="w-full py-3 text-white bg-indigo-700 rounded-md hover:bg-indigo-800 focus:outline-none focus:ring-4 focus:ring-indigo-500"
        >
          {verify ? 'Verified! Sign In' : 'Verifying...'}
        </Button>
      </div>
    </section>
  );
}

export default VerifyEmailPage;

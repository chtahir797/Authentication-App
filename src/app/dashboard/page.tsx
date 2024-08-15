'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

function Page() {
  const [userData, setUserData] = useState<string | null>(null);
  const router = useRouter();

  const getUser = async () => {
    try {
      const response = await axios.post('/api/users/me');
      setUserData(response.data.data._id);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const logout = async () => {
    await axios.get('/api/users/logout');
    console.log('Logout Success');
    router.push('/signin');
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="p-6 space-y-4 max-w-min mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Welcome to Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          {userData && (
            <div className="space-y-2">
              <p className="text-lg">User ID: <span className="font-semibold">{userData}</span></p>
              <Link href={`/dashboard/${userData}`}>
                <Button variant="outline" className="w-full">Go to Profile</Button>
              </Link>
            </div>
          )}
          <Button onClick={logout} className="w-full mt-4">Logout</Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default Page;

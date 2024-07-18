'use client';

import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

const HomePage: React.FC = () => {
  const { data: session, status } = useSession();
  const loading = status === 'loading';
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push('/home');
    }
  }, [session, router]);

  if (loading) {
    return <p className='text-center'>Loading...</p>;
  }

  return (
    <main>
      <h1 className="text-center text-5xl m-4">Welcome to P.L.U.M.S!!!</h1>
      <p className='text-center text-2xl m-4'>We have Oranges and lemons as well.</p>
      {!session ? (
        <>
          <p className="text-center  text-2xl border-4 w-1/4 m-auto border-purple-500">Sign in to access the app</p>
          <div className="text-center m-4">
            <button onClick={() => signIn('google')} className="btn btn-primary m-2 bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded ">
              Sign in with Google
            </button>
            <button onClick={() => signIn('github')} className="btn btn-primary m-2 bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">
              Sign in with GitHub
            </button>
          </div>
        </>
      ) : (
        <p className="text-center">Redirecting...</p>
      )}
    </main>
  );
};

export default HomePage;

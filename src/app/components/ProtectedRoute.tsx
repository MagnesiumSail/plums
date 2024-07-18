import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { data: session, status } = useSession();
  const loading = status === 'loading';
  const router = useRouter();
  const [showLoginMessage, setShowLoginMessage] = useState(false);

  useEffect(() => {
    if (!loading && !session) {
      setShowLoginMessage(true);
      const timer = setTimeout(() => {
        setShowLoginMessage(false);
        router.push('/');
      }, 3000); 
      return () => clearTimeout(timer);
    }
  }, [loading, session, router]);

  if (loading) {
    return <p>Loading...</p>; 
  }

  if (showLoginMessage) {
    return (
      <div className="fixed top-60 left-0 right-0 bg-purple-600 text-white text-center text-xl py-3 w-1/3 m-auto">
        Please login to access this page.
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;

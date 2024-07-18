'use client';

import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from "next/image";

const HomePage: React.FC = () => {
  const { data: session, status } = useSession();
  const [showAlert, setShowAlert] = useState(false);
  const router = useRouter();
  
  useEffect(() => {
    if (session && !localStorage.getItem('loggedIn')) {
      setShowAlert(true);
      localStorage.setItem('loggedIn', 'true');
      const timer = setTimeout(() => setShowAlert(false), 4000); 
      return () => clearTimeout(timer); 
    }
  }, [status]);

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  return (
    <main>
      {showAlert && (
        <div className="fixed top-40 left-0 right-0 bg-purple-900 text-white text-center text-xl py-3 w-1/3 m-auto">
          Welcome, {session?.user?.name}!
        </div>
      )}
      <section
        className="h-96 text-black py-16 px-8"
      >
        <div className="container mx-auto flex flex-col items-center justify-center h-full">
          <h1 className="text-5xl font-bold text-center m-4">
            Welcome to P.L.U.M.S
          </h1>
          <h2 className="text-4xl font-bold text-center">
            Enhance Your Learning Journey
          </h2>
          <p className="text-xl mt-4 text-center">
            Join our community and unlock the power of learning.
          </p>
          <a
            href="/signup"
            className="mt-8 bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded"
          >
            Get Started
          </a>
        </div>
      </section>
      <section className="container mx-auto text-center m-4">
        <h2 className="text-3xl font-semibold">What We Offer</h2>
        <p className="text-black mt-4 mb-8">
          A quick overview of the features and benefits of our learning
          management system.
        </p>
        <div className="flex flex-wrap justify-center gap-8">
          <div className="w-full md:w-1/3 p-4 bg-white hover:bg-purple-500 hover:text-white shadow-lg rounded-lg" onClick={() => handleNavigation('/topics')}>
            <h3 className="text-2xl font-semibold">Access All Your Content</h3>
            <p className="mt-2">
              Access a wide range of topics from technology to business to art or whatever it is that intrigues you to learn about.
            </p>
          </div>
          <div className="w-full md:w-1/3 p-4 bg-white hover:bg-purple-500 hover:text-white shadow-lg rounded-lg" onClick={() => handleNavigation('/topics/add')}>
            <h3 className="text-2xl font-semibold">Create Your Own Study Content</h3>
            <p className="mt-2">
              Enjoy the ability to create your own study content whether it's a topic of interest, a note, uploading attachments and images or including links to informative websites.
            </p>
          </div>
        </div>
      </section>
      <section className="bg-purple-500 text-white py-12">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold">Ready to Start?</h2>
          <p className="text-xl mt-4">
            Sign up today and start your learning adventure with us!
          </p>
          <a
            href="/signup"
            className="mt-8 inline-block bg-purple-800 text-white hover:bg-purple-700 hover:text-white font-bold py-2 px-4 rounded"
          >
            Sign Up Now
          </a>
        </div>
      </section>
    </main>
  );
};

export default HomePage;

'use client';

import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import Image from "next/image";

const HomePage: React.FC = () => {
  const { data: session, status } = useSession();
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    if (session && !localStorage.getItem('loggedIn')) {
      setShowAlert(true);
      localStorage.setItem('loggedIn', 'true');
      const timer = setTimeout(() => setShowAlert(false), 4000); 
      return () => clearTimeout(timer); 
    }
  }, [session]);

  return (
    <main>
      {showAlert && (
        <div className="fixed top-40 left-0 right-0 bg-purple-900 text-white text-center text-xl py-3 w-1/3 m-auto">
          Welcome, {session?.user?.name}!
        </div>
      )}
      <section
        className="bg-cover bg-center h-96 text-black py-24 px-8"
        style={{ backgroundImage: "url('your-hero-image.jpg')" }}
      >
        <div className="container mx-auto flex flex-col items-center justify-center h-full">
          <h1 className="text-4xl font-bold text-center">
            Enhance Your Learning Journey
          </h1>
          <p className="text-xl mt-4 text-center">
            Join our community of learners and gain access to premium courses.
          </p>
          <a
            href="/signup"
            className="mt-8 bg-purple-500 hover:bg-purple-600 text-black font-bold py-2 px-4 rounded"
          >
            Get Started
          </a>
        </div>
      </section>
      <section className="container mx-auto text-center py-12">
        <h2 className="text-3xl font-semibold">What We Offer</h2>
        <p className="text-gray-600 mt-4 mb-8">
          A quick overview of the features and benefits of our learning
          management system.
        </p>
        <div className="flex flex-wrap justify-center gap-8">
          <div className="w-full md:w-1/3 p-4 bg-white shadow-lg rounded-lg">
            <h3 className="text-2xl font-semibold">Diverse Courses</h3>
            <p className="mt-2">
              Wide range of topics from technology to business to art.
            </p>
          </div>
          <div className="w-full md:w-1/3 p-4 bg-white shadow-lg rounded-lg">
            <h3 className="text-2xl font-semibold">Interactive Learning</h3>
            <p className="mt-2">
              Engage with interactive lessons and hands-on projects.
            </p>
          </div>
          <div className="w-full md:w-1/3 p-4 bg-white shadow-lg rounded-lg">
            <h3 className="text-2xl font-semibold">Expert Instructors</h3>
            <p className="mt-2">
              Learn from industry leaders and academic experts.
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
            href="/register"
            className="mt-8 inline-block bg-purple-800 text-white hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
          >
            Sign Up Now
          </a>
        </div>
      </section>
    </main>
  );
};

export default HomePage;

'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import ProtectedRoute from '../components/ProtectedRoute';

const TopicsPage = () => {
  const [topics, setTopics] = useState([]);
  const router = useRouter();

  useEffect(() => {
    async function fetchTopics() {
      try {
        const response = await fetch('/api/topics');
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        setTopics(data);
      } catch (error) {
        console.error('Error fetching topics:', error);
      }
    }

    fetchTopics();
  }, []);

  return (
    <ProtectedRoute>
    <main className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-4">Topics</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {topics.map(topic => (
          <div key={topic.id} className="bg-white shadow-md rounded-lg p-4 w-2/3">
            <h3 className="text-lg font-bold">{topic.title}</h3>
            <p>{topic.description}</p>
            <Link href={`/topics/${topic.id}`} legacyBehavior>
              <a className="text-purple-500 underline mt-2 inline-block">View Details</a>
            </Link>
          </div>
        ))}
      </div>
    </main>
    </ProtectedRoute>
  );
};

export default TopicsPage;

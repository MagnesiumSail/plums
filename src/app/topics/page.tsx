'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    async function fetchTopics() {
      const response = await fetch('/api/topics');
      const data = await response.json();
      setTopics(data);
    }

    fetchTopics();
  }, []);

  return (
    <main className="container mx-auto py-8 px-4">
      <section>
        <h1 className="text-2xl font-bold mb-4">Course Topics</h1>
        <div className="space-y-4">
          {topics.map(topic => (
            <div key={topic.id} className="bg-gray-100 rounded-lg shadow px-4 py-2">
              <Link href={`/topics/${topic.id}`} className="w-full text-left text-lg font-semibold py-2 focus:outline-none">
                {topic.title}
              </Link>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

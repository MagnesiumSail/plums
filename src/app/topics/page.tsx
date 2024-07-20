'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import ProtectedRoute from '../components/ProtectedRoute';
import ModalForm from '../components/forms/AddTagModal';

const TopicsPage = () => {
  const [topics, setTopics] = useState<any[]>([]);
  const [tags, setTags] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filteredTopics, setFilteredTopics] = useState<any[]>([]);
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
        setFilteredTopics(data);
      } catch (error) {
        console.error('Error fetching topics:', error);
      }
    }

    async function fetchTags() {
      try {
        const response = await fetch('/api/tags');
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        setTags(data);
      } catch (error) {
        console.error('Error fetching tags:', error);
      }
    }

    fetchTopics();
    fetchTags();
  }, []);

  const handleTagClick = (tagId: string) => {
    const filtered = topics.filter(topic =>
      topic.tags.some((tag: any) => tag.id === tagId)
    );
    setFilteredTopics(filtered);
  };

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <ProtectedRoute>
      <main className="container mx-auto py-8 px-4">
        <h1 className="text-2xl font-bold mb-4">Topics</h1>
        <div className="mb-4">
          <button
            onClick={handleModalOpen}
            className="px-4 py-2 bg-purple-500 text-white rounded"
          >
            Create Tag
          </button>
        </div>
        <div className="mb-4">
          {tags.map(tag => (
            <button
              key={tag.id}
              onClick={() => handleTagClick(tag.id)}
              className="px-2 py-1 bg-gray-200 rounded mr-2 mb-2"
            >
              {tag.name}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTopics.map(topic => (
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
      <ModalForm isOpen={isModalOpen} onClose={handleModalClose} topics={topics} />
    </ProtectedRoute>
  );
};

export default TopicsPage;

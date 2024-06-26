'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import CustomSelect from '../../components/CustomSelect';

export default function TopicDetails() {
  const { id } = useParams();
  const [topic, setTopic] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('notes');

  useEffect(() => {
    async function fetchTopic() {
      const response = await fetch(`/api/topics/${id}`);
      const data = await response.json();
      setTopic(data);
    }

    fetchTopic();
  }, [id]);

  if (!topic) {
    return <div>Loading...</div>;
  }

  const categories = [
    { id: 'notes', title: 'Notes' },
    { id: 'images', title: 'Images' },
    { id: 'attachments', title: 'Attachments' }
  ];

  const renderContent = () => {
    switch (selectedCategory) {
      case 'notes':
        return (
          <>
            <h2 className="text-xl font-bold mb-2">Notes</h2>
            <ul className="mb-4">
              {topic.notes.map(note => (
                <li key={note.id}>{note.title}: {note.content}</li>
              ))}
            </ul>
          </>
        );
      case 'images':
        return (
          <>
            <h2 className="text-xl font-bold mb-2">Images</h2>
            <ul className="mb-4">
              {topic.images.map(image => (
                <li key={image.id}>
                  <img src={image.url} alt={image.name} className="w-24 h-24 object-cover" />
                  {image.name}: {image.description}
                </li>
              ))}
            </ul>
          </>
        );
      case 'attachments':
        return (
          <>
            <h2 className="text-xl font-bold mb-2">Attachments</h2>
            <ul className="mb-4">
              {topic.attachments.map(attachment => (
                <li key={attachment.id}>
                  <a href={attachment.fileUrl} download>{attachment.fileName}</a>: {attachment.description}
                </li>
              ))}
            </ul>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <main className="container mx-auto py-8 px-4">
      <section>
        <h1 className="text-2xl font-bold mb-4">{topic.title}</h1>
        <p className="mb-4">{topic.description}</p>

        <label htmlFor="category" className="block mb-2 text-lg font-bold">Content</label>
        <CustomSelect
          options={categories}
          value={selectedCategory}
          onChange={setSelectedCategory}
        />

        {renderContent()}

        <Link href="/topics" legacyBehavior>
          <a className="inline-block bg-purple-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50">
            Back to Topics
          </a>
        </Link>
      </section>
    </main>
  );
}

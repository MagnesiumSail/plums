'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import CustomSelect from '../../components/CustomSelect';
import Modal from '../../components/Modal';
import AddImageForm from '../../components/forms/AddImageForm';

export default function TopicDetails() {
  const { id } = useParams();
  const router = useRouter();
  const [topic, setTopic] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('notes');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    async function fetchTopic() {
      const response = await fetch(`/api/topics/${id}`);
      if (response.ok) {
        const data = await response.json();
        console.log('Fetched topic:', data); 
        setTopic(data);
      } else {
        console.error('Failed to fetch topic');
      }
    }

    fetchTopic();

    const queryParams = new URLSearchParams(window.location.search);
    if (queryParams.get('success') === 'true') {
      setShowSuccessMessage(true);
      setTimeout(() => setShowSuccessMessage(false), 3000); 
    }
  }, [id]);

  if (!topic) {
    return <div>Loading...</div>;
  }

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleItemUpdate = (item) => {
    setSelectedItem(item);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleItemDelete = async (item) => {
    const confirmDelete = confirm("Are you sure you want to delete this item?");
    if (!confirmDelete) return;

    const apiEndpoint = `/api/${selectedCategory}/${item.id}`;
    try {
      const response = await fetch(apiEndpoint, {
        method: 'DELETE',
      });

      if (response.ok) {
        console.log('Item deleted successfully');
        setTopic(prevTopic => ({
          ...prevTopic,
          [selectedCategory]: prevTopic[selectedCategory].filter(i => i.id !== item.id),
        }));
        setIsModalOpen(false);
      } else {
        console.error('Failed to delete item');
      }
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const handleFormSubmit = async (formData) => {
    const apiEndpoint = `/api/${selectedCategory}/${selectedItem.id}`;
    try {
      const response = await fetch(apiEndpoint, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const updatedItem = await response.json();
        setTopic(prevTopic => ({
          ...prevTopic,
          [selectedCategory]: prevTopic[selectedCategory].map(i => i.id === updatedItem.id ? updatedItem : i),
        }));
        setIsModalOpen(false);
        setShowSuccessMessage(true);
        setTimeout(() => setShowSuccessMessage(false), 3000);
      } else {
        console.error('Failed to update item');
      }
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  const renderContent = () => {
    if (!topic || !topic[selectedCategory]) {
      return null;
    }

    switch (selectedCategory) {
      case 'notes':
        return (
          <>
            <h2 className="text-xl font-bold mb-2">Notes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4 w-4/5">
              {topic.notes.map(note => (
                <div key={note.id} className="bg-white shadow-md rounded-lg p-4 cursor-pointer">
                  <h3 className="text-lg font-bold">{note.title}</h3>
                  <button
                    className="bg-blue-500 text-white py-1 px-2 rounded mt-2"
                    onClick={() => handleItemUpdate(note)}
                  >
                    Update
                  </button>
                  <button
                    className="bg-red-500 text-white py-1 px-2 rounded mt-2 ml-2"
                    onClick={() => handleItemDelete(note)}
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </>
        );
      case 'images':
        return (
          <>
            <h2 className="text-xl font-bold mb-2">Images</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4 w-4/5">
              {topic.images.map(image => (
                <div key={image.id} className="bg-white shadow-md rounded-lg p-4 cursor-pointer">
                  <h3 className="text-lg font-bold">{image.name}</h3>
                  <button
                    className="bg-blue-500 text-white py-1 px-2 rounded mt-2"
                    onClick={() => handleItemUpdate(image)}
                  >
                    Update
                  </button>
                  <button
                    className="bg-red-500 text-white py-1 px-2 rounded mt-2 ml-2"
                    onClick={() => handleItemDelete(image)}
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </>
        );
      case 'links':
        return (
          <>
            <h2 className="text-xl font-bold mb-2">Links</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4 w-4/5">
              {topic.links.map(link => (
                <div key={link.id} className="bg-white shadow-md rounded-lg p-4 cursor-pointer">
                  <h3 className="text-lg font-bold">{link.fileUrl}</h3>
                  <button
                    className="bg-blue-500 text-white py-1 px-2 rounded mt-2"
                    onClick={() => handleItemUpdate(link)}
                  >
                    Update
                  </button>
                  <button
                    className="bg-red-500 text-white py-1 px-2 rounded mt-2 ml-2"
                    onClick={() => handleItemDelete(link)}
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </>
        );
      case 'children':
        return (
          <>
            <h2 className="text-xl font-bold mb-2">Sub Topics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4 w-4/5">
              {topic.children.map(subTopic => (
                <div key={subTopic.id} className="bg-white shadow-md rounded-lg p-4 cursor-pointer">
                  <h3 className="text-lg font-bold">{subTopic.title}</h3>
                  <button
                    className="bg-blue-500 text-white py-1 px-2 rounded mt-2"
                    onClick={() => handleItemUpdate(subTopic)}
                  >
                    Update
                  </button>
                  <button
                    className="bg-red-500 text-white py-1 px-2 rounded mt-2 ml-2"
                    onClick={() => handleItemDelete(subTopic)}
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <main className="container mx-auto py-8 px-4">
      <section>
        {showSuccessMessage && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
            <strong className="font-bold">Success!</strong>
            <span className="block sm:inline"> The item was updated successfully.</span>
          </div>
        )}

        <h1 className="text-2xl font-bold mb-4">{topic.title}</h1>
        <p className="mb-4">{topic.description}</p>

        <label htmlFor="category" className="block mb-2 text-lg font-bold">Content</label>
        <CustomSelect
          options={[
            { id: 'notes', title: 'Notes' },
            { id: 'images', title: 'Images' },
            { id: 'links', title: 'Links' },
            { id: 'children', title: 'Sub Topics' },
          ]}
          value={selectedCategory}
          onChange={setSelectedCategory}
        />

        {renderContent()}

        <Link href="/topics">
          <div className="inline-block bg-purple-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50">
            Back to Topics
          </div>
        </Link>
      </section>

      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          {selectedItem && (
            <div className="p-4">
              <h2 className="text-2xl font-bold mb-4">{selectedItem.title || selectedItem.name || selectedItem.fileName}</h2>
              <p>{selectedItem.content || selectedItem.description || ''}</p>
              {selectedItem.url && <img src={selectedItem.url} alt={selectedItem.name} className="w-full h-48 object-cover mb-2" />}
              {selectedItem.fileUrl && <a href={selectedItem.fileUrl} download className="text-blue-500 underline">{selectedItem.fileName}</a>}
              {isEditing && selectedCategory === 'images' ? (
                <AddImageForm image={selectedItem} onSubmit={handleFormSubmit} />
              ) : (
                <form onSubmit={(e) => {
                  e.preventDefault();
                  handleFormSubmit(selectedItem);
                }}>
                  <input
                    type="text"
                    value={selectedItem.title || selectedItem.name || selectedItem.fileName}
                    onChange={(e) => setSelectedItem({ ...selectedItem, title: e.target.value })}
                    className="w-full mb-4 p-2 border border-gray-300 rounded"
                    required
                  />
                  <textarea
                    value={selectedItem.content || selectedItem.description || ''}
                    onChange={(e) => setSelectedItem({ ...selectedItem, content: e.target.value })}
                    className="w-full mb-4 p-2 border border-gray-300 rounded"
                    required
                  />
                  <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">Save</button>
                  <button type="button" className="bg-gray-500 text-white py-2 px-4 rounded ml-2" onClick={() => setIsModalOpen(false)}>Cancel</button>
                </form>
              )}
            </div>
          )}
        </Modal>
      )}
    </main>
  );
}

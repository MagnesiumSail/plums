import React, { useState, useEffect } from 'react';

interface Topic {
  id: string;
  title: string;
}

interface AddTagModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const AddTagModal: React.FC<AddTagModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [name, setName] = useState('');
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [topics, setTopics] = useState<Topic[]>([]);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/tags', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      });

      if (response.ok) {
        const tag = await response.json();
        await Promise.all(
          selectedTopics.map(async (topicId) => {
            await fetch('/api/topics/tags', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ topicId, tagId: tag.id }),
            });
          })
        );

        setName('');
        setSelectedTopics([]);
        onSuccess();
        onClose();
      } else {
        console.error('Failed to create tag');
      }
    } catch (error) {
      console.error('Error creating tag:', error);
    }
  };

  return isOpen ? (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Add Tag</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Tag Name"
            className="w-full mb-4 p-2 border border-gray-300 rounded"
            required
          />
          <div className="mb-4">
            <label className="block mb-2 font-bold">Select Topics</label>
            {topics.map((topic) => (
              <div key={topic.id} className="mb-2">
                <label>
                  <input
                    type="checkbox"
                    value={topic.id}
                    checked={selectedTopics.includes(topic.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedTopics([...selectedTopics, topic.id]);
                      } else {
                        setSelectedTopics(selectedTopics.filter((id) => id !== topic.id));
                      }
                    }}
                  />
                  <span className="ml-2">{topic.title}</span>
                </label>
              </div>
            ))}
          </div>
          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">Add Tag</button>
          <button type="button" className="bg-gray-500 text-white py-2 px-4 rounded ml-2" onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  ) : null;
};

export default AddTagModal;

'use client';

import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import CustomSelect from '../CustomSelect';

interface AddTopicFormProps {
  topics: { id: string; title: string }[];
  onSubmit: (formData: { title: string; description: string; parentId?: string }) => void;
}

const AddTopicForm: React.FC<AddTopicFormProps> = ({ topics, onSubmit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [parentId, setParentId] = useState<string | undefined>(undefined);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    onSubmit({ title, description, parentId });
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-lg">
      <div className="mb-4">
        <label htmlFor="title" className="block text-lg font-medium m-2">
          Title
        </label>
        <input
          id="title"
          type="text"
          className="w-full border border-gray-300 rounded-lg p-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="description" className="block text-lg font-medium m-2">
          Description
        </label>
        <textarea
          id="description"
          className="w-full border border-gray-300 rounded-lg p-2"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>
      </div>

      <div className="mb-4">
        <label htmlFor="parentId" className="block text-lg font-medium m-2">
          Parent Topic
        </label>
        <CustomSelect
          options={topics.map(topic => ({ id: topic.id, title: topic.title }))}
          value={parentId || ''}
          onChange={(value: string) => setParentId(value)}
        />
      </div>

      <div className="mb-4">
        <button type="submit" className="w-full bg-purple-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50">
          Add Topic
        </button>
      </div>
    </form>
  );
};

export default AddTopicForm;

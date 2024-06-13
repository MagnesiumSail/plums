"use client";

import React, { useState, FormEvent, ChangeEvent } from 'react';

interface AddTopicFormProps {
  onSubmit: (formData: { topicTitle: string; topicDescription: string }) => void;
}

const AddTopicForm: React.FC<AddTopicFormProps> = ({ onSubmit }) => {
  const [topicTitle, setTopicTitle] = useState<string>('');
  const [topicDescription, setTopicDescription] = useState<string>('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = { topicTitle, topicDescription };
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-1/2 mx-auto">
      <div className="mb-4">
        <label htmlFor="topicTitle" className="block text-gray-700 font-bold mb-2">
          Topic Title
        </label>
        <input 
          type="text" 
          id="topicTitle" 
          name="topicTitle" 
          value={topicTitle} 
          onChange={(e: ChangeEvent<HTMLInputElement>) => setTopicTitle(e.target.value)} 
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required 
        />
      </div>
      <div className="mb-4">
        <label htmlFor="topicDescription" className="block text-gray-700 font-bold mb-2">
          Description
        </label>
        <textarea 
          id="topicDescription" 
          name="topicDescription" 
          value={topicDescription} 
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setTopicDescription(e.target.value)} 
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required 
        ></textarea>
      </div>
      <button 
        type="submit" 
        className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        Add Topic
      </button>
    </form>
  );
};

export default AddTopicForm;
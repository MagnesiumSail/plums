"use client";

import React, { useState, FormEvent, ChangeEvent } from 'react';

interface AddAttachmentFormProps {
  onSubmit: (formData: { fileName: string; fileUrl: string; description: string; topicId: string }) => void;
}

const AddAttachmentForm: React.FC<AddAttachmentFormProps> = ({ onSubmit }) => {
  const [fileName, setFileName] = useState<string>('');
  const [fileUrl, setFileUrl] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [topicId, setTopicId] = useState<string>('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = { fileName, fileUrl, description, topicId };
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-1/2 mx-auto">
      <div className="mb-4">
        <label htmlFor="fileName" className="block text-gray-700 font-bold mb-2">
          Attachment Name
        </label>
        <input 
          type="text" 
          id="fileName" 
          name="fileName" 
          value={fileName} 
          onChange={(e: ChangeEvent<HTMLInputElement>) => setFileName(e.target.value)} 
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required 
        />
      </div>
      <div className="mb-4">
        <label htmlFor="fileUrl" className="block text-gray-700 font-bold mb-2">
          Attachment URL
        </label>
        <input 
          type="url" 
          id="fileUrl" 
          name="fileUrl" 
          value={fileUrl} 
          onChange={(e: ChangeEvent<HTMLInputElement>) => setFileUrl(e.target.value)} 
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required 
        />
      </div>
      <div className="mb-4">
        <label htmlFor="description" className="block text-gray-700 font-bold mb-2">
          Description
        </label>
        <textarea 
          id="description" 
          name="description" 
          value={description} 
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)} 
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required 
        ></textarea>
      </div>
      <button 
        type="submit" 
        className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        Add Attachment
      </button>
    </form>
  );
};

export default AddAttachmentForm;

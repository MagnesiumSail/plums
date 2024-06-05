"use client";

import React, { useState, FormEvent, ChangeEvent } from 'react';

interface AddAttachmentFormProps {
  onSubmit: (formData: FormData) => void;
}

const AddAttachmentForm: React.FC<AddAttachmentFormProps> = ({ onSubmit }) => {
  const [attachmentTitle, setAttachmentTitle] = useState<string>('');
  const [attachmentFile, setAttachmentFile] = useState<File | null>(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('title', attachmentTitle);
    if (attachmentFile) {
      formData.append('file', attachmentFile);
    }
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-1/2 mx-auto">
      <div className="mb-4">
        <label htmlFor="attachmentTitle" className="block text-gray-700 font-bold mb-2">
          Attachment Title
        </label>
        <input 
          type="text" 
          id="attachmentTitle" 
          name="attachmentTitle" 
          value={attachmentTitle} 
          onChange={(e: ChangeEvent<HTMLInputElement>) => setAttachmentTitle(e.target.value)} 
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required 
        />
      </div>
      <div className="mb-4">
        <label htmlFor="attachmentFile" className="block text-gray-700 font-bold mb-2">
          Upload Attachment
        </label>
        <input 
          type="file" 
          id="attachmentFile" 
          name="attachmentFile" 
          onChange={(e: ChangeEvent<HTMLInputElement>) => setAttachmentFile(e.target.files?.[0] || null)} 
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required 
        />
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

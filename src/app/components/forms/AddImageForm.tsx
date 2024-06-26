"use client";

import React, { useState, FormEvent, ChangeEvent } from 'react';

interface AddImageFormProps {
  onSubmit: (formData: { name: string; description: string; image: string }) => void;
}

const AddImageForm: React.FC<AddImageFormProps> = ({ onSubmit }) => {
  const [imageTitle, setImageTitle] = useState<string>('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [description, setDescription] = useState<string>('');

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setImageFile(file);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!imageFile) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      const formData = {
        name: imageTitle,
        description,
        image: base64String,
      };
      onSubmit(formData);
    };
    reader.readAsDataURL(imageFile);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-1/2 mx-auto">
      <div className="mb-4">
        <label htmlFor="imageTitle" className="block text-gray-700 font-bold mb-2">
          Image Title
        </label>
        <input 
          type="text" 
          id="imageTitle" 
          name="imageTitle" 
          value={imageTitle} 
          onChange={(e: ChangeEvent<HTMLInputElement>) => setImageTitle(e.target.value)} 
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
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
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          required 
        />
      </div>
      <div className="mb-4">
        <label htmlFor="imageFile" className="block text-gray-700 font-bold mb-2">
          Upload Image
        </label>
        <input 
          type="file" 
          id="imageFile" 
          name="imageFile" 
          onChange={handleFileChange} 
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          required 
        />
      </div>
      <button 
        type="submit" 
        className="bg-purple-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-pruple-500 focus:ring-opacity-50"
      >
        Add Image
      </button>
    </form>
  );
};

export default AddImageForm;

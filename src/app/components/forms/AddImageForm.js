"use client";

import React, { useState } from 'react';

const AddImageForm = ({ onSubmit }) => {
  const [imageTitle, setImageTitle] = useState('');
  const [imageFile, setImageFile] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('title', imageTitle);
    formData.append('file', imageFile);
    onSubmit(formData);
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
          onChange={(e) => setImageTitle(e.target.value)} 
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
          onChange={(e) => setImageFile(e.target.files[0])} 
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required 
        />
      </div>
      <button 
        type="submit" 
        className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        Add Image
      </button>
    </form>
  );
};

export default AddImageForm;

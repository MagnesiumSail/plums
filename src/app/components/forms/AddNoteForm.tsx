"use client";

import React, { useState, FormEvent, ChangeEvent } from 'react';

interface AddNoteFormProps {
  onSubmit: (formData: { noteTitle: string; noteContent: string }) => void;
}

const AddNoteForm: React.FC<AddNoteFormProps> = ({ onSubmit }) => {
  const [noteTitle, setNoteTitle] = useState<string>('');
  const [noteContent, setNoteContent] = useState<string>('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = { noteTitle, noteContent };
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-1/2 mx-auto">
      <div className="mb-4">
        <label htmlFor="noteTitle" className="block text-gray-700 font-bold mb-2">
          Note Title
        </label>
        <input 
          type="text" 
          id="noteTitle" 
          name="noteTitle" 
          value={noteTitle} 
          onChange={(e: ChangeEvent<HTMLInputElement>) => setNoteTitle(e.target.value)} 
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required 
        />
      </div>
      <div className="mb-4">
        <label htmlFor="noteContent" className="block text-gray-700 font-bold mb-2">
          Content
        </label>
        <textarea 
          id="noteContent" 
          name="noteContent" 
          value={noteContent} 
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setNoteContent(e.target.value)} 
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required 
        ></textarea>
      </div>
      <button 
        type="submit" 
        className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        Add Note
      </button>
    </form>
  );
};

export default AddNoteForm;

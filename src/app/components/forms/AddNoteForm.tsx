import React, { useState, useEffect } from 'react';

interface AddNoteFormProps {
  note?: any;
  onSubmit: (formData: { title: string; content: string }) => void;
}

const AddNoteForm: React.FC<AddNoteFormProps> = ({ note, onSubmit }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
    }
  }, [note]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit({ title, content });
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-lg">
      <div className="mb-4">
        <label htmlFor="title" className="block text-lg font-medium m-2">Title</label>
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
        <label htmlFor="content" className="block text-lg font-medium m-2">Content</label>
        <textarea
          id="content"
          className="w-full border border-gray-300 rounded-lg p-2"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        ></textarea>
      </div>
      <div className="mb-4">
        <button type="submit" className="w-full bg-purple-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50">
          {note ? 'Update Note' : 'Add Note'}
        </button>
      </div>
    </form>
  );
};

export default AddNoteForm;

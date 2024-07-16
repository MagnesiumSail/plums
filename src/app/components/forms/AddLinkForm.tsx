import React, { useState, useEffect } from 'react';

interface AddLinkFormProps {
  link?: any;
  onSubmit: (formData: { fileUrl: string; description?: string }) => void;
}

const AddLinkForm: React.FC<AddLinkFormProps> = ({ link, onSubmit }) => {
  const [fileUrl, setFileUrl] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (link) {
      setFileUrl(link.fileUrl);
      setDescription(link.description || '');
    }
  }, [link]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit({ fileUrl, description });
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-lg">
      <div className="mb-4">
        <label htmlFor="fileUrl" className="block text-lg font-medium m-2">URL</label>
        <input
          id="fileUrl"
          type="text"
          className="w-full border border-gray-300 rounded-lg p-2"
          value={fileUrl}
          onChange={(e) => setFileUrl(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="description" className="block text-lg font-medium m-2">Description</label>
        <textarea
          id="description"
          className="w-full border border-gray-300 rounded-lg p-2"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </div>
      <div className="mb-4">
        <button type="submit" className="w-full bg-purple-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50">
          {link ? 'Update Link' : 'Add Link'}
        </button>
      </div>
    </form>
  );
};

export default AddLinkForm;

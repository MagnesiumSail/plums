import React, { useState, useEffect } from 'react';

interface AddImageFormProps {
  image?: any;
  topics: { id: string; title: string }[];
  onSubmit: (formData: { name: string; description?: string; file?: string; topicId: string }) => void;
}

const AddImageForm: React.FC<AddImageFormProps> = ({ image, topics = [], onSubmit }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState<string | null>(null);
  const [topicId, setTopicId] = useState('');
  const [existingFileUrl, setExistingFileUrl] = useState<string | null>(null);

  useEffect(() => {
    if (image) {
      setName(image.name);
      setDescription(image.description || '');
      setExistingFileUrl(image.url || null);
      setTopicId(image.topicId || '');
    }
  }, [image]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFile(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const formData: any = { name, description, topicId };
    if (file) {
      formData.file = file;
    }
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-lg">
      <div className="mb-4">
        <label htmlFor="name" className="block text-lg font-medium m-2">Name</label>
        <input
          id="name"
          type="text"
          className="w-full border border-gray-300 rounded-lg p-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
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
      {existingFileUrl && (
        <div className="mb-4">
          <button
            type="button"
            className="w-full bg-purple-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
            onClick={() => setExistingFileUrl(null)}
          >
            Replace Image
          </button>
        </div>
      )}
      {!existingFileUrl && (
        <div className="mb-4">
          <label htmlFor="file" className="block text-lg font-medium m-2">Select Image</label>
          <input
            id="file"
            type="file"
            className="w-full border border-gray-300 rounded-lg p-2"
            onChange={handleFileChange}
          />
        </div>
      )}
      <div className="mb-4">
        <button type="submit" className="w-full bg-purple-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50">
          {image ? 'Update Image' : 'Add Image'}
        </button>
      </div>
    </form>
  );
};

export default AddImageForm;

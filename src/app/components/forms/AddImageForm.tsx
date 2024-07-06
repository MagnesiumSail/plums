import React, { useState, ChangeEvent, FormEvent } from 'react';

interface AddImageFormProps {
  onSubmit: (formData: { name: string; description: string; image: string }) => void;
  image?: any;
}

const AddImageForm: React.FC<AddImageFormProps> = ({ onSubmit, image }) => {
  const [name, setName] = useState(image?.name || '');
  const [description, setDescription] = useState(image?.description || '');
  const [file, setFile] = useState<string | null>(image?.url || null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setFile(reader.result as string);
    };
    if (e.target.files && e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!file) {
      alert('Please upload a file');
      return;
    }
    onSubmit({
      name,
      description,
      image: file,
    });
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
          required
        ></textarea>
      </div>
      <div className="mb-4">
        <label htmlFor="file" className="block text-lg font-medium m-2">Upload Image</label>
        <input
          id="file"
          type="file"
          className="w-full border border-gray-300 rounded-lg p-2"
          onChange={handleFileChange}
          required
        />
      </div>
      <div className="mb-4">
        <button type="submit" className="w-full bg-purple-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50">
          Save
        </button>
      </div>
    </form>
  );
};

export default AddImageForm;

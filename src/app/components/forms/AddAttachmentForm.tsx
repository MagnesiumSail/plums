import React, { useState, useEffect } from 'react';

interface AddAttachmentFormProps {
  attachment?: any;
  onSubmit: (formData: FormData) => void;
  topicId: string;
}

const AddAttachmentForm: React.FC<AddAttachmentFormProps> = ({ attachment, onSubmit, topicId }) => {
  const [fileName, setFileName] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (attachment) {
      setFileName(attachment.fileName);
      setDescription(attachment.description || '');
    }
  }, [attachment]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] || null;
    setFile(selectedFile);
    if (selectedFile) {
      setFileName(selectedFile.name);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (file) {
      const formData = new FormData();
      formData.append('fileName', fileName);
      formData.append('description', description);
      formData.append('file', file);
      formData.append('topicId', topicId);
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-lg">
      <div className="mb-4">
        <label htmlFor="fileName" className="block text-lg font-medium m-2">File Name</label>
        <input
          id="fileName"
          type="text"
          className="w-full border border-gray-300 rounded-lg p-2"
          value={fileName}
          onChange={(e) => setFileName(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="file" className="block text-lg font-medium m-2">File</label>
        <input
          id="file"
          type="file"
          className="w-full border border-gray-300 rounded-lg p-2"
          onChange={handleFileChange}
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
          {attachment ? 'Update Attachment' : 'Add Attachment'}
        </button>
      </div>
    </form>
  );
};

export default AddAttachmentForm;

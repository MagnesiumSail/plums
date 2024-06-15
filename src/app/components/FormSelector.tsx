"use client";

import React, { useState, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import AddTopicForm from './forms/AddTopicForm';
import AddNoteForm from './forms/AddNoteForm';
import AddAttachmentForm from './forms/AddAttachmentForm';
import AddImageForm from './forms/AddImageForm';

const FormSelector: React.FC = () => {
  const [selectedForm, setSelectedForm] = useState<string>('');
  const router = useRouter();

  const handleFormSelection = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedForm(event.target.value);
  };

  const handleFormSubmit = async (formData: any) => {
    console.log('Submitting form with data:', formData);

    let apiEndpoint = '';
    switch (selectedForm) {
      case 'addTopic':
        apiEndpoint = '/api/topics';
        break;
      case 'addNote':
        apiEndpoint = '/api/notes';
        break;
      case 'addAttachment':
        apiEndpoint = '/api/attachments';
        break;
      case 'addImage':
        apiEndpoint = '/api/images';
        break;
      default:
        return;
    }

    try {
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('Form submitted successfully');
        router.push('/topics?success=true');
      } else {
        console.error('Failed to add item');
      }
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  const renderForm = () => {
    switch (selectedForm) {
      case 'addTopic':
        return <AddTopicForm onSubmit={handleFormSubmit} />;
      case 'addNote':
        return <AddNoteForm onSubmit={handleFormSubmit} />;
      case 'addAttachment':
        return <AddAttachmentForm onSubmit={handleFormSubmit} />;
      case 'addImage':
        return <AddImageForm onSubmit={handleFormSubmit} />;
      default:
        return null;
    }
  };

  return (
    <div className='flex flex-col items-center'>
      <div className="mb-4">
        <label htmlFor="formSelect" className="block text-lg font-medium m-2 text-center">
          Select Item Type
        </label>
        <select
          id="formSelect"
          className="w-full border border-gray-300 rounded-lg p-2"
          onChange={handleFormSelection}
          value={selectedForm}
        >
          <option value="">-- Select --</option>
          <option value="addTopic">Add Topic</option>
          <option value="addNote">Add Note</option>
          <option value="addAttachment">Add Attachment</option>
          <option value="addImage">Add Image</option>
        </select>
      </div>
      {renderForm()}
    </div>
  );
};

export default FormSelector;

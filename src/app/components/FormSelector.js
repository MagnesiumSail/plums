"use client";

import React, { useState } from 'react';
import AddTopicForm from './forms/AddTopicForm';
import AddNoteForm from './forms/AddNoteForm';
import AddAttachmentForm from './forms/AddAttachmentForm';
import AddImageForm from './forms/AddImageForm';

const FormSelector = () => {
  const [selectedForm, setSelectedForm] = useState('');

  const handleFormSelection = (event) => {
    setSelectedForm(event.target.value);
  };

const handleFormSubmit = (formData) => {
console.log('Form submitted with data:', formData);
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
    <div>
      <div className="mb-4 w-2/3 m-auto">
        <label htmlFor="formSelect" className="block text-lg font-medium m-2">
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

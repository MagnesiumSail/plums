"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AddTopicForm from './forms/AddTopicForm';
import AddNoteForm from './forms/AddNoteForm';
import AddAttachmentForm from './forms/AddAttachmentForm';
import AddImageForm from './forms/AddImageForm';
import CustomSelect from './CustomSelect';

const FormSelector: React.FC = () => {
  const [selectedForm, setSelectedForm] = useState<string>('');
  const [selectedTopicId, setSelectedTopicId] = useState<string>('');
  const [topics, setTopics] = useState([]);
  const router = useRouter();

  useEffect(() => {
    async function fetchTopics() {
      const response = await fetch('/api/topics');
      const data = await response.json();
      setTopics(data);
    }

    fetchTopics();
  }, []);

  const handleFormSelection = (value: string) => {
    setSelectedForm(value);
    setSelectedTopicId(''); 
  };

  const handleTopicSelection = (value: string) => {
    setSelectedTopicId(value);
  };

  const handleFormSubmit = async (formData: any, topicId?: string) => {
    console.log('Submitting form with data:', formData);

    let apiEndpoint = '/api/topics';
    let method = 'POST';
    let body = JSON.stringify(formData);

    if (selectedForm !== 'addTopic') {
      apiEndpoint = `/api/${selectedForm.replace('add', '').toLowerCase()}`;
      method = 'POST';
      body = JSON.stringify({
        ...formData,
        topicId: topicId || selectedTopicId,
      });
    }

    try {
      const response = await fetch(apiEndpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body,
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
        return <AddTopicForm topics={topics} onSubmit={handleFormSubmit} />;
      case 'addNote':
        return <AddNoteForm onSubmit={(formData) => handleFormSubmit(formData, selectedTopicId)} />;
      case 'addAttachment':
        return <AddAttachmentForm onSubmit={(formData) => handleFormSubmit(formData, selectedTopicId)} />;
      case 'addImage':
        return <AddImageForm onSubmit={(formData) => handleFormSubmit(formData, selectedTopicId)} />;
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
        <CustomSelect
          options={[
            { id: 'addTopic', title: 'Add Topic' },
            { id: 'addNote', title: 'Add Note' },
            { id: 'addAttachment', title: 'Add Attachment' },
            { id: 'addImage', title: 'Add Image' },
          ]}
          onChange={handleFormSelection}
          value={selectedForm}
        />
      </div>

      {selectedForm !== 'addTopic' && selectedForm !== '' && (
        <div className="mb-4 m-2 p-">
          <label htmlFor="topicSelect" className="block text-lg font-medium m-2 text-center">
            Select Topic
          </label>
          <CustomSelect
            options={topics.map(topic => ({ id: topic.id, title: topic.title }))}
            onChange={handleTopicSelection}
            value={selectedTopicId}
          />
        </div>
      )}

      {renderForm()}
    </div>
  );
};

export default FormSelector;

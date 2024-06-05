import React from 'react';
import FormSelector from '../../components/FormSelector';

const AddPage = () => {
  return (
    <main className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-4">Add New Item</h1>
      <FormSelector />
    </main>
  );
};

export default AddPage;

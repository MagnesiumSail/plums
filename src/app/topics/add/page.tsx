'use client';
import React from 'react';
import FormSelector from '../../components/FormSelector';
import ProtectedRoute from '@/app/components/ProtectedRoute';

const AddPage = () => {
  return (
    <ProtectedRoute>
    <main className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Add New Item</h1>
      <FormSelector />
    </main>
    </ProtectedRoute>
  );
};

export default AddPage;

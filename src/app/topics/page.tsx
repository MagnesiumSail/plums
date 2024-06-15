'use client';

import React, { useEffect, useState } from 'react';
import Image from "next/image";
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function fetchAllTopics() {
  try {
    const topics = await prisma.topic.findMany({
      include: {
        notes: true,
        images: true,
        attachments: true
      }
    });
    console.log(topics);
    return topics;
  } catch (error) {
    console.error("Error fetching topics:", error);
    return [];
  } finally {
    await prisma.$disconnect();
  }
}

fetchAllTopics().then(topics => {
  console.log("Fetched Topics:", topics);
}).catch(error => {
  console.error("An error occurred:", error);
});

export default function Home() {
  const [showAlert, setShowAlert] = useState(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get('success') === 'true') {
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000); 
    }
  }, [searchParams]);

  return (
    <main className="container mx-auto py-8 px-4">
      {showAlert && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Success!</strong>
          <span className="block sm:inline"> The item was added successfully.</span>
        </div>
      )}
      <section>
        <h1 className="text-2xl font-bold mb-4">Course Topics</h1>
        <div className="space-y-4">
          <div className="bg-gray-100 rounded-lg shadow px-4 py-2">
            <Link href="/topics/add">
              <button className="w-full text-left text-lg font-semibold py-2 focus:outline-none">
                Add New ...
              </button>
            </Link>
          </div>
          <div className="bg-gray-100 rounded-lg shadow px-4 py-2">
            <button className="w-full text-left text-lg font-semibold py-2 focus:outline-none">
              Topic 1
            </button>
            <div className="pl-4">
              <ul className="hidden" id="content1">
                <li>
                  <a href="#">Link to resource 1</a>
                </li>
                <li>Notes about the topic</li>
                <li>
                  <img src="path/to/image.jpg" alt="Topic Related Image" />
                </li>
                <li>
                  <a href="path/to/download.pdf" download>
                    Download Attachment
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="bg-gray-100 rounded-lg shadow px-4 py-2">
            <button className="w-full text-left text-lg font-semibold py-2 focus:outline-none">
              Topic 2
            </button>
            <div className="pl-4">
              <ul className="hidden" id="content2">
                <li>
                  <a href="#">Link to resource 2</a>
                </li>
                <li>Notes about the topic</li>
                <li>
                  <img src="path/to/image.jpg" alt="Topic Related Image" />
                </li>
                <li>
                  <a href="path/to/download.pdf" download>
                    Download Attachment
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

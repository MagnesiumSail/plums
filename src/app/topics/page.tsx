import Image from "next/image";

export default function Home() {
  return (
    <main className="container mx-auto py-8 px-4">
      {/* Topics List Section */}
      <section>
        <h1 className="text-2xl font-bold mb-4">Course Topics</h1>
        <div className="space-y-4">
          {/* Each topic as a dropdown */}
          <div className="bg-gray-100 rounded-lg shadow px-4 py-2">
            <button
              className="w-full text-left text-lg font-semibold py-2 focus:outline-none"
            >
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
            <button
              className="w-full text-left text-lg font-semibold py-2 focus:outline-none"
            >
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
          {/* Additional topics would follow the same pattern */}
        </div>
      </section>
    </main>
  );
}

import Image from "next/image";

export default function Home() {
  return (
    <main>
      {/* Modal Component */}
      <div
        className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
        id="modal"
      >
        <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-1/2 lg:w-1/3 shadow-lg rounded-md bg-white">
          <div className="mt-3 text-center">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Item Details
            </h3>
            <div className="mt-2 px-7 py-3">
              <p className="text-sm text-gray-500">
                Information about the selected item goes here. You can include
                images, links, notes, or any other related data.
              </p>
              {/* Example Content */}
              <div className="py-4">
                <img
                  src="path/to/image.jpg"
                  alt="Detailed View"
                  className="w-full h-auto rounded-md"
                />
                <div className="mt-4">
                  <a
                    href="path/to/download.pdf"
                    download
                    className="text-blue-500"
                  >
                    Download Attachment
                  </a>
                </div>
                <p className="text-gray-600 mt-2">
                  Here are some detailed notes about the image, link, or
                  attachment you clicked on. This can provide further context or
                  description.
                </p>
              </div>
            </div>
            <div className="items-center px-4 pb-3">
              <button
                className="px-4 py-2 bg-gray-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

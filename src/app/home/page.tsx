import Image from "next/image";

export default function Home() {
  return (
    <main>
      {/* Hero Section */}
      <section
        className="bg-cover bg-center h-96 text-black py-24 px-8"
        style={{ backgroundImage: "url('your-hero-image.jpg')" }}
      >
        <div className="container mx-auto flex flex-col items-center justify-center h-full">
          <h1 className="text-4xl font-bold text-center">
            Enhance Your Learning Journey
          </h1>
          <p className="text-xl mt-4 text-center">
            Join our community of learners and gain access to premium courses.
          </p>
          <a
            href="/signup"
            className="mt-8 bg-green-500 hover:bg-green-600 text-black font-bold py-2 px-4 rounded"
          >
            Get Started
          </a>
        </div>
      </section>

      {/* Overview Section */}
      <section className="container mx-auto text-center py-12">
        <h2 className="text-3xl font-semibold">What We Offer</h2>
        <p className="text-gray-600 mt-4 mb-8">
          A quick overview of the features and benefits of our learning
          management system.
        </p>
        <div className="flex flex-wrap justify-center gap-8">
          <div className="w-full md:w-1/3 p-4 bg-white shadow-lg rounded-lg">
            <h3 className="text-2xl font-semibold">Diverse Courses</h3>
            <p className="mt-2">
              Wide range of topics from technology to business to art.
            </p>
          </div>
          <div className="w-full md:w-1/3 p-4 bg-white shadow-lg rounded-lg">
            <h3 className="text-2xl font-semibold">Interactive Learning</h3>
            <p className="mt-2">
              Engage with interactive lessons and hands-on projects.
            </p>
          </div>
          <div className="w-full md:w-1/3 p-4 bg-white shadow-lg rounded-lg">
            <h3 className="text-2xl font-semibold">Expert Instructors</h3>
            <p className="mt-2">
              Learn from industry leaders and academic experts.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-green-500 text-white py-12">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold">Ready to Start?</h2>
          <p className="text-xl mt-4">
            Sign up today and start your learning adventure with us!
          </p>
          <a
            href="/register"
            className="mt-8 inline-block bg-white text-green-500 hover:bg-gray-100 font-bold py-2 px-4 rounded"
          >
            Sign Up Now
          </a>
        </div>
      </section>
    </main>
  );
}
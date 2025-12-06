function About() {
  return (
    <main>
      <section className="inter flex flex-col items-center bg-[#f0fdf4] py-20 px-5">
        <h1 className="inter font-bold text-[3rem] text-gray-800 mb-8">About the Campaign</h1>
        <div className="inter max-w-5xl flex flex-col md:flex-row items-center gap-8">
          <img
            className="inter w-full md:w-1/2 rounded-xl shadow-lg"
            src="/assets/about.png"
            alt="About Green Earth"
          />
          <div className="inter flex flex-col gap-4">
            <p className="inter text-lg text-gray-700">
              Green Earth is a global tree plantation initiative dedicated to fighting climate
              change. Since our start, we've planted over 500,000 trees worldwide. By joining our
              campaign, you help restore forests, create habitats for wildlife, and combat global
              warming.
            </p>
            <h2 className="font-bold text-xl text-gray-800 mt-4">Our Mission</h2>
            <ul className="inter list-disc marker:text-gray-500 ml-6 space-y-2 text-gray-700">
              <li>Restoration of natural habitats</li>
              <li>Improvement of air quality</li>
              <li>Support for local communities</li>
              <li>Combat climate change through reforestation</li>
              <li>Educate communities about environmental conservation</li>
            </ul>
          </div>
        </div>

        {/* Our Story */}
        <div className="inter mt-16 max-w-5xl">
          <h2 className="font-bold text-2xl text-gray-800 text-center mb-8">Our Story</h2>
          <div className="bg-white p-8 rounded-xl shadow-md">
            <p className="text-gray-700 leading-relaxed mb-4">
              Founded in 2020, Green Earth began with a simple vision: to make tree planting
              accessible to everyone. What started as a small community project has grown into a
              global movement, with volunteers and partners across 30 countries.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Every tree planted through our platform is tracked, monitored, and cared for by local
              communities. We believe in sustainable reforestation that benefits both the
              environment and the people who depend on it.
            </p>
          </div>
        </div>

        {/* Impact Stats */}
        <div className="inter mt-16 w-full max-w-5xl">
          <h2 className="font-bold text-2xl text-gray-800 text-center mb-10">Our Impact</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl text-center shadow-md hover:shadow-xl transition-shadow">
              <p className="text-4xl font-semibold text-[#15803D] mb-2">500K+</p>
              <p className="text-lg text-gray-700">Trees Planted</p>
            </div>
            <div className="bg-white p-8 rounded-xl text-center shadow-md hover:shadow-xl transition-shadow">
              <p className="text-4xl font-semibold text-[#15803D] mb-2">120+</p>
              <p className="text-lg text-gray-700">Communities Involved</p>
            </div>
            <div className="bg-white p-8 rounded-xl text-center shadow-md hover:shadow-xl transition-shadow">
              <p className="text-4xl font-semibold text-[#15803D] mb-2">30+</p>
              <p className="text-lg text-gray-700">Countries Reached</p>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="inter mt-16 max-w-5xl w-full">
          <h2 className="font-bold text-2xl text-gray-800 text-center mb-10">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-md text-center">
              <div className="w-24 h-24 bg-[#dcfce7] rounded-full mx-auto mb-4 flex items-center justify-center">
                <i className="fa-solid fa-user text-[#15803d] text-3xl"></i>
              </div>
              <h3 className="font-bold text-lg text-gray-800">AKM Zakaria</h3>
              <p className="text-sm text-[#15803d] mb-2">Founder & CEO</p>
              <p className="text-gray-600 text-sm">
                Environmental scientist with 15 years of experience in conservation.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md text-center">
              <div className="w-24 h-24 bg-[#dcfce7] rounded-full mx-auto mb-4 flex items-center justify-center">
                <i className="fa-solid fa-user text-[#15803d] text-3xl"></i>
              </div>
              <h3 className="font-bold text-lg text-gray-800">Omar</h3>
              <p className="text-sm text-[#15803d] mb-2">Operations Director</p>
              <p className="text-gray-600 text-sm">
                Coordinates planting projects across multiple continents.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md text-center">
              <div className="w-24 h-24 bg-[#dcfce7] rounded-full mx-auto mb-4 flex items-center justify-center">
                <i className="fa-solid fa-user text-[#15803d] text-3xl"></i>
              </div>
              <h3 className="font-bold text-lg text-gray-800">Khalid</h3>
              <p className="text-sm text-[#15803d] mb-2">Community Manager</p>
              <p className="text-gray-600 text-sm">
                Builds partnerships with local communities worldwide.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default About

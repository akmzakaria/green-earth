function Gallery() {
  const images = [
    {
      id: 1,
      src: '/assets/hero-leaf1.png',
      title: 'Forest Restoration',
      location: 'Amazon Rainforest, Brazil',
      date: 'March 2024',
    },
    {
      id: 2,
      src: '/assets/hero-leaf2.png',
      title: 'Tree Planting',
      location: 'Kenya, East Africa',
      date: 'February 2024',
    },
    {
      id: 3,
      src: '/assets/about.png',
      title: 'Community Involvement',
      location: 'Indonesia',
      date: 'January 2024',
    },
    {
      id: 4,
      src: '/assets/hero-leaf1.png',
      title: 'Urban Greening',
      location: 'New York, USA',
      date: 'December 2023',
    },
    {
      id: 5,
      src: '/assets/hero-leaf2.png',
      title: 'Mangrove Planting',
      location: 'Philippines',
      date: 'November 2023',
    },
    {
      id: 6,
      src: '/assets/about.png',
      title: 'Youth Program',
      location: 'India',
      date: 'October 2023',
    },
  ]

  return (
    <main>
      <section className="inter bg-[#f0fdf4] py-20 px-5">
        <div className="max-w-7xl mx-auto">
          <h1 className="font-bold text-[3rem] text-gray-800 text-center mb-4">Our Gallery</h1>
          <p className="text-center text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
            Explore the beautiful moments captured during our tree planting campaigns around the
            world. Every photo tells a story of hope, growth, and community action.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {images.map((image) => (
              <div
                key={image.id}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all hover:scale-105 duration-300"
              >
                <img src={image.src} alt={image.title} className="w-full h-64 object-cover" />
                <div className="p-4">
                  <h3 className="font-bold text-xl text-gray-800 mb-2">{image.title}</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                    <i className="fa-solid fa-location-dot text-[#15803d]"></i>
                    <span>{image.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <i className="fa-solid fa-calendar text-[#15803d]"></i>
                    <span>{image.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Statistics */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-md text-center">
              <i className="fa-solid fa-camera text-[#15803d] text-3xl mb-3"></i>
              <p className="text-2xl font-bold text-gray-800">1,200+</p>
              <p className="text-gray-600">Photos Shared</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md text-center">
              <i className="fa-solid fa-users text-[#15803d] text-3xl mb-3"></i>
              <p className="text-2xl font-bold text-gray-800">850+</p>
              <p className="text-gray-600">Contributors</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md text-center">
              <i className="fa-solid fa-earth-americas text-[#15803d] text-3xl mb-3"></i>
              <p className="text-2xl font-bold text-gray-800">30+</p>
              <p className="text-gray-600">Countries</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md text-center">
              <i className="fa-solid fa-tree text-[#15803d] text-3xl mb-3"></i>
              <p className="text-2xl font-bold text-gray-800">500K+</p>
              <p className="text-gray-600">Trees Documented</p>
            </div>
          </div>

          <div className="mt-16 bg-[#cff0dc] p-10 rounded-xl text-center">
            <h2 className="font-bold text-2xl text-gray-800 mb-4">Share Your Story</h2>
            <p className="text-lg text-gray-700 mb-6">
              Have you planted a tree with us? Share your photos and inspire others to join the
              movement!
            </p>
            <button className="text-white bg-gradient-to-r from-[#15803d] to-[#166534] border-none rounded-full px-5 font-bold btn hover:from-[#166534] hover:to-[#15803d] hover:scale-110 transition-all shadow-xl hover:shadow-2xl">
              <i className="fa-solid fa-upload"></i>
              Upload Photos
            </button>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Gallery

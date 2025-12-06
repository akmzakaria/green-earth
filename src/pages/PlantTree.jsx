import { useState } from 'react'
import toast from 'react-hot-toast'

function PlantTree() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    trees: '',
  })
  const [selectedPackage, setSelectedPackage] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    toast.success(
      <div className="flex items-center gap-3">
        <div>
          <p className="font-semibold text-gray-800">Thank you, {formData.name}!</p>
          <p className="text-sm text-gray-600">
            Your donation for {formData.trees} trees has been received.
          </p>
        </div>
      </div>,
      {
        duration: 4000,
      }
    )
    setFormData({ name: '', email: '', trees: '' })
    setSelectedPackage(null)
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const packages = [
    { trees: 5, price: 50, icon: '🌱', popular: false },
    { trees: 10, price: 100, icon: '🌿', popular: true },
    { trees: 20, price: 200, icon: '🌳', popular: false },
    { trees: 30, price: 300, icon: '🌲', popular: false },
    { trees: 50, price: 500, icon: '🌴', popular: false },
  ]

  return (
    <main>
      <section className="inter flex flex-col items-center bg-gradient-to-b from-[#166534] to-[#15803d] py-20 px-5">
        <div className="max-w-6xl w-full">
          <h1 className="mb-4 text-4xl font-bold text-white text-center">Plant a Tree Today</h1>
          <p className="text-white/90 text-center max-w-2xl mb-12 mx-auto text-lg">
            Join thousands of people making a difference. Every tree you plant helps combat climate
            change and creates a greener future for generations to come.
          </p>

          {/* Donation Packages */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-white text-center mb-6">Choose Your Impact</h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
              {packages.map((pkg) => (
                <div
                  key={pkg.trees}
                  onClick={() => {
                    setSelectedPackage(pkg.trees)
                    setFormData({ ...formData, trees: pkg.trees.toString() })
                  }}
                  className={`bg-white/10 backdrop-blur-sm p-4 rounded-xl text-center cursor-pointer transition-all hover:scale-105 relative ${
                    selectedPackage === pkg.trees
                      ? 'ring-4 ring-[#facc15] bg-white/25 shadow-2xl'
                      : 'hover:bg-white/20'
                  } ${
                    pkg.popular && selectedPackage !== pkg.trees ? 'ring-2 ring-[#facc15]/50' : ''
                  }`}
                >
                  {selectedPackage === pkg.trees && (
                    <div className="absolute -top-2 -right-2 bg-[#facc15] rounded-full w-8 h-8 flex items-center justify-center shadow-lg">
                      <i className="fa-solid fa-check text-[#15803d] text-sm"></i>
                    </div>
                  )}
                  {pkg.popular && (
                    <span className="bg-[#facc15] text-[#15803d] text-xs font-bold px-2 py-1 rounded-full">
                      Popular
                    </span>
                  )}
                  <div className="text-4xl my-2">{pkg.icon}</div>
                  <p className="text-white font-bold text-xl">{pkg.trees} Trees</p>
                  <p className="text-white/80 text-sm">${pkg.price}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Donation Form */}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center gap-4 bg-white/10 backdrop-blur-md py-10 px-8 w-full max-w-md mx-auto rounded-2xl shadow-2xl border border-white/20"
          >
            <h3 className="text-xl font-bold text-white mb-2">Complete Your Donation</h3>
            <div className="w-full">
              <label className="text-white text-sm font-medium mb-1 block">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="AKM Zakaria"
                className="input px-2 w-full bg-white text-gray-800 placeholder:text-gray-500 border-none focus:ring-2 focus:ring-[#facc15]"
                required
              />
            </div>
            <div className="w-full">
              <label className="text-white text-sm font-medium mb-1 block">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="akm@example.com"
                className="input px-2 w-full bg-white text-gray-800 placeholder:text-gray-500 border-none focus:ring-2 focus:ring-[#facc15]"
                required
              />
            </div>
            <div className="w-full">
              <label className="text-white text-sm font-medium mb-1 block">Number of Trees</label>
              <select
                name="trees"
                value={formData.trees}
                onChange={handleChange}
                className="select w-full px-2 bg-white text-gray-800 border-none focus:ring-2 focus:ring-[#facc15]"
                required
              >
                <option value="" disabled className="text-gray-500">
                  Select package
                </option>
                <option value="5" className="text-gray-800">
                  🌱 5 Trees - $50
                </option>
                <option value="10" className="text-gray-800">
                  🌿 10 Trees - $100 (Popular)
                </option>
                <option value="20" className="text-gray-800">
                  🌳 20 Trees - $200
                </option>
                <option value="30" className="text-gray-800">
                  🌲 30 Trees - $300
                </option>
                <option value="50" className="text-gray-800">
                  🌴 50 Trees - $500
                </option>
              </select>
            </div>

            <button
              type="submit"
              className="text-white bg-gradient-to-r from-[#facc15] to-[#fbbf24] border-none rounded-full font-bold btn w-full hover:from-[#fbbf24] hover:to-[#facc15] hover:scale-110 transition-all shadow-xl hover:shadow-2xl text-lg mt-4"
            >
              <i className="fa-solid fa-heart text-red-500"></i>
              <span className="text-[#15803d]">Complete Donation</span>
            </button>
            <p className="text-white/70 text-xs text-center">
              🔒 Secure payment • Tax deductible • 100% goes to planting
            </p>
          </form>

          {/* Benefits Section */}
          <div className="mt-16 max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold text-white text-center mb-8">Your Impact Matters</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl text-white hover:bg-white/20 transition-all">
                <div className="text-4xl mb-3">🌍</div>
                <h3 className="font-bold text-xl mb-2">Fight Climate Change</h3>
                <p className="text-white/90">
                  Trees absorb CO2 and produce oxygen, helping to reduce global warming and purify
                  our air.
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl text-white hover:bg-white/20 transition-all">
                <div className="text-4xl mb-3">🦜</div>
                <h3 className="font-bold text-xl mb-2">Protect Wildlife</h3>
                <p className="text-white/90">
                  Trees provide habitats for countless species of animals, birds, and insects.
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl text-white hover:bg-white/20 transition-all">
                <div className="text-4xl mb-3">💚</div>
                <h3 className="font-bold text-xl mb-2">Support Communities</h3>
                <p className="text-white/90">
                  Tree planting creates jobs and improves local economies in developing regions.
                </p>
              </div>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 bg-white/10 backdrop-blur-sm p-6 rounded-xl">
            <h3 className="text-white font-bold text-center mb-4">Why Choose Green Earth?</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
              <div className="text-white">
                <i className="fa-solid fa-shield-halved text-3xl text-[#facc15] mb-2"></i>
                <p className="font-semibold">100% Transparent</p>
              </div>
              <div className="text-white">
                <i className="fa-solid fa-certificate text-3xl text-[#facc15] mb-2"></i>
                <p className="font-semibold">Certified Projects</p>
              </div>
              <div className="text-white">
                <i className="fa-solid fa-map-location-dot text-3xl text-[#facc15] mb-2"></i>
                <p className="font-semibold">GPS Tracked</p>
              </div>
              <div className="text-white">
                <i className="fa-solid fa-users text-3xl text-[#facc15] mb-2"></i>
                <p className="font-semibold">Local Partners</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default PlantTree

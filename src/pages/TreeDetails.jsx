import { useParams, useNavigate, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import toast from 'react-hot-toast'

function TreeDetails({ onAddToCart }) {
  const { id } = useParams()
  const navigate = useNavigate()
  const [plant, setPlant] = useState(null)
  const [loading, setLoading] = useState(true)
  const [relatedPlants, setRelatedPlants] = useState([])

  useEffect(() => {
    loadPlantDetails()
  }, [id])

  const loadPlantDetails = async () => {
    setLoading(true)
    try {
      const res = await fetch(`https://openapi.programming-hero.com/api/plant/${id}`)
      const data = await res.json()
      setPlant(data.plants)

      // Load related plants
      const allRes = await fetch('https://openapi.programming-hero.com/api/plants')
      const allData = await allRes.json()
      const related = allData.plants
        .filter((p) => p.category === data.plants.category && p.id !== parseInt(id))
        .slice(0, 3)
      setRelatedPlants(related)
    } catch (error) {
      console.error('Error loading plant:', error)
    }
    setLoading(false)
  }

  const handleAddToCart = () => {
    onAddToCart(plant)
    toast.success(
      <div className="flex items-center gap-3">
        <div>
          <p className="font-semibold text-gray-800">{plant.name}</p>
          <p className="text-sm text-gray-600">Added to cart successfully!</p>
        </div>
      </div>,
      { duration: 2500 }
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f0fdf4]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-20 h-20 border-4 border-[#dcfce7] border-t-[#15803d] rounded-full animate-spin"></div>
          <p className="text-[#15803d] font-semibold text-lg">Loading tree details...</p>
        </div>
      </div>
    )
  }

  if (!plant) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f0fdf4]">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Tree not found</h1>
          <Link to="/" className="btn bg-[#15803d] text-white">
            Go Home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <main className="bg-gradient-to-b from-[#f0fdf4] to-white min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-5 py-4">
          <div className="flex items-center gap-2 text-sm">
            <Link to="/" className="text-[#15803d] hover:underline">
              Home
            </Link>
            <i className="fa-solid fa-chevron-right text-gray-400 text-xs"></i>
            <span className="text-gray-600">{plant.category}</span>
            <i className="fa-solid fa-chevron-right text-gray-400 text-xs"></i>
            <span className="text-gray-800 font-medium">{plant.name}</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-5 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Image Section */}
          <div className="space-y-4">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-gray-200 h-[500px]">
              <LazyLoadImage
                src={plant.image}
                alt={plant.name}
                effect="blur"
                className="w-full h-[500px] object-cover"
                wrapperClassName="w-full h-[500px]"
              />
              <div className="absolute top-4 left-4">
                <span className="bg-[#facc15] text-[#15803d] px-4 py-2 rounded-full font-bold text-sm shadow-lg">
                  {plant.category}
                </span>
              </div>
            </div>
          </div>

          {/* Details Section */}
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-[#15803d] mb-4">{plant.name}</h1>
              <div className="flex items-center gap-4 mb-6">
                <span className="text-4xl font-bold text-gray-800">${plant.price}</span>
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                  In Stock
                </span>
              </div>
            </div>

            <div className="border-t border-b border-gray-200 py-6">
              <h2 className="text-xl font-bold text-gray-800 mb-3">Description</h2>
              <p className="text-gray-600 leading-relaxed text-lg">{plant.description}</p>
            </div>

            {/* Features */}
            <div className="bg-gradient-to-r from-[#dcfce7] to-[#cff0dc] p-6 rounded-xl">
              <h3 className="font-bold text-gray-800 mb-4 text-lg">Why Choose This Tree?</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <i className="fa-solid fa-circle-check text-[#15803d] mt-1"></i>
                  <span className="text-gray-700">Easy to grow and maintain</span>
                </li>
                <li className="flex items-start gap-3">
                  <i className="fa-solid fa-circle-check text-[#15803d] mt-1"></i>
                  <span className="text-gray-700">Helps reduce carbon footprint</span>
                </li>
                <li className="flex items-start gap-3">
                  <i className="fa-solid fa-circle-check text-[#15803d] mt-1"></i>
                  <span className="text-gray-700">Supports local biodiversity</span>
                </li>
                <li className="flex items-start gap-3">
                  <i className="fa-solid fa-circle-check text-[#15803d] mt-1"></i>
                  <span className="text-gray-700">GPS tracked and monitored</span>
                </li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-4 pt-4">
              <button
                onClick={handleAddToCart}
                className="flex-1 btn text-white bg-gradient-to-r from-[#15803d] to-[#166534] border-none rounded-full hover:from-[#166534] hover:to-[#15803d] hover:scale-105 transition-all shadow-lg hover:shadow-xl text-lg py-4"
              >
                <i className="fa-solid fa-cart-plus"></i>
                Add to Cart
              </button>
            </div>
          </div>
        </div>

        {/* Related Trees */}
        {relatedPlants.length > 0 && (
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
              Similar Trees You Might Like
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPlants.map((relatedPlant) => (
                <Link
                  key={relatedPlant.id}
                  to={`/tree/${relatedPlant.id}`}
                  className="bg-white p-5 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="relative h-48 rounded-xl overflow-hidden bg-gray-200 mb-4">
                    <img
                      src={relatedPlant.image}
                      alt={relatedPlant.name}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="font-bold text-[#15803d] text-lg mb-2">{relatedPlant.name}</h3>
                  <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                    {relatedPlant.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="bg-[#dcfce7] rounded-full px-3 py-1 text-[#15803d] text-xs font-medium">
                      {relatedPlant.category}
                    </span>
                    <span className="font-bold text-gray-800">${relatedPlant.price}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
        <div className="flex items-center justify-center mt-10">
          <button
            onClick={() => navigate(-1)}
            className="btn bg-gradient-to-r text-black px-5 from-gray-100 to-gray-200 border-none w-fit rounded-full hover:from-gray-200 hover:to-gray-300 hover:scale-105 transition-all shadow-md"
          >
            <i className="fa-solid fa-arrow-left"></i>
            Back
          </button>
        </div>
      </div>
    </main>
  )
}

export default TreeDetails

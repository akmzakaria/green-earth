import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'

function TreeCard({ plant, onAddToCart }) {
  const handleAddToCart = () => {
    onAddToCart(plant)
    toast.success(
      <div className="flex items-center gap-3">
        <div>
          <p className="font-semibold text-gray-800">{plant.name}</p>
          <p className="text-sm text-gray-600">Added to cart successfully!</p>
        </div>
      </div>,
      {
        duration: 2500,
      }
    )
  }

  return (
    <>
      <div className="bg-white p-5 flex flex-col gap-3 rounded-xl justify-between h-full shadow-md hover:shadow-xl transition-all duration-300">
        <div className="relative h-40 w-full rounded-xl overflow-hidden bg-gray-200">
          <LazyLoadImage
            src={plant.image}
            alt={plant.name}
            effect="blur"
            className="h-40 w-full object-cover rounded-xl"
            placeholderSrc="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Crect fill='%23dcfce7' width='400' height='300'/%3E%3C/svg%3E"
            wrapperClassName="h-40 w-full"
          />
        </div>

        <h3 className="font-bold text-[#15803d] text-lg">{plant.name}</h3>

        <p className="text-gray-700 line-clamp-3">{plant.description}</p>

        <div className="flex flex-row justify-between items-center">
          <button className="bg-[#dcfce7] rounded-full px-3 py-1 w-fit text-[#15803d] text-sm font-medium">
            {plant.category}
          </button>
          <p className="font-bold text-lg text-gray-800">${plant.price}</p>
        </div>

        <div className="flex flex-col gap-2">
          <Link
            to={`/tree/${plant.id}`}
            className=" text-center py-1 rounded-full px-4 bg-white  text-[#15803d] hover:bg-[#dcfce7] hover:scale-105 transition-all font-medium shadow-md hover:shadow-lg"
          >
            <i className="fa-solid fa-book-open mr-2"></i>
            Read More
          </Link>
          <button
            onClick={handleAddToCart}
            className=" py-1 rounded-full text-white bg-gradient-to-r from-[#15803d] to-[#166534] border-none hover:from-[#166534] hover:to-[#15803d] hover:scale-105 transition-all shadow-lg hover:shadow-xl px-4 font-medium"
          >
            <i className="fa-solid fa-cart-plus mr-2"></i>
            Add to Cart
          </button>
        </div>
      </div>
    </>
  )
}

export default TreeCard

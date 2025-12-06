import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'

function CartPage({ cart, onRemove, onUpdateQuantity }) {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const handleRemove = (id, name) => {
    onRemove(id)
    toast.error(
      <div className="flex items-center gap-3">
        <div>
          <p className="font-semibold text-gray-800">{name}</p>
          <p className="text-sm text-gray-600">Removed from cart</p>
        </div>
      </div>,
      {
        duration: 2500,
      }
    )
  }

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity >= 1) {
      onUpdateQuantity(id, newQuantity)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#f0fdf4] to-white">
      <div className="max-w-7xl mx-auto px-5 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Your Cart</h1>
          <p className="text-gray-600">
            {cart.length === 0
              ? 'Your cart is empty. Start planting trees!'
              : `You have ${cart.length} item${cart.length > 1 ? 's' : ''} in your cart`}
          </p>
        </div>

        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="bg-[#dcfce7] p-8 rounded-full mb-6">
              <i className="fa-solid fa-cart-shopping text-[#15803d] text-6xl"></i>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-3">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">Add some trees to get started!</p>
            <Link
              to="/"
              className="btn text-white bg-gradient-to-r from-[#15803d] to-[#166534] border-none rounded-full hover:from-[#166534] hover:to-[#15803d] hover:scale-105 transition-all shadow-lg hover:shadow-xl"
            >
              <i className="fa-solid fa-tree"></i>
              Browse Trees
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all"
                >
                  <div className="flex gap-6">
                    {/* Image */}
                    <div className="w-32 h-32 flex-shrink-0 rounded-lg overflow-hidden bg-gray-200">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="text-xl font-bold text-[#15803d] mb-1">{item.name}</h3>
                            <span className="bg-[#dcfce7] text-[#15803d] px-3 py-1 rounded-full text-xs font-medium">
                              {item.category}
                            </span>
                          </div>
                          <button
                            onClick={() => handleRemove(item.id, item.name)}
                            className="text-red-400 hover:text-red-600 transition-colors p-2"
                          >
                            <i className="fa-solid fa-trash text-lg"></i>
                          </button>
                        </div>
                        <p className="text-gray-600 text-sm line-clamp-2 mt-2">
                          {item.description}
                        </p>
                      </div>

                      {/* Quantity and Price */}
                      <div className="flex justify-between items-center mt-4">
                        <div className="flex items-center gap-3">
                          <span className="text-sm text-gray-600">Quantity:</span>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                              className="w-8 h-8 flex items-center justify-center bg-[#f0fdf4] rounded text-[#15803d] hover:bg-[#dcfce7] transition-colors"
                            >
                              <i className="fa-solid fa-minus text-sm"></i>
                            </button>
                            <span className="text-lg font-semibold text-gray-800 w-12 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                              className="w-8 h-8 flex items-center justify-center bg-[#f0fdf4] rounded text-[#15803d] hover:bg-[#dcfce7] transition-colors"
                            >
                              <i className="fa-solid fa-plus text-sm"></i>
                            </button>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-600">${item.price} each</p>
                          <p className="text-2xl font-bold text-[#15803d]">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white p-6 rounded-xl shadow-md sticky top-5">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Order Summary</h2>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span className="text-[#15803d] font-medium">Free</span>
                  </div>
                  <div className="border-t border-gray-200 pt-3 flex justify-between items-center">
                    <span className="text-xl font-bold text-gray-800">Total</span>
                    <span className="text-2xl font-bold text-[#15803d]">${total.toFixed(2)}</span>
                  </div>
                </div>

                <button className="w-full btn text-white bg-gradient-to-r from-[#15803d] to-[#166534] border-none rounded-full hover:from-[#166534] hover:to-[#15803d] hover:scale-105 transition-all shadow-lg hover:shadow-xl mb-3">
                  <i className="fa-solid fa-credit-card"></i>
                  Proceed to Checkout
                </button>

                <Link
                  to="/"
                  className="w-full btn bg-white border-2 border-[#15803d] text-[#15803d] rounded-full hover:bg-[#dcfce7] hover:scale-105 transition-all"
                >
                  <i className="fa-solid fa-arrow-left"></i>
                  Continue Shopping
                </Link>

                {/* Trust Indicators */}
                <div className="mt-6 pt-6 border-t border-gray-200 space-y-3">
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <i className="fa-solid fa-shield-halved text-[#15803d]"></i>
                    <span>Secure checkout</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <i className="fa-solid fa-truck text-[#15803d]"></i>
                    <span>Free shipping on all orders</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <i className="fa-solid fa-seedling text-[#15803d]"></i>
                    <span>GPS tracked planting</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}

export default CartPage

import toast from 'react-hot-toast'

function Cart({ cart, onRemove, onUpdateQuantity }) {
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
    <div className="inter w-full md:w-64 flex-shrink-0 bg-white p-4 gap-3 rounded-xl sticky top-5 shadow-md">
      <div>
        <h3 className="inter font-bold mb-4 text-xl text-gray-800">Your Cart ({cart.length})</h3>
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {cart.length === 0 ? (
            <p className="text-gray-500 text-sm text-center py-4">Your cart is empty</p>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="flex flex-col gap-2 bg-[#f0fdf4] px-3 py-2 rounded">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h4 className="font-medium text-sm text-gray-800">{item.name}</h4>
                    <p className="text-xs text-gray-600">${item.price} each</p>
                  </div>
                  <button
                    onClick={() => handleRemove(item.id, item.name)}
                    className="cursor-pointer text-red-400 hover:text-red-600 transition-colors"
                  >
                    <i className="fa-solid fa-xmark text-lg"></i>
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                      className="w-6 h-6 flex items-center justify-center bg-white rounded text-[#15803d] hover:bg-[#dcfce7] transition-colors"
                    >
                      <i className="fa-solid fa-minus text-xs"></i>
                    </button>
                    <span className="text-sm font-medium text-gray-800 w-8 text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                      className="w-6 h-6 flex items-center justify-center bg-white rounded text-[#15803d] hover:bg-[#dcfce7] transition-colors"
                    >
                      <i className="fa-solid fa-plus text-xs"></i>
                    </button>
                  </div>
                  <p className="text-sm font-semibold text-[#15803d]">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200">
        <p className="font-medium text-lg text-gray-800">Total</p>
        <p className="font-semibold text-lg text-[#15803d]">${total.toFixed(2)}</p>
      </div>
    </div>
  )
}

export default Cart

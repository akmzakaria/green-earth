import { Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import { Toaster } from 'react-hot-toast'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Gallery from './pages/Gallery'
import PlantTree from './pages/PlantTree'
import TreeDetails from './pages/TreeDetails'
import CartPage from './pages/CartPage'

function App() {
  const [cart, setCart] = useState([])

  const handleAddToCart = (plant) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === plant.id)
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === plant.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      }
      return [...prevCart, { ...plant, quantity: 1 }]
    })
  }

  const handleRemoveFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id))
  }

  const handleUpdateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      handleRemoveFromCart(id)
    } else {
      setCart((prevCart) => prevCart.map((item) => (item.id === id ? { ...item, quantity } : item)))
    }
  }

  return (
    <div className="inter">
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#fff',
            color: '#1F2937',
            padding: '16px',
            borderRadius: '12px',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
            fontFamily: 'Inter, sans-serif',
          },
          success: {
            iconTheme: {
              primary: '#15803d',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />
      <Navbar cartCount={cart.length} />
      <Routes>
        <Route path="/" element={<Home onAddToCart={handleAddToCart} />} />
        <Route path="/about" element={<About />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/plant-tree" element={<PlantTree />} />
        <Route path="/tree/:id" element={<TreeDetails onAddToCart={handleAddToCart} />} />
        <Route
          path="/cart"
          element={
            <CartPage
              cart={cart}
              onRemove={handleRemoveFromCart}
              onUpdateQuantity={handleUpdateQuantity}
            />
          }
        />
      </Routes>
      <Footer />
    </div>
  )
}

export default App

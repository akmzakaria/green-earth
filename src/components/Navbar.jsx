import { Link, useLocation } from 'react-router-dom'

function Navbar({ cartCount = 0 }) {
  const location = useLocation()

  const isActive = (path) => {
    return location.pathname === path
  }

  return (
    <header className="inter bg-[#15803d]">
      <div className="inter max-w-7xl mx-auto px-5">
        <div className="inter navbar bg-[#15803d] shadow-sm">
          <div className="inter navbar-start">
            <div className="inter dropdown">
              <div tabIndex={0} role="button" className="inter btn btn-ghost md:hidden text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="inter h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </div>
              <ul
                tabIndex={0}
                className="inter menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow space-y-2"
              >
                <li>
                  <Link to="/" className={isActive('/') ? 'active bg-[#15803d] text-white' : ''}>
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about"
                    className={isActive('/about') ? 'active bg-[#15803d] text-white' : ''}
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    to="/gallery"
                    className={isActive('/gallery') ? 'active bg-[#15803d] text-white' : ''}
                  >
                    Gallery
                  </Link>
                </li>
                <li>
                  <Link
                    to="/plant-tree"
                    className={isActive('/plant-tree') ? 'active bg-[#15803d] text-white' : ''}
                  >
                    Plant a Tree
                  </Link>
                </li>
              </ul>
            </div>
            <Link
              to="/"
              className="inter flex items-center gap-2 text-lg font-bold poppins text-white hover:scale-105 transition-transform"
            >
              <i className="fa-solid fa-seedling text-[#facc15]"></i>
              Green Earth
            </Link>
          </div>
          <div className="inter navbar-center hidden md:flex">
            <ul className="inter menu menu-horizontal px-1 space-x-2">
              <li>
                <Link
                  to="/"
                  className={`text-white hover:bg-white/20 hover:shadow-lg rounded-lg transition-all ${
                    isActive('/')
                      ? 'bg-gradient-to-r from-white/30 to-white/20 font-semibold shadow-md'
                      : ''
                  }`}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className={`text-white hover:bg-white/20 hover:shadow-lg rounded-lg transition-all ${
                    isActive('/about')
                      ? 'bg-gradient-to-r from-white/30 to-white/20 font-semibold shadow-md'
                      : ''
                  }`}
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/gallery"
                  className={`text-white hover:bg-white/20 hover:shadow-lg rounded-lg transition-all ${
                    isActive('/gallery')
                      ? 'bg-gradient-to-r from-white/30 to-white/20 font-semibold shadow-md'
                      : ''
                  }`}
                >
                  Gallery
                </Link>
              </li>
              <li>
                <Link
                  to="/plant-tree"
                  className={`text-white hover:bg-white/20 hover:shadow-lg rounded-lg transition-all ${
                    isActive('/plant-tree')
                      ? 'bg-gradient-to-r from-white/30 to-white/20 font-semibold shadow-md'
                      : ''
                  }`}
                >
                  Plant a Tree
                </Link>
              </li>
            </ul>
          </div>

          <div className="inter navbar-end flex items-center gap-3">
            <Link to="/cart" className="relative">
              <button className="inter btn btn-ghost btn-circle text-white hover:bg-white/20 transition-all">
                <i className="fa-solid fa-cart-shopping text-xl"></i>
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#facc15] text-[#15803d] text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-lg">
                    {cartCount}
                  </span>
                )}
              </button>
            </Link>
            <Link to="/plant-tree">
              <button className="inter px-5 text-white bg-gradient-to-r from-[#facc15] to-[#fbbf24] border-none rounded-full font-bold btn hover:from-[#fbbf24] hover:to-[#facc15] hover:scale-110 transition-all shadow-lg hover:shadow-xl">
                <i className="fa-solid fa-tree text-[#15803d]"></i>
                <span className="text-[#15803d]">Plant a Tree</span>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar

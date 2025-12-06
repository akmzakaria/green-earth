import { useState, useEffect, useRef, useCallback } from 'react'
import TreeCard from '../components/TreeCard'

function Home({ onAddToCart }) {
  const [allPlants, setAllPlants] = useState([])
  const [filteredPlants, setFilteredPlants] = useState([])
  const [displayedPlants, setDisplayedPlants] = useState([])
  const [categories, setCategories] = useState([])
  const [selectedCategories, setSelectedCategories] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const observer = useRef()
  const ITEMS_PER_PAGE = 10

  // Filter plants based on categories and search
  useEffect(() => {
    let filtered = [...allPlants]

    // Filter by categories
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((plant) => selectedCategories.includes(plant.category))
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (plant) =>
          plant.name.toLowerCase().includes(query) ||
          plant.description.toLowerCase().includes(query) ||
          plant.category.toLowerCase().includes(query)
      )
    }

    setFilteredPlants(filtered)
    setDisplayedPlants(filtered.slice(0, ITEMS_PER_PAGE))
    setHasMore(filtered.length > ITEMS_PER_PAGE)
  }, [allPlants, selectedCategories, searchQuery])

  const loadMorePlants = useCallback(() => {
    if (loadingMore || !hasMore) return
    setLoadingMore(true)

    // Use requestAnimationFrame for smoother updates
    requestAnimationFrame(() => {
      const startIndex = displayedPlants.length
      const endIndex = startIndex + ITEMS_PER_PAGE
      const newPlants = filteredPlants.slice(startIndex, endIndex)

      setDisplayedPlants((prev) => [...prev, ...newPlants])

      const newLength = startIndex + newPlants.length
      setHasMore(newLength < filteredPlants.length)
      setLoadingMore(false)
    })
  }, [loadingMore, hasMore, filteredPlants, displayedPlants.length])

  const lastPlantRef = useCallback(
    (node) => {
      if (loadingMore) return
      if (observer.current) observer.current.disconnect()
      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasMore) {
            loadMorePlants()
          }
        },
        {
          rootMargin: '100px', // Load before reaching the bottom
          threshold: 0.1,
        }
      )
      if (node) observer.current.observe(node)
    },
    [loadingMore, hasMore, loadMorePlants]
  )

  useEffect(() => {
    loadCategories()
    loadAllTrees()
  }, [])

  const loadCategories = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/categories')
    const data = await res.json()
    setCategories(data.categories)
  }

  const loadAllTrees = async () => {
    setLoading(true)
    const res = await fetch('https://openapi.programming-hero.com/api/plants')
    const data = await res.json()
    setAllPlants(data.plants)
    setLoading(false)
  }

  const toggleCategory = (categoryName) => {
    setSelectedCategories((prev) => {
      if (prev.includes(categoryName)) {
        return prev.filter((cat) => cat !== categoryName)
      } else {
        return [...prev, categoryName]
      }
    })
  }

  const clearFilters = () => {
    setSelectedCategories([])
    setSearchQuery('')
  }

  return (
    <main>
      {/* Hero Section */}
      <section className="inter flex justify-around bg-gradient-to-b from-[#dcfce7] to-[#cff0dc] items-end">
        <img className="inter size-1/5" src="/assets/hero-leaf1.png" alt="" />
        <div className="inter flex flex-col justify-center items-center gap-2 p-3">
          <h1 className="inter text-center font-bold text-[2rem] text-gray-800">
            Plant a Tree, Grow a Future
          </h1>
          <p className="inter text-center text-[#1F2937]">
            Join our mission to plant 1 million trees and make the Earth greener for future
            generations.
          </p>
          <button className="inter px-5 text-white bg-gradient-to-r from-[#15803d] to-[#166534] border-none rounded-full font-bold btn hover:from-[#166534] hover:to-[#15803d] hover:scale-110 transition-all shadow-xl hover:shadow-2xl">
            <i className="fa-solid fa-seedling"></i>
            Get Involved
          </button>
        </div>
        <img className="inter size-1/5" src="/assets/hero-leaf2.png" alt="" />
      </section>

      <h1 className="inter text-center font-bold text-[2rem] text-gray-800 bg-[#f0fdf4] pt-5 pb-5">
        Choose Your Trees
      </h1>

      {/* Trees Section */}
      <section className="inter bg-[#f0fdf4] py-5">
        <div className="inter max-w-7xl mx-auto px-5">
          {/* Search and Filter Bar */}
          <div className="inter mb-6 flex flex-col md:flex-row gap-4 items-center">
            {/* Search Bar */}
            <div className="inter relative flex-1 w-full">
              <input
                type="text"
                placeholder="Search trees by name, description, or category..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="inter w-full px-6 py-4 pr-12 rounded-full border-2 border-[#dcfce7] focus:border-[#15803d] focus:outline-none text-gray-800 bg-white shadow-md focus:shadow-lg transition-all"
              />
              <i className="fa-solid fa-search absolute right-6 top-1/2 transform -translate-y-1/2 text-[#15803d] text-xl"></i>
            </div>

            {/* Filter Dropdown */}
            <div className="inter dropdown dropdown-end">
              <button
                tabIndex={0}
                className="inter btn bg-white border-2 border-[#dcfce7] hover:border-[#15803d] hover:bg-[#f0fdf4] rounded-full px-6 normal-case font-medium text-gray-800 shadow-md hover:shadow-lg transition-all"
              >
                <i className="fa-solid fa-filter text-[#15803d]"></i>
                Filters
                {selectedCategories.length > 0 && (
                  <span className="inter bg-[#15803d] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {selectedCategories.length}
                  </span>
                )}
              </button>
              <div
                tabIndex={0}
                className="inter dropdown-content z-[1] menu p-4 shadow-xl bg-white rounded-xl w-80 mt-2"
              >
                <div className="inter flex justify-between items-center mb-3">
                  <h3 className="inter font-bold text-gray-800">Filter by Category</h3>
                  {selectedCategories.length > 0 && (
                    <button
                      onClick={clearFilters}
                      className="inter text-xs text-[#15803d] hover:underline font-medium"
                    >
                      Clear All
                    </button>
                  )}
                </div>

                <div className="inter flex flex-col gap-2 max-h-96 overflow-y-auto">
                  {categories.map((category) => (
                    <label
                      key={category.id}
                      className="inter flex items-center gap-3 cursor-pointer hover:bg-[#f0fdf4] p-3 rounded-lg transition-colors"
                    >
                      <div className="inter relative">
                        <input
                          type="checkbox"
                          checked={selectedCategories.includes(category.category_name)}
                          onChange={() => toggleCategory(category.category_name)}
                          className="inter w-5 h-5 rounded border-2 border-gray-300 checked:bg-[#15803d] checked:border-[#15803d] cursor-pointer appearance-none transition-all"
                        />
                        {selectedCategories.includes(category.category_name) && (
                          <i className="fa-solid fa-check absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-xs pointer-events-none"></i>
                        )}
                      </div>
                      <span className="inter text-sm text-gray-700 flex-1">
                        {category.category_name}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Active Filters */}
          {selectedCategories.length > 0 && (
            <div className="inter mb-4 flex flex-wrap gap-2 items-center">
              <span className="inter text-sm text-gray-600 font-medium">Active Filters:</span>
              {selectedCategories.map((cat) => (
                <span
                  key={cat}
                  className="inter bg-[#dcfce7] text-[#15803d] px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 shadow-sm"
                >
                  {cat}
                  <button
                    onClick={() => toggleCategory(cat)}
                    className="inter hover:text-red-600 transition-colors"
                  >
                    <i className="fa-solid fa-xmark"></i>
                  </button>
                </span>
              ))}
            </div>
          )}

          {/* Results Count */}
          <div className="inter mb-4 flex justify-between items-center">
            <p className="inter text-gray-600">
              {loading ? (
                'Loading...'
              ) : (
                <>
                  Showing{' '}
                  <span className="font-semibold text-[#15803d]">{displayedPlants.length}</span> of{' '}
                  <span className="font-semibold text-[#15803d]">{filteredPlants.length}</span>{' '}
                  trees
                </>
              )}
            </p>
          </div>

          {/* Tree Cards Grid */}
          <div className="inter">
            {loading ? (
              <div className="flex flex-col justify-center items-center py-20 gap-4">
                <div className="relative">
                  <div className="w-20 h-20 border-4 border-[#dcfce7] border-t-[#15803d] rounded-full animate-spin"></div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <i className="fa-solid fa-tree text-[#15803d] text-2xl"></i>
                  </div>
                </div>
                <p className="text-[#15803d] font-semibold text-lg animate-pulse">
                  Loading trees...
                </p>
              </div>
            ) : displayedPlants.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20">
                <div className="bg-[#dcfce7] p-8 rounded-full mb-6">
                  <i className="fa-solid fa-tree text-[#15803d] text-6xl opacity-50"></i>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">No trees found</h3>
                <p className="text-gray-600 mb-6">Try adjusting your filters or search query</p>
                <button
                  onClick={clearFilters}
                  className="btn text-white bg-gradient-to-r from-[#15803d] to-[#166534] border-none rounded-full hover:from-[#166534] hover:to-[#15803d] hover:scale-105 transition-all shadow-lg"
                >
                  <i className="fa-solid fa-rotate-right"></i>
                  Clear Filters
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                  {displayedPlants.map((plant, index) => {
                    const isLastElement = displayedPlants.length === index + 1
                    return (
                      <div
                        ref={isLastElement ? lastPlantRef : null}
                        key={plant.id}
                        className="card-fade-in"
                      >
                        <TreeCard plant={plant} onAddToCart={onAddToCart} />
                      </div>
                    )
                  })}
                </div>
                {loadingMore && (
                  <div className="flex justify-center items-center py-8">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 border-3 border-[#dcfce7] border-t-[#15803d] rounded-full animate-spin"></div>
                      <p className="text-[#15803d] font-medium">Loading more trees...</p>
                    </div>
                  </div>
                )}
                {!hasMore && displayedPlants.length > 0 && (
                  <div className="flex justify-center items-center py-8">
                    <p className="text-gray-600 font-medium">🌳 You've seen all the trees! 🌳</p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="inter relative overflow-hidden bg-gradient-to-br from-[#15803d] via-[#166534] to-[#14532d] py-20">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#facc15] rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-5">
          <div className="text-center mb-12">
            <h1 className="inter font-bold text-4xl md:text-5xl text-white mb-4">
              Our Global Impact
            </h1>
            <p className="text-white/80 text-lg max-w-2xl mx-auto">
              Together, we're making a real difference in the fight against climate change
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Trees Planted */}
            <div className="group relative bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                <div className="bg-gradient-to-r from-[#facc15] to-[#fbbf24] p-4 rounded-full shadow-xl">
                  <i className="fa-solid fa-tree text-[#15803d] text-3xl"></i>
                </div>
              </div>
              <div className="mt-8 text-center">
                <p className="text-5xl font-bold text-white mb-2">500K+</p>
                <p className="text-white/90 text-lg font-medium mb-2">Trees Planted</p>
                <p className="text-white/70 text-sm">Across 30+ countries worldwide</p>
              </div>
              <div className="mt-4 h-2 bg-white/20 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-[#facc15] to-[#fbbf24] w-3/4 rounded-full animate-pulse"></div>
              </div>
            </div>

            {/* Communities */}
            <div className="group relative bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                <div className="bg-gradient-to-r from-[#facc15] to-[#fbbf24] p-4 rounded-full shadow-xl">
                  <i className="fa-solid fa-users text-[#15803d] text-3xl"></i>
                </div>
              </div>
              <div className="mt-8 text-center">
                <p className="text-5xl font-bold text-white mb-2">120+</p>
                <p className="text-white/90 text-lg font-medium mb-2">Communities</p>
                <p className="text-white/70 text-sm">Local partners making change</p>
              </div>
              <div className="mt-4 h-2 bg-white/20 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-[#facc15] to-[#fbbf24] w-2/3 rounded-full animate-pulse"></div>
              </div>
            </div>

            {/* Countries */}
            <div className="group relative bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                <div className="bg-gradient-to-r from-[#facc15] to-[#fbbf24] p-4 rounded-full shadow-xl">
                  <i className="fa-solid fa-earth-americas text-[#15803d] text-3xl"></i>
                </div>
              </div>
              <div className="mt-8 text-center">
                <p className="text-5xl font-bold text-white mb-2">30+</p>
                <p className="text-white/90 text-lg font-medium mb-2">Countries</p>
                <p className="text-white/70 text-sm">Global reach, local impact</p>
              </div>
              <div className="mt-4 h-2 bg-white/20 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-[#facc15] to-[#fbbf24] w-5/6 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>

          {/* Additional Stats */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-[#facc15] mb-1">2.5M+</p>
              <p className="text-white/80 text-sm">Tons CO₂ Absorbed</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-[#facc15] mb-1">95%</p>
              <p className="text-white/80 text-sm">Survival Rate</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-[#facc15] mb-1">10K+</p>
              <p className="text-white/80 text-sm">Volunteers</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-[#facc15] mb-1">24/7</p>
              <p className="text-white/80 text-sm">Monitoring</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Home

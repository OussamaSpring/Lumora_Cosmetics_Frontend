import React, { useState } from 'react';
import axios from 'axios';
import Header from '../../component/Header/Header';
import img from '../../assets/img.png';
import './Search.css';

export default function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [priceError, setPriceError] = useState('');
  const [gender, setGender] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);

  const applyFilters = async () => {
    setPriceError('');
    const min = Number(minPrice);
    const max = Number(maxPrice);

    if ((minPrice && min < 0) || (maxPrice && max < 0)) {
      setPriceError('Prices must be positive numbers.');
      return;
    }

    if (minPrice && maxPrice && min >= max) {
      setPriceError('Max price must be greater than Min price.');
      return;
    }

    setLoading(true);
    try {
      const params = {
        searchTerm: searchTerm || null,
        categoryIds: activeCategory ? [activeCategory] : null,
        genders: gender || null,
        minPrice: minPrice ? min : null,
        maxPrice: maxPrice ? max : 500000,
      };

      const res = await axios.post('http://lumora.runasp.net/api/Search', params);
      setProducts(res.data);
    } catch (err) {
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleHeaderSearch = async (term) => {
    setSearchTerm(term);
    setActiveCategory(null); 
    setLoading(true);

    try {
      const params = {
        searchTerm: term,
        categoryIds: null,
        genders: null,
        minPrice: null,
        maxPrice: null,
      };

      const res = await axios.post('http://lumora.runasp.net/api/Search', params);
      setProducts(res.data);
    } catch (err) {
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCategorySearch = async (choice) => {
    setActiveCategory(choice);
    setSearchTerm(''); 
    setLoading(true);
    try {
      const params = {
        searchTerm: null,
        categoryIds: [choice],
        genders: null,
        minPrice: null,
        maxPrice: null,
      };

      const res = await axios.post('http://lumora.runasp.net/api/Search', params);
      setProducts(res.data);
    } catch (err) {
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="SearchPage">
      <Header
        onSearch={handleHeaderSearch}
        selectCategory={handleCategorySearch}
        activeCategory={activeCategory}
      />
      <div className="SearchBody">
        <div className="main-content">
          <div className="filter-box">
            <h3>Filter Products</h3>
            {priceError && (
              <div className="error-text">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
                  <path fill="currentColor" d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10s-4.477 10-10 10m0-2a8 8 0 1 0 0-16a8 8 0 0 0 0 16M11 7h2v2h-2zm0 4h2v6h-2z"/>
                </svg>
                {priceError}
              </div>
            )}

            <div className="filter-section">
              <label>Min Price:</label>
              <input
                type="number"
                value={minPrice}
                onChange={e => setMinPrice(e.target.value)}
                placeholder="0"
              />
            </div>

            <div className="filter-section">
              <label>Max Price:</label>
              <input
                type="number"
                value={maxPrice}
                onChange={e => setMaxPrice(e.target.value)}
                placeholder="1000"
              />
            </div>

            <div className="filter-section">
              <label>Gender:</label>
              <select
                value={gender || ''}
                onChange={e => setGender(e.target.value || null)}
              >
                <option value="">Choice</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="children">Children</option>
              </select>
            </div>

            <button onClick={applyFilters} className="apply-filters-btn">
              Apply Filters
            </button>
          </div>

          <div className="products-grid">
            {searchTerm && (
              <p style={{ gridColumn: '1 / -1', fontWeight: 'bold', marginBottom: '20px' }}>
                Search results for "{searchTerm}"
              </p>
            )}

            {loading ? (
              <p>Loading…</p>
            ) : products.length > 0 ? (
              products.map(product => (
                <div className="product-card" key={product.id}>
                  <div className="product-image">
                    <img src={img} alt={product.name} />
                  </div>
                  <h4 className="product-title">{product.name}</h4>
                  <p className="product-description">
                    {product.about.length > 100
                      ? `${product.about.substring(0, 100)}...`
                      : product.about}
                  </p>
                  <div className="product-footer">
                    <span className="product-price">${product.minPrice}</span>
                  </div>
                  <button className="add-to-cart-btn">Add to Cart</button>
                </div>
              ))
            ) : (
              <p>No products found. Try applying different filters!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

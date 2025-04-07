import React, { useEffect, useState } from 'react';
import Product from './Product';
import './products.css';

function Pro_search({ search }) {
  const api_url = "https://fakestoreapi.com/products";
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    // Fetch products when component mounts
    fetch(api_url)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        // Filter products based on the search prop
        if (search && search.trim() !== "") {
          const filtered = data.filter(product => 
            // Check in title and description for the search term
            (product.title && product.title.toLowerCase().includes(search.toLowerCase())) ||
            (product.description && product.description.toLowerCase().includes(search.toLowerCase())) ||
            (product.category && product.category.toLowerCase().includes(search.toLowerCase()))
          );
          setFilteredProducts(filtered);
        } else {
          setFilteredProducts([]);
        }
      })
      .catch(error => console.error("Error fetching products:", error));
  }, [search]); // Re-run effect when search changes

  // If search is empty, don't render anything
  if (!search || search.trim() === "") {
    return null;
  }

  return (
    <div className="products-container">
      <h2 className="search-heading">Search Results for: "{search}"</h2>
      <div className="search-results">
        {filteredProducts.length > 0 ? (
          <div className="products-grid">
            {filteredProducts.map((product) => (
              <Product key={product.id} product={product} showbutton={true} />
            ))}
          </div>
        ) : (
          <p className="no-results">No products found matching "{search}"</p>
        )}
      </div>
    </div>
  );
}

export default Pro_search;
import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import api from '../utils/api';
import './Home.css'; // Optional CSS for styling

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get('/products'); // Replace with the actual backend endpoint
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <h1>Welcome to Our E-Commerce Store</h1>
        <p>Discover the best products at unbeatable prices!</p>
        <button className="cta-btn">Shop Now</button>
      </section>

      {/* Featured Products */}
      <section className="featured-products">
        <h2>Featured Products</h2>
        {loading ? (
          <p>Loading products...</p>
        ) : (
          <div className="product-grid">
            {products.length > 0 ? (
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))
            ) : (
              <p>No products available.</p>
            )}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;

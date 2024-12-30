import React, { useState, useEffect, useRef, useCallback } from 'react';
import api from '../../../frontend1/src/utils/api';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef();

  const lastProductRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await api.get('/customer/products', { params: { page } });
        setProducts((prevProducts) => [...prevProducts, ...response.data.products]);
        setHasMore(page < response.data.totalPages);
      } catch (error) {
        console.error('Error fetching products:', error.response?.data?.message || error.message);
      }
      setLoading(false);
    };

    fetchProducts();
  }, [page]);

  return (
    <div>
      <h1>Product List</h1>
      <div>
        {products.map((product, index) => {
          if (products.length === index + 1) {
            return (
              <div ref={lastProductRef} key={product._id}>
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <p>${product.price}</p>
              </div>
            );
          } else {
            return (
              <div key={product._id}>
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <p>${product.price}</p>
              </div>
            );
          }
        })}
        {loading && <p>Loading...</p>}
      </div>
    </div>
  );
};

export default ProductList;

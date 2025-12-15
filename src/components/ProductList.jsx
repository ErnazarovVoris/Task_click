import { useEffect, useState } from "react";

export default function ProductList({ addToCart }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  return (
    <div className="grid">
      {products.map(p => (
        <div className="product-card" key={p.id}>
          <img src={p.image} width="100" />
          <h4>{p.title.slice(0, 20)}...</h4>
          <p>${p.price}</p>
          <button onClick={() => addToCart(p)}>Add to cart</button>
        </div>
      ))}
    </div>
  );
}

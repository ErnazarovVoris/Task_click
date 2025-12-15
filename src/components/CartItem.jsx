export default function CartItem({ item, removeItem, increase, decrease }) {
  return (
    <div className="cart-item">
      <h4>{item.title}</h4>
      <p>${item.price}</p>

      <button onClick={() => decrease(item.id)}>-</button>
      <span style={{ margin: "0 10px" }}>{item.qty}</span>
      <button onClick={() => increase(item.id)}>+</button>

      <button
        onClick={() => removeItem(item.id)}
        style={{ background: "red", marginLeft: 10 }}
      >
        Remove
      </button>
    </div>
  );
}

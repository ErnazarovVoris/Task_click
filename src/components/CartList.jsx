import CartItem from "./CartItem";

export default function CartList({ cart, removeItem, increase, decrease }) {
  const totalItems = cart.reduce((sum, i) => sum + i.qty, 0);
  const totalPrice = cart
    .reduce((sum, i) => sum + i.qty * i.price, 0)
    .toFixed(2);

  return (
    <div>
      {cart.length === 0 && <p>Cart is empty</p>}

      {cart.map(item => (
        <CartItem
          key={item.id}
          item={item}
          removeItem={removeItem}
          increase={increase}
          decrease={decrease}
        />
      ))}

      <hr />

      <p><b>Total Items:</b> {totalItems}</p>
      <p><b>Total Price:</b> ${totalPrice}</p>
    </div>
  );
}

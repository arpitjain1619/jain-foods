import { useSelector } from "react-redux";
import MenuItemDetail from "./MenuItemDetail";

const Cart = () => {
  // `store` is just a parameter name — it can be named anything (e.g. state)
  // React-Redux passes the current Redux state into this parameter. It is NOT the Redux store object itself.
  // The Redux state has the structure: { cart: { items: [] } }, so we can select the cart items using `store.cart.items`
  const cartItems = useSelector((store) => store.cart.items);

  return (
    <>
      {cartItems.map((cartItem) => {
        console.log(cartItem);
        return (
          <div className="max-w-4xl mx-auto px-6 mt-10" key={cartItem.id}>
            <MenuItemDetail info={cartItem} />
          </div>
        );
      })}
    </>
  );
};

export default Cart;

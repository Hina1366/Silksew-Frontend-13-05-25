import React, { useContext, useEffect, useState } from "react";
import "./CartItems.css";
import { ShopContext } from "../../context/ShopContext";
import { useNavigate } from "react-router-dom";

const CartItems = () => {
  const { cartItems, removeFromCart, getTotalCartAmount, products } = useContext(ShopContext);
  const [localCartItems, setLocalCartItems] = useState(cartItems); // Local state to trigger re-renders
  const [localProducts, setLocalProducts] = useState(products); // Local state for products
  const navigate = useNavigate();

  // Sync local state with context changes
  useEffect(() => {
    setLocalCartItems(cartItems);
    setLocalProducts(products);
  }, [cartItems, products]); // Trigger updates whenever cartItems or products change

  return (
    <div className="cartitems">
      <div className="cartitems-header">
        <p>Product</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Size</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />
      {localCartItems.map((cartItem) => {
        const { productId, quantity, size } = cartItem;

        // Find the corresponding product in the products array
        const product = localProducts.find((p) => p._id === productId);

        if (!product) {
          console.warn(`Product with ID ${productId} not found.`);
          return null;
        }

        return (
          <div key={`${productId}-${size}`} className="cartitem">
            <img src={product.images[0]} alt={product.name} />
            <p>{product.name}</p>
            <p>Rs {product.price}</p>
            <p>{quantity}</p>
            <p>{size}</p>
            <p>Rs {quantity * product.price}</p>
            <button onClick={() => removeFromCart(productId, size)}>Remove</button>
          </div>
        );
      })}
      <hr />
      <div className="cartitems-down">
        <div className="cartitems-total">
          <h1>Cart Totals</h1>
          <div>
            <div className="cartitems-total-item">
              <p>Subtotal</p>
              <p>Rs.{getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <p>Shipping Fee</p>
              <p>Free</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <h3>Total</h3>
              <h3>Rs.{getTotalCartAmount()}</h3>
            </div>
          </div>
          <button onClick={() => navigate("/checkout")}>PROCEED TO CHECKOUT</button>
        </div>
        <div className="cartitems-promocode">
          <p>If you have a promo code, enter it here</p>
          <div className="cartitems-promobox">
            <input type="text" placeholder="Promo code" />
            <button>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItems;

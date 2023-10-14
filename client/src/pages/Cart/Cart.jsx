import React, { useEffect, useState } from "react";
import "./cart.scss";
import axios from "axios";
import { useSelector } from "react-redux";
import { placeOrderRoute } from "../../api/api.js";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const user = useSelector((state) => state.user.user);

  const [cartItemsWithQuantity, setCartItemsWithQuantity] = useState([]);
  const [totalAmount, setTotalAmount] = useState();

  useEffect(() => {
    let copyCartItems = [...cartItems];
    copyCartItems = copyCartItems.map((item) => ({ ...item, quantity: 1 }));
    setCartItemsWithQuantity([...copyCartItems]);
  }, [cartItems]);

  const handleQuantityChange = (name, val) => {
    let copyCartItems = [...cartItemsWithQuantity];
    copyCartItems = copyCartItems.map((item) => {
      if (item.name === name) {
        item.quantity = Number(val);
      }
      return item;
    });
    setCartItemsWithQuantity([...copyCartItems]);
  };

  useEffect(() => {
    if (cartItemsWithQuantity.length > 0) {
      const calulateTotalAmount = () => {
        let totalAmount = 0;
        cartItemsWithQuantity.forEach((item) => {
          totalAmount = totalAmount + item.quantity * item.price;
        });

        return totalAmount;
      };

      setTotalAmount(calulateTotalAmount());
    }
  }, [cartItems, cartItemsWithQuantity]);

  const placeOrderHandle = async () => {
    try {
      const response = await axios.post(placeOrderRoute, {
        user: user.name,
        totalAmount: totalAmount,
        cartItems: cartItems,
      });

      if (response?.data?.res) {
        alert(response?.data?.msg);
      } else {
        alert("Order failed try again");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {cartItemsWithQuantity.length > 0 ? (
        <div>
          {cartItemsWithQuantity.map((item, index) => (
            <div key={index}>
              <img src={item.image} alt="" />
              <h3>{item.name}</h3>
              <p>{item.rating}</p>
              <p>Rs{item.price}</p>
              <input
                type="number"
                min={1}
                max={5}
                value={item.quantity}
                onChange={(e) => {
                  handleQuantityChange(item.name, e.target.value);
                }}
              />
            </div>
          ))}
          <p>Total amount {totalAmount}</p>
          <button onClick={placeOrderHandle}>Place order</button>
        </div>
      ) : (
        <p>Add some items, please</p>
      )}
    </div>
  );
};

export default Cart;

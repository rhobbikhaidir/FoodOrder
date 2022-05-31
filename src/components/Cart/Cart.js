import React, { Fragment, useContext, useState } from "react";
import CartContext from "../../store/cart-context";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import CheckOut from "./CheckOut";
const Cart = (props) => {
  const [isCheckout, setIsCheckOut] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSUbmit] = useState(false);
  const cartCtx = useContext(CartContext);
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const orderHandler = () => {
    <p>Succesfully sent Order!</p>;
    setIsCheckOut(true);
  };

  const submitOrderHandler = async (userData) => {
    setIsSubmitting(true);
    await fetch(
      "https://tesapp-d0cbe-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          orderedItems: cartCtx.items,
        }),
      }
    );
    setIsSubmitting(false);
    setDidSUbmit(true);
    cartCtx.clearCart();
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const modalActions = (
    <div className={classes.actions}>
      <button className={classes["button-alt"]} onClick={props.onClose}>
        Close
      </button>
      <button className={classes.button} onClick={orderHandler}>
        Order
      </button>
    </div>
  );

  const cartModelContents = (
    <Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && (
        <CheckOut onCancel={props.onClose} onConfirm={submitOrderHandler} />
      )}
      {!isCheckout && modalActions}
    </Fragment>
  );

  const isSubmittingModalContent = <p>Sending Order Data..</p>;
  const didSubmitModalContent = (
    <Fragment>
      <p>Succesfully sent Order!</p>
      <div className={classes.actions}>
        <button className={classes["button-alt"]} onClick={props.onClose}>
          Close
        </button>
      </div>
    </Fragment>
  );

  return (
    <Modal onClose={props.onClose}>
      {!isSubmitting && !didSubmit && cartModelContents}
      {isSubmitting && isSubmittingModalContent}
      {didSubmit && !isSubmitting && didSubmitModalContent}
    </Modal>
  );
};

export default Cart;

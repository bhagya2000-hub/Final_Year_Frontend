import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MetaData from '../layout/MetaData';
import { useSelector, useDispatch } from 'react-redux';
import { removeCartItem, updateCartItemQuantity } from '../../redux/feature/cardSlice';


function Cart() {
    const navigate=useNavigate();
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  const increaseQuantity = (productId, quantity, stock) => {
    const newQuantity = quantity + 1;
    if (newQuantity > stock) return;
    
    dispatch(updateCartItemQuantity({ productId, quantity: newQuantity }));
  };

  const decreaseQuantity = (productId, quantity) => {
    const newQuantity = quantity - 1;
    if (newQuantity < 1) return;
    
    dispatch(updateCartItemQuantity({ productId, quantity: newQuantity }));
  };

  const removeItemHandler = (productId) => {
    dispatch(removeCartItem(productId));
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const checkoutHandler = () => {
    navigate("/shipping");
  }

  return (
    <>
      <MetaData title="Your Cart" />
      
      {cartItems?.length === 0 ? (
        <h2 className="mt-5 text-center">Your Cart is Empty</h2>
      ) : (
        <div className="container">
          <h2 className="mt-5">Your Cart: <b>{cartItems?.length} items</b></h2>
          <div className="row d-flex justify-content-between">
            <div className="col-12 col-lg-8">
              {cartItems?.map((item) => (
                <div key={item.productId}>
                  <hr />
                  <div className="cart-item">
                    <div className="row">
                      <div className="col-4 col-lg-3">
                        <img
                          src={item?.image}
                          alt={item?.name}
                          height="90"
                          width="115"
                        />
                      </div>
                      <div className="col-5 col-lg-3">
                        <Link to={`/products/${item?.productId}`}>{item?.name}</Link>
                      </div>
                      <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                        <p id="card_item_price">Rs. {item?.price}</p>
                      </div>
                      <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                        <div className="stockCounter d-inline">
                          <span 
                            className="btn btn-danger minus" 
                            onClick={() => decreaseQuantity(item.productId, item.quantity)}
                          > - </span>
                          <input
                            type="number"
                            className="form-control count d-inline"
                            value={item.quantity}
                            readOnly
                          />
                          <span 
                            className="btn btn-primary plus"
                            onClick={() => increaseQuantity(item.productId, item.quantity, item.stock)}
                          > + </span>
                        </div>
                      </div>
                      <div className="col-4 col-lg-1 mt-4 mt-lg-0">
                        <i 
                          id="delete_cart_item" 
                          className="fa fa-trash btn btn-danger"
                          onClick={() => removeItemHandler(item.productId)}
                        ></i>
                      </div>
                    </div>
                  </div>
                  <hr />
                </div>
              ))}
            </div>
            <div className="col-12 col-lg-3 my-4">
              <div id="order_summary">
                <h4>Order Summary</h4>
                <hr />
                <p>Subtotal: <span className="order-summary-values">
                  {cartItems.reduce((total, item) => total + item.quantity, 0)} Units
                </span></p>
                <p>Est. total: <span className="order-summary-values">
                  Rs. {calculateSubtotal()}
                </span></p>
                <hr />
                <button id="checkout_btn" className="btn btn-primary w-100" onClick={checkoutHandler}>
                  Check out
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Cart;
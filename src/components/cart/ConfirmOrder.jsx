import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'; // Ensure this import is included
import { caluculateOrderCost } from '../helpers/Helpers';
import CheckoutSteps from './CheckoutSteps';

function ConfirmOrder() {
    const { shippingInfo, cartItems } = useSelector((state) => state.cart); // Added cartItems
    const { user } = useSelector((state) => state.auth);

    const { itemPrice, shippingPrice, taxtPrice, totalPrice } = caluculateOrderCost(cartItems);
    console.log(shippingInfo)

    return (
        <>
        <CheckoutSteps shipping confirmOrder/>
        <div className="row d-flex justify-content-between">
            <div className="col-12 col-lg-8 mt-5 order-confirm">
                <h4 className="mb-3">Shipping Info</h4>
                <p><b>Name:</b> {user?.name}</p>
                <p><b>Phone:</b> {shippingInfo?.phoneNo}</p>
                <p className="mb-4">
                    <b>Address:</b> {shippingInfo?.address}, {shippingInfo?.city}, 
                    {shippingInfo?.
zipCode
}, {shippingInfo?.country}  
                </p>

                <hr />
                <h4 className="mt-4">Your Cart Items:</h4>

                {cartItems?.map((item) => (
                    <React.Fragment key={item.product}> {/* Use key for list items */}
                        <hr />
                        <div className="cart-item my-1">
                            <div className="row">
                                <div className="col-4 col-lg-2">
                                    <img
                                        src={item?.image}
                                        alt={item?.name} // Use item name for alt text
                                        height="45"
                                        width="65"
                                    />
                                </div>

                                <div className="col-5 col-lg-6">
                                    <Link to={`/product/${item.product}`}>{item?.name}</Link>
                                </div>

                                <div className="col-4 col-lg-4 mt-4 mt-lg-0">
                                    <p>{item.quantity} x Rs. {item.price} = <b>Rs. {(item.quantity * item.price).toFixed(2)}</b></p>
                                </div>
                            </div>
                        </div>
                        <hr />
                    </React.Fragment>
                ))}

            </div>

            <div className="col-12 col-lg-3 my-4">
                <div id="order_summary">
                    <h4>Order Summary</h4>
                    <hr />
                    <p>Subtotal: <span className="order-summary-values">{itemPrice}</span></p>
                    <p>Shipping: <span className="order-summary-values">{shippingPrice}</span></p>
                    <p>Tax: <span className="order-summary-values">{taxtPrice}</span></p>

                    <hr />

                    <p>Total: <span className="order-summary-values">{totalPrice}</span></p>

                    <hr />
                    <Link to="/payment_methods" id="checkout_btn" className="btn btn-primary w-100">
                        Proceed to Payment
                    </Link>
                </div>
            </div>
        </div>
        </>
    );
}

export default ConfirmOrder;

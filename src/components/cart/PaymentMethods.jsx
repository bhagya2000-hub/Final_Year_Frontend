import React, { useEffect, useState } from "react";
import CheckoutSteps from "./CheckoutSteps";
import { useSelector } from "react-redux";
import { caluculateOrderCost } from "../helpers/Helpers";
import toast from "react-hot-toast";
import { useCreateNewOrderMutation, useStripeCheckoutSessionMutation } from "../../redux/api/oderApi";

import { useNavigate } from "react-router-dom";

function PaymentMethods() {
  const navigate = useNavigate();
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const [createNewOrder, { isLoading, error, isSuccess }] =
    useCreateNewOrderMutation();

  const [stripeCheckoutSession, { data: checkoutData, error: checkoutError, isLoading: checkoutLoading }] =
    useStripeCheckoutSessionMutation();

  useEffect(() => {
    if (checkoutData) {
      window.location.href=checkoutData?.url;
    }
    if (checkoutError) {
      toast.error(checkoutError?.data?.message || "Error creating checkout session");
    }
  }, [checkoutData, checkoutError, navigate]);
    
  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }
    if (isSuccess) {
      toast.success("Order Created Successfully");
      navigate("/me/orders?order_success=true");
    }
  }, [error, isSuccess, navigate]);

  const [method, setMethod] = useState("");
    
  const submitHandler = (e) => {
    e.preventDefault();
    
    if (!method) {
      toast.error("Please select a payment method");
      return;
    }
        
    const { itemPrice, shippingPrice, taxtPrice, totalPrice } =
      caluculateOrderCost(cartItems);

    // Validate cart and shipping info for all payment methods
    if (!cartItems || cartItems.length === 0) {
      toast.error("Your cart is empty");
      return;
    }
    
    if (!shippingInfo || !shippingInfo.address || !shippingInfo.city || !shippingInfo.phoneNo) {
      toast.error("Please complete shipping information");
      return;
    }
    
    // Common order items data preparation
    const orderItems = cartItems.map(item => ({
      product: item.productId,
      name: item.name,
      price: String(item.price), // Convert to string as per schema
      image: item.image,
      quantity: Number(item.quantity)
    }));
    
    if (method === "COD") {
      // Fix the order data to match the schema
      const orderData = {
        shippingInfo,
        user: user._id, // Add the user ID
        orderItems,
        paymentMethods: "COD", // Changed from paymentMethod to paymentMethods
        paymentInfo: {
          status: "Not Paid"
        },
        itemsPrice: Number(itemPrice),
        taxAmount: Number(taxtPrice),
        shippingAmount: Number(shippingPrice),
        totalAmount: Number(totalPrice),
        orderStatus: "Processing" // Adding this explicitly
      };
      
      console.log("Sending order data:", orderData);
      createNewOrder(orderData);
    }
    
    if (method === "Card") {
      // Prepare data for Stripe checkout session
      const checkoutData = {
        cartItems,
        shippingInfo,
        itemsPrice: Number(itemPrice)
      };
      
      console.log("Creating Stripe checkout session:", checkoutData);
      stripeCheckoutSession(checkoutData);
    }
  };

  return (
    <>
      <CheckoutSteps shipping confirmOrder payment />
      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form className="shadow rounded bg-body" onSubmit={submitHandler}>
            <h2 className="mb-4">Select Payment Method</h2>
            
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="payment_mode"
                id="codradio"
                value="COD"
                onChange={() => setMethod("COD")}
                checked={method === "COD"}
              />
              <label className="form-check-label" htmlFor="codradio">
                Cash on Delivery
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="payment_mode"
                id="cardradio"
                value="Card"
                onChange={() => setMethod("Card")}
                checked={method === "Card"}
              />
              <label className="form-check-label" htmlFor="cardradio">
                Card - VISA, MasterCard
              </label>
            </div>
            
            <button
              id="shipping_btn"
              type="submit"
              className="btn btn-primary py-2 w-100"
              disabled={isLoading || checkoutLoading || !method}
            >
              {isLoading || checkoutLoading ? "Processing..." : "CONTINUE"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default PaymentMethods;
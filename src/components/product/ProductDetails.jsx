import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetProductDetailsQuery } from "../../redux/api/productApi";
import Loader from "../layout/Loader";
import toast from "react-hot-toast";
import StarRating from "react-star-ratings";
import { useDispatch, useSelector } from "react-redux";
import { setCartItems } from "../../redux/feature/cardSlice";
import NewReview from "../review/NewReview";
import ListReview from "../review/ListReview";

function ProductDetails() {
  const dispatch=useDispatch();
  const params = useParams();
  const [qauntity, setQuantity] = useState(1);
  const [activIng, settActivIng] = useState("");

  const { data, isLoading, error, isError } = useGetProductDetailsQuery(
    params?.id
  );
  const product = data?.product;
  const {isAuthenticated}=useSelector((state) => state.auth);

 
  useEffect(() => {
    settActivIng(
      product?.images[0] ? product?.images[0]?.url : "/images/default_product"
    );
  }, [product]);

  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message);
    }
  }, [isError]);

  const increaseQty=() => {
    const count=document.querySelector(".count");
    if (count.valueAsNumber >= product?.stock)  return;

    const qty= count.valueAsNumber + 1;
    setQuantity(qty);
    
  }
  const decreseQty=() => {
    const count=document.querySelector(".count");
    if (count.valueAsNumber <= 1) return;

    const qty= count.valueAsNumber - 1;
    setQuantity(qty);
  }

  const setItemsToCard = () => {
    const cartItem = {
      productId: product?._id,  
      name: product?.name,
      price: product?.price,
      image: product?.images[0]?.url,
      stock: product?.stock,
      quantity: qauntity, 
    };
    
    dispatch(setCartItems(cartItem)); // Corrected method name
    toast.success("Item added to cart successfully");
  };
  if (isLoading) return <Loader />;

  console.log(data);
  return (
    <>
    <div className="row d-flex justify-content-around">
      <div className="col-12 col-lg-5 img-fluid" id="product_image">
        <div className="p-3">
          <img
            className="d-block w-100"
            src={activIng}
            alt={product?.name}
            width="340"
            height="390"
          />
        </div>
        <div className="row justify-content-start mt-5">
          {product?.images.map((img) => (
            <div className="col-2 ms-4 mt-2" key={img.id}>
              {" "}
              <a role="button">
                <img
                  className={`d-block border rounded p-3 cursor-pointer ${
                    img?.url === activIng ? "border-warning" : ""
                  } `}
                  height="100"
                  width="100"
                  src={img?.url}
                  alt={img?.url}
                  onClick={(e) => settActivIng(img.url)}
                />
              </a>
            </div>
          ))}
        </div>
      </div>

      <div className="col-12 col-lg-5 mt-5">
        <h3>{product?.name}</h3>
        <p id="product_id">{product?._id}</p>

        <hr />

        <div className="d-flex">
          <StarRating
            rating={product?.rating}
            starRatedColor="#ffb829"
            numberOfStars={5}
            name="rating"
            starDimension="15px"
            starSpacing="1px"
          />
          <span id="no-of-reviews" className="pt-1 ps-2">
            {" "}
            ({product?.numOfReviews} Reviews){" "}
          </span>
        </div>
        <hr />

        <p id="product_price">Rs. {product?.price}</p>
        <div className="stockCounter d-inline">
          <span className="btn btn-danger minus" onClick={decreseQty}>-</span>
          <input
            type="number"
            className="form-control count d-inline"
            value={qauntity}
            readonly
          />
          <span className="btn btn-primary plus" onClick={increaseQty}>+</span>
        </div>
        <button
          type="button"
          id="cart_btn"
          className="btn btn-primary d-inline ms-4"
          disabled={product.stock <=0}
          onClick={setItemsToCard}
        >
          Add to Cart
        </button>

        <hr />

        <p>
          Status:{" "}
          <span
            id="stock_status"
            className={product?.stock > 0 ? "greenColor" : "redColor"}
          >
            {product?.stock > 0 ? "In Stock" : "Out of Stock"}
          </span>
        </p>

        <hr />

        <h4 className="mt-2">Description:</h4>
        <p>{product?.description}</p>
        <hr />
        <p id="product_seller mb-3">
          Sold by: <strong>{product?.seller}</strong>
        </p>

        {isAuthenticated ? ( 
          <NewReview productId={product?._id}/>

        ):(
          <div className="alert alert-danger my-5" type="alert">
          Login to post your review.
        </div>
        )}
        
      </div>
    </div>
    {product?.reviews?.length > 0 && <ListReview reviews={product?.reviews} />}
    </>
  );
}

export default ProductDetails;

import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getPriceQueryParams } from "../helpers/Helpers";
import { PRODUCT_CATEGORIES } from "../constants/Constants";
import StarRating from "react-star-ratings";

function Filters() {
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(0);

  const navigate = useNavigate();
  let [searchParams] = useSearchParams();

  useEffect(() => {
    if (searchParams.has("min")) {
      setMin(searchParams.get("min"));
    }
    if (searchParams.has("max")) {
      setMax(searchParams.get("max"));
    }
  }, [searchParams]); // Add dependency array for searchParams

  //Handle Category and Rating Filter
  const handleClick = (checkbox) => {
    const checkboxes = document.getElementsByName(checkbox.name);

    checkboxes.forEach((item) => {
      if (item !== checkbox) item.checked = false;
    });
    if (checkbox.checkbox === false) {
      //delete filter from query
      if (searchParams.has(checkbox.name)) {
        searchParams.delete(checkbox.name);
        const path = window.location.pathname + "?" + searchParams.toString();
        navigate(path);
      }
    } else {
      //set new filter value if  already there
      if (searchParams.has(checkbox.name)) {
        searchParams.set(checkbox.name, checkbox.value);
      } else {
        //Append new filter
        searchParams.append(checkbox.name, checkbox.value);
      }
      const path = window.location.pathname + "?" + searchParams.toString();
      navigate(path);
    }
  };

  //Handle price filter
  const handleButtonClick = (e) => {
    e.preventDefault();

    searchParams = getPriceQueryParams(searchParams, "min", min);
    searchParams = getPriceQueryParams(searchParams, "max", max);

    const path = window.location.pathname + "?" + searchParams.toString();
    navigate(path);
  };
  const defaultCheckHandler = (checkboxType, checkboxValue) => {
    const value = searchParams.get(checkboxType);
    if (checkboxValue === value) return true;
    return false;
  };

  return (
    <div class="border p-3 filter">
      <h3>Filters</h3>
      <hr />
      <h5 class="filter-heading mb-3">Price</h5>
      <form
        id="filter_form"
        class="px-2"
        action="your_action_url_here"
        method="get"
        onClick={handleButtonClick}
      >
        <div class="row">
          <div class="col">
            <input
              type="text"
              class="form-control"
              placeholder="Min ($)"
              name="min"
              value={min}
              onChange={(e) => setMin(e.target.value)}
            />
          </div>
          <div class="col">
            <input
              type="text"
              class="form-control"
              placeholder="Max ($)"
              name="max"
              value={max}
              onChange={(e) => setMax(e.target.value)}
            />
          </div>
          <div class="col">
            <button type="submit" class="btn btn-primary">
              GO
            </button>
          </div>
        </div>
      </form>
      <hr />
      <h5 class="mb-3">Category</h5>
      {PRODUCT_CATEGORIES?.map((category) => (
        <div class="form-check">
          <input
            class="form-check-input"
            type="checkbox"
            name="category"
            id="check4"
            value={category}
            defaultChecked={defaultCheckHandler("category", category)}
            onClick={(e) => handleClick(e.target)}
          />
          <label class="form-check-label" for="check4">
            {" "}
            {category}
          </label>
        </div>
      ))}

      <hr />
      <h5 class="mb-3">Ratings</h5>
      {[5, 4, 3, 2, 1].map((rating) => (
        <div class="form-check" key={rating}>
          <input
            class="form-check-input"
            type="checkbox"
            name="ratings"
            id={`check-${rating}`} // Unique id for each checkbox
            value={rating}
            defaultChecked={defaultCheckHandler("ratings", rating.toString())} // Check against "ratings"
            onClick={(e) => handleClick(e.target)}
          />
          <label class="form-check-label" htmlFor={`check-${rating}`}>
            <StarRating
              rating={rating}
              starRatedColor="#ffb829"
              numberOfStars={5}
              name="rating"
              starDimension="21px"
              starSpacing="1px"
            />
          </label>
        </div>
      ))}
    </div>
  );
}

export default Filters;

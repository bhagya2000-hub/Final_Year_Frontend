import React, { useEffect } from 'react'
import {  countries} from 'countries-list'
import { useDispatch, useSelector } from 'react-redux';
import { saveShppingInfo } from '../../redux/feature/cardSlice';
import { useNavigate } from 'react-router-dom';
import CheckoutSteps from './CheckoutSteps';

function Shipping() {
    //console.log(countries)

    const dispatch=useDispatch()
    const navigate=useNavigate()

    const countryList = Object.values(countries)
    const [address, setAddress] = React.useState("");
    const [city, setCity] = React.useState("");
    const [phoneNo, setPhoneNo] = React.useState("");
    const [zipCode, setZipCode] = React.useState("");
    const [country, setCountry] = React.useState("");
    const {shippingInfo}=useSelector((state)=>state.cart)

    useEffect(()=>{
        if(shippingInfo){
            setAddress(shippingInfo?.address)
            setCity(shippingInfo?.city)
            setPhoneNo(shippingInfo?.phoneNo)
            setZipCode(shippingInfo?.zipCode)
            setCountry(shippingInfo?.country)
        }

    },[shippingInfo])


    const submitHandler = (e) => {
        e.preventDefault();
        // Handle form submission logic here

        dispatch(saveShppingInfo({ address, city, phoneNo, zipCode, country }));
        navigate("/confirm_order")
    };


  return (
    <>
    <CheckoutSteps shipping/>
    <div class="row wrapper mb-5">
    <div class="col-10 col-lg-5">
      <form
        class="shadow rounded bg-body"
       onSubmit={submitHandler}
      >
        <h2 class="mb-4">Shipping Info</h2>
        <div class="mb-3">
          <label htmlFor="address_field" class="form-label">Address</label>
          <input
            type="text"
            id="address_field"
            class="form-control"
            name="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>

        <div class="mb-3">
          <label htmlFor="city_field" class="form-label">City</label>
          <input
            type="text"
            id="city_field"
            class="form-control"
            name="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </div>

        <div class="mb-3">
          <label htmlFor="phone_field" class="form-label">Phone No</label>
          <input
            type="tel"
            id="phone_field"
            class="form-control"
            name="phoneNo"
            value={phoneNo}
            onChange={(e) => setPhoneNo(e.target.value)}
            required
          />
        </div>

        <div class="mb-3">
          <label htmlFor="zip_code_field" class="form-label"
            >Zip Code</label
          >
          <input
            type="number"
            id="postal_code_field"
            class="form-control"
            name="postalCode"
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)} 
            required
          />
        </div>

        <div class="mb-3">
          <label htmlFor="country_field" class="form-label">Country</label>
          <select
            id="country_field"
            class="form-select"
            name="country"
            value={country}
            onChange={(e) => setCountry(e.target.value)} 
            required
          >
            {countryList.map((country) => (
                <option key={country.name} value={country.name}>
                    {country.name}
                </option>
            )
            )}
            
          </select>
        </div>

        <button id="shipping_btn" type="submit" class="btn w-100 py-2">
          CONTINUE
        </button>
      </form>
    </div>
  </div>
  </>
  )
}

export default Shipping

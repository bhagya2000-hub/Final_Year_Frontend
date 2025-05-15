// import React from 'react'
// import Search from './Search'
// import { useGetMeQuery } from '../../redux/api/userApi'
// import { useSelector } from 'react-redux'
// import { Link } from 'react-router-dom'



// function Header() {

//   const {isLoading,data}=useGetMeQuery()
//   console.log(data);
  

//   const {user}=useSelector((state)=>state.auth)
//   console.log('User:', user);
//   console.log('Loading:', isLoading);

//   return (
//     <nav className="navbar row">
//       <div className="col-12 col-md-3 ps-5">
//         <div className="navbar-brand">
//           <a href="/">
//             <img src="/images/flowerLogo.png" alt="ShopIT Logo" />
//           </a>
//         </div>
//       </div>
//       <div className="col-12 col-md-6 mt-2 mt-md-0">
//         <Search/>
//       </div>
//       <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
//         <a href="/cart" style={{textDecoration: "none"}}>
//           <span id="cart" className="ms-3"> Cart </span>
//           <span className="ms-1" id="cart_count">0</span>
//         </a>
//         {user ?(
//            <div className="ms-4 dropdown">
//            <button
//              className="btn dropdown-toggle text-white"
//              type="button"
//              id="dropDownMenuButton"
//              data-bs-toggle="dropdown"
//              aria-expanded="false"
//            >
//              <figure className="avatar avatar-nav">
//                <img
//                  src="../images/default_avatar.jpg"
//                  alt="User Avatar"
//                  className="rounded-circle"
//                />
//              </figure>YYyyyyyy
//              <span>{user.name || 'User'}</span>
//            </button>
//            <div className="dropdown-menu w-100" aria-labelledby="dropDownMenuButton">
//              <a className="dropdown-item" href="/admin/dashboard"> Dashboard </a>
 
//              <a className="dropdown-item" href="/me/orders"> Orders </a>
 
//              <a className="dropdown-item" href="/me/profile"> Profile </a>
 
//              <a className="dropdown-item text-danger" href="/"> Logout </a>
//            </div>
//          </div>
 

//         ):(
//           !isLoading && (
//             <Link to="/login" className="btn ms-4" id="login_btn"> Login </Link>      
//               )
//   )}
        
        
//       </div>
//     </nav>
//   )
// }

import React from 'react';
import Search from './Search';
import { useGetMeQuery } from '../../redux/api/userApi';
import { Link, useNavigate } from 'react-router-dom';
import { useLazyLogoutQuery } from '../../redux/api/authApi';
import { useSelector } from 'react-redux';

function Header() {
  const navigate = useNavigate();
  const { isLoading, data: user } = useGetMeQuery();
  const [logout] = useLazyLogoutQuery();

  // Safely access cartItems with a default empty array
  const cartItems = useSelector((state) => state.cart?.cartItems || []);

  const logoutHandler = () => {
    logout();
    navigate(0);
  };

  return (
    <nav className="navbar row">
      <div className="col-12 col-md-3 ps-5">
        <div className="navbar-brand">
          <a href="/">
            <img 
              src={user?.avatar ? user.avatar.url : "/images/flowerLogo.png"}
              alt="ShopIT Logo" 
            />
          </a>
        </div>
      </div>
      <div className="col-12 col-md-6 mt-2 mt-md-0">
        <Search />
      </div>
      <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
        <a href="/cart" style={{ textDecoration: "none" }}>
          <span id="cart" className="ms-3"> Cart </span>
          <span className="ms-1" id="cart_count">{cartItems.length}</span>
        </a>
        {user ? (
          <div className="ms-4 dropdown">
            <button
              className="btn dropdown-toggle text-white"
              type="button"
              id="dropDownMenuButton"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <figure className="avatar avatar-nav">
                <img
                  src={user.avatar?.url || "../images/default_avatar.jpg"}
                  alt="User Avatar"
                  className="rounded-circle"
                />
              </figure>
              <span>{user.name}</span>
            </button>
            <div className="dropdown-menu w-100" aria-labelledby="dropDownMenuButton">
              {user?.role==='admin' && (
                <Link className="dropdown-item" to="/admin/dashboard">{" "} Dashboard{" "}</Link>
              )}
              <Link className="dropdown-item" to="/me/orders">Orders</Link>
              <Link className="dropdown-item" to="/me/profile">Profile</Link>
              <Link 
                className="dropdown-item text-danger" 
                to="/" 
                onClick={logoutHandler}
              >
                Logout
              </Link>
            </div>
          </div>
        ) : (
          !isLoading && (
            <Link to="/login" className="btn ms-4" id="login_btn">
              Login
            </Link>
          )
        )}
      </div>
    </nav>
  );
}

export default Header;
import React, { useState } from 'react';
import Search from './Search';
import { useGetMeQuery } from '../../redux/api/userApi';
import { Link, useNavigate } from 'react-router-dom';
import { useLazyLogoutQuery } from '../../redux/api/authApi';
import { useSelector } from 'react-redux';
import { FaRobot } from 'react-icons/fa';

function Header() {
  const navigate = useNavigate();
  const { isLoading, data: user } = useGetMeQuery();
  const [logout] = useLazyLogoutQuery();

  const cartItems = useSelector((state) => state.cart?.cartItems || []);

  // Tooltip state
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  const logoutHandler = () => {
    logout();
    navigate(0);
  };

  const handleMouseMove = (e) => {
    setTooltipPos({ x: e.clientX + 10, y: e.clientY + 10 }); // offset tooltip a bit from cursor
  };

  return (
    <>
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
        <div className="col-12 col-md-3 mt-4 mt-md-0 text-center d-flex align-items-center justify-content-center gap-3">
          {/* Predict icon button with tooltip */}
          <Link
            to="/predict"
            style={{
              padding: '6px 10px',
              backgroundColor: 'transparent',
              border: 'none',
              color: 'white',       // icon white always
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
              textDecoration: 'none',
              position: 'relative',
            }}
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            onMouseMove={handleMouseMove}
          >
            <FaRobot size={20} />
          </Link>

          {/* Tooltip element */}
          {showTooltip && (
            <div
              style={{
                position: 'fixed',
                top: tooltipPos.y,
                left: tooltipPos.x,
                backgroundColor: 'rgba(0,0,0,0.75)',
                color: 'white',
                padding: '4px 8px',
                borderRadius: '4px',
                fontSize: '12px',
                pointerEvents: 'none', // so tooltip doesn't block mouse events
                zIndex: 1000,
                whiteSpace: 'nowrap',
              }}
            >
              Predict
            </div>
          )}

          {/* Cart link */}
          <a href="/cart" style={{ textDecoration: "none", display: 'flex', alignItems: 'center' }}>
            <span id="cart" className="ms-3"> Cart </span>
            <span className="ms-1" id="cart_count">{cartItems.length}</span>
          </a>

          {/* User dropdown or login button */}
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
                {user?.role === 'admin' && (
                  <Link className="dropdown-item" to="/admin/dashboard"> Dashboard </Link>
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
    </>
  );
}

export default Header;
